export const formatPokedexId = (id: string): string =>
  id.toString().padStart(3, "0");

export const extractIdFromPokemonSpeciesUrl = (url: string): string => {
  const regex = /pokemon-species\/(\d+)\//;
  const id = url!.match(regex)![1];

  return id;
};

