export interface IPokemonEntry {
  id: number;
  name: string;
}

export interface IPokemonList {
  generation: number;
  pokemons: IPokemonEntry[];
}
export const initialPokemonListState: IPokemonList = {
  generation: 1,
  pokemons: [],
};
