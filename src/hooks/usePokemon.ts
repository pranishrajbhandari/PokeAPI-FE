import { useState, useEffect, useCallback } from "react";
import {
  getFavoritePokemons,
  getPokemonCardData,
  getPokemonDetailedData,
} from "../services";
import { IPokemonCardData, IPokemonDetailedData } from "../services/index.d";

type FetchMode = "card" | "details";

const usePokemon = (id: number, mode: FetchMode = "card") => {
  const [pokemonData, setPokemonData] = useState<
    IPokemonCardData | IPokemonDetailedData
  >();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchFavorites = async () => {
    await getFavoritePokemons();
  };

  const fetchData = useCallback(async () => {
    if (id === 0) {
      setLoading(false);
      setPokemonData(undefined);
      return;
    }

    if (id) {
      setLoading(true);
      setError(null);

      try {
        const data =
          mode === "card"
            ? await getPokemonCardData(id)
            : await getPokemonDetailedData(id);

        setPokemonData(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch Pokémon data.");
      } finally {
        setLoading(false);
      }
    }
  }, [id, mode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { pokemonData, loading, error, refetch: fetchData, refetchFavorites };
};

export default usePokemon;
