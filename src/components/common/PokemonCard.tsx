import { Card, Col } from "react-bootstrap";
import styles from "../../styles/PokemonCard.module.css";
import usePokemon from "../../hooks/usePokemon";
import { buildPokemonDetailsUrl } from "../../constants/routes";
import { formatPokedexId } from "../../utils/string";
import { getSoftTypeColor } from "../../utils/color";
import { Link } from "react-router-dom";
import AddToFavoriteButton from "./AddToFavoriteButton";

interface IPokemonCardProps {
  id: number;
  onActionCompleteNeeded?: boolean;
}

const PokemonCard = ({
  id,
  onActionCompleteNeeded = false,
}: IPokemonCardProps) => {
  const { pokemonData: pokemonCardData } = usePokemon(id);

  return (
    pokemonCardData && (
      <Col key={id} xs={12} sm={6} md={4} lg={3} className="mb-4">
        <Card
          className="pokemon-card"
          style={{
            background: getSoftTypeColor(pokemonCardData.types[0]),
            color: "white",
          }}
        >
          <AddToFavoriteButton
            id={id}
            pokemonCardData={pokemonCardData}
            onActionCompleteNeeded={onActionCompleteNeeded}
          />
          <span className="px-3 py-3" style={{ fontWeight: "bold" }}>
            #{formatPokedexId(String(pokemonCardData.id))}
          </span>
          <Link
            to={buildPokemonDetailsUrl(id)}
            style={{ textDecoration: "none" }}
          >
            <Card.Img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            />
          </Link>
          <Card.Body>
            <Card.Title className="text-center text-capitalize">
              {pokemonCardData.name}
            </Card.Title>
            <div className={styles.iconWrapper}>
              {pokemonCardData.types.map((type) => (
                <img
                  key={type}
                  src={`/images/${type}.svg`}
                  alt={`${type} icon`}
                  className={styles.typeIcon}
                />
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    )
  );
};

export default PokemonCard;
