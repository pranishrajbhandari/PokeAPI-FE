import {
  PokemonListAction,
  PokemonListActionTypes,
} from "../actions/pokemonListAction";
import { IPokemonList } from "./pokemonListReducer.d";

export const pokemonListReducer = (
  state: IPokemonList,
  action: PokemonListAction
): IPokemonList => {
  switch (action.type) {
    case PokemonListActionTypes.UPDATE_POKEMON_LIST:
      return { ...state, pokemons: action.payload };

    case PokemonListActionTypes.UPDATE_POKEMON_GENERATION:
      return { generation: action.payload, pokemons: [] };
    default:
      return state;
  }
};
