import { useEffect, useState } from "react";
import { getFavoritePokemons } from "../services";
import PokemonCard from "../components/common/PokemonCard";
import { Container, Row, Spinner } from "react-bootstrap";

const FavoritesPage = () => {
  const [favoritedPokemons, setFavoritedPokemons] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavoriteData = async () => {
      const data = await getFavoritePokemons();
      setFavoritedPokemons(data);
    };

    fetchFavoriteData();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Your Favorites</h1>
      <Row
        className="d-flex justify-content-start align-items-start text-center"
        style={{ minHeight: "200px" }}
      >
        {favoritedPokemons.length > 0 ? (
          favoritedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} id={pokemon.id} />
          ))
        ) : (
          <Spinner />
        )}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
