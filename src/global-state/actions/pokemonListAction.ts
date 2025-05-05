import { IPokemonEntry } from "../reducers/pokemonListReducer.d";

export enum PokemonListActionTypes {
  UPDATE_POKEMON_LIST = "UPDATE_POKEMON_LIST",
  UPDATE_POKEMON_GENERATION = "UPDATE_POKEMON_GENERATION",
}

interface updatePokemonGenerationAction {
  type: PokemonListActionTypes.UPDATE_POKEMON_GENERATION;
  payload: number;
}

interface updatePokemonListAction {
  type: PokemonListActionTypes.UPDATE_POKEMON_LIST;
  payload: IPokemonEntry[];
}

export const updatePokemonGeneration = (
  generation: number
): updatePokemonGenerationAction => {
  return {
    type: PokemonListActionTypes.UPDATE_POKEMON_GENERATION,
    payload: generation,
  };
};

export const updatePokemonList = (
  pokemonList: IPokemonEntry[]
): updatePokemonListAction => {
  return {
    type: PokemonListActionTypes.UPDATE_POKEMON_LIST,
    payload: pokemonList,
  };
};

export type PokemonListAction = updatePokemonListAction | updatePokemonGenerationAction;
