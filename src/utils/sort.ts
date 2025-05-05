import { IPokemonEntry } from "../global-state/reducers/pokemonListReducer.d";

export const sortPokemonById = (
  pokemon1: IPokemonEntry,
  pokemon2: IPokemonEntry
) => {
  return pokemon1.id - pokemon2.id;
};
