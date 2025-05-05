import { axiosBEApiClient, axiosPokeApiClient } from "../config/axiosClient";
import { extractIdFromPokemonSpeciesUrl } from "../utils/string";
import { IPokemonCardData, IPokemonDetailedData } from "./index.d";

export const getPokemonCardData = async (
  id: number
): Promise<IPokemonCardData> => {
  const res = await axiosPokeApiClient.get(`/pokemon/${id}`);
  const data = res.data;

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((t: any) => t.type.name),
  };
};

export const getPokemonDetailedData = async (
  id: number
): Promise<IPokemonDetailedData> => {
  const { data: pokemonData } = await axiosPokeApiClient.get(`/pokemon/${id}`);
  const { data: speciesData } = await axiosPokeApiClient.get(
    `/pokemon-species/${id}`
  );

  const evolutionChainUrl = speciesData.evolution_chain.url;
  const { data: evolutionData } =
    await axiosPokeApiClient.get(evolutionChainUrl);

  const flavorEntry = speciesData.flavor_text_entries.find(
    (entry: any) => entry.language.name === "en"
  );

  const flavorText = flavorEntry
    ? flavorEntry.flavor_text.replace(/\f/g, " ").replace(/\n|\r/g, " ")
    : "No flavor text available.";

  const evolutionChainData: { id: number; name: string }[] = [];

  const traverseEvolutionChain = (chain: any) => {
    if (!chain) return;
    evolutionChainData.push({
      id: parseInt(extractIdFromPokemonSpeciesUrl(chain.species.url)),
      name: chain.species.name,
    });
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evo: any) => traverseEvolutionChain(evo));
    }
  };

  traverseEvolutionChain(evolutionData.chain);

  const abilityPromises = pokemonData.abilities.map(async (ability: any) => {
    const abilityName = ability.ability.name;
    const { data: abilityData } = await axiosPokeApiClient.get(
      `/ability/${abilityName}`
    );

    const effectEntry = abilityData.effect_entries.find(
      (entry: any) => entry.language.name === "en"
    );

    return {
      name: abilityName,
      description: effectEntry
        ? effectEntry.short_effect.replace(/\n|\r/g, " ")
        : "No description available.",
    };
  });

  const abilities = await Promise.all(abilityPromises);

  const movePromises = pokemonData.moves.map(async (moveItem: any) => {
    const { data: moveData } = await axiosPokeApiClient.get(moveItem.move.url);
    return {
      name: moveItem.move.name,
      type: moveData.type.name,
    };
  });

  const moves = await Promise.all(movePromises);

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    cries: pokemonData.cries.latest,
    sprite: [
      `https://projectpokemon.org/images/normal-sprite/${pokemonData.name}.gif`,
      `https://projectpokemon.org/images/shiny-sprite/${pokemonData.name}.gif`,
    ],
    types: pokemonData.types.map((t: any) => t.type.name),
    stats: pokemonData.stats.map((stat: any) => ({
      name: stat.stat.name,
      base: stat.base_stat,
    })),
    moves,
    flavorText,
    evolutionChain: evolutionChainData,
    abilities,
  };
};

export const fetchMoveDetails = async (moveName: string) => {
  const { data } = await axiosPokeApiClient.get(
    `/move/${moveName.toLowerCase()}`
  );

  const isDamaging = data.power !== null && data.damage_class.name !== "status";

  return {
    name: data.name,
    type: data.type.name,
    power: data.power,
    isDamaging,
  };
};

export const addFavoritePokemon = async (id: string, name: string) => {
  await axiosBEApiClient.post("/api/favorites", {
    id: id,
    name: name,
    addedBy: import.meta.env.VITE_BACKEND_USER,
  });
};

export const removeFavoritePokemon = async (id: string) => {
  await axiosBEApiClient.delete("/api/favorites", {
    params: {
      id: id,
      addedBy: import.meta.env.VITE_BACKEND_USER,
    },
  });
};

export const getFavoritePokemons = async (): Promise<Array<any>> => {
  const res = await axiosBEApiClient.get("/api/favorites", {
    params: {
      addedBy: import.meta.env.VITE_BACKEND_USER,
    },
  });
  return res.data;
};
