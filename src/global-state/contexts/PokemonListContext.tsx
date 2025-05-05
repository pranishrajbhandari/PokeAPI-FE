import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { axiosPokeApiClient } from "../../config/axiosClient";
import { pokemonListReducer } from "../reducers/pokemonListReducer";
import {
  PokemonListAction,
  updatePokemonList,
} from "../actions/pokemonListAction";
import {
  initialPokemonListState,
  IPokemonEntry,
  IPokemonList,
} from "../reducers/pokemonListReducer.d";
import { sortPokemonById } from "../../utils/sort";

interface IPokemonListContext {
  state: IPokemonList;
  dispatch: Dispatch<PokemonListAction>;
}

export const PokemonListContext = createContext<IPokemonListContext>({
  state: initialPokemonListState,
  dispatch: () => {},
});

interface IPokemonListProviderProps {
  children: ReactNode;
}
export const PokemonListProvider = ({
  children,
}: IPokemonListProviderProps) => {
  const [state, dispatch] = useReducer(
    pokemonListReducer,
    initialPokemonListState
  );

  const fetchPokemonList = async () => {
    const { data } = await axiosPokeApiClient.get(
      `/generation/${state.generation}`
    );

    const pokemonList: IPokemonEntry[] = [];
    if (data?.pokemon_species) {
      const species = data.pokemon_species;

      species.forEach((entry: { url: string; name: string }) => {
        const regex = /pokemon-species\/(\d+)\//;
        pokemonList.push({
          id: parseInt(entry!.url!.match(regex)![1]),
          name: entry.name,
        });
      });
    }
    dispatch(updatePokemonList(pokemonList.sort(sortPokemonById)));
  };

  useEffect(() => {
    fetchPokemonList();
  }, [state.generation]);

  return (
    <PokemonListContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonListContext.Provider>
  );
};
