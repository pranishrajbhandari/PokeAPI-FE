import { Col, Row } from "react-bootstrap";
import { getSoftTypeColor } from "../../../utils/color";
import { IPokemonCardData, IPokemonDetailedData } from "../../../services/index.d";

interface IPokemonAbilitiesProps {
  pokemonDetailedData: IPokemonCardData | IPokemonDetailedData;
}

const PokemonAbilities = ({ pokemonDetailedData }: IPokemonAbilitiesProps) => {
  return (
    <div className="mt-5">
      <div
        style={{
          background: getSoftTypeColor(pokemonDetailedData.types[0]),
          color: "white",
          height: 50,
        }}
        className="d-flex align-content-center justify-content-center mb-4"
      >
        <h2 className="mb-4">Abilities</h2>
      </div>
      {"abilities" in pokemonDetailedData && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {pokemonDetailedData.abilities.map((ability, index) => (
            <Row key={index} className="align-items-start mb-4">
              <Col
                xs={12}
                md={4}
                className="text-capitalize fw-bold text-md-end text-center"
              >
                {ability.name}
              </Col>
              <Col xs={12} md={8} className="text-start">
                {ability.description}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonAbilities;
