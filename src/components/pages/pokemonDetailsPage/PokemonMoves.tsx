import { Col, Row } from "react-bootstrap";
import styles from "../../../styles/PokemonCard.module.css";
import { getSoftTypeColor } from "../../../utils/color";
import { IPokemonCardData, IPokemonDetailedData } from "../../../services/index.d";

interface IPokemonMovesProps {
  pokemonDetailedData: IPokemonCardData | IPokemonDetailedData;
}

const PokemonMoves = ({ pokemonDetailedData }: IPokemonMovesProps) => {
  return (
    <>
      {"moves" in pokemonDetailedData &&
        Array.isArray(pokemonDetailedData.moves) && (
          <>
            <div
              style={{
                background: getSoftTypeColor(pokemonDetailedData.types[0]),
                color: "white",
                height: 50,
              }}
              className="d-flex align-content-center justify-content-center"
            >
              <h2>Learnable Moves</h2>
            </div>
            <Row className="g-2 justify-content-center mt-4">
              {pokemonDetailedData.moves.map((move, index) => (
                <Col key={index} xs="auto">
                  <span
                    key={move.name}
                    className={`${styles.typePill} ${styles[move.type]}`}
                  >
                    {move.name}
                  </span>
                </Col>
              ))}
            </Row>
          </>
        )}
    </>
  );
};

export default PokemonMoves;
