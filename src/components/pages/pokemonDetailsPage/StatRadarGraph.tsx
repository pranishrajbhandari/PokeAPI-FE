import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";
import {
  IPokemonCardData,
  IPokemonDetailedData,
} from "../../../services/index.d";
import { getSoftTypeColor } from "../../../utils/color";

interface PokemonStatsRadarProps {
  color: string;
  pokemonDetailedData: IPokemonCardData | IPokemonDetailedData;
}

const PokemonStatsRadar: React.FC<PokemonStatsRadarProps> = ({
  color,
  pokemonDetailedData,
}) => {
  return (
    <>
      {"stats" in pokemonDetailedData && (
        <>
          <div className="mt-5">
            <div
              style={{
                background: getSoftTypeColor(pokemonDetailedData.types[0]),
                color: "white",
                height: 50,
              }}
              className="d-flex align-content-center justify-content-center mb-4"
            >
              <h2> Stats</h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    outerRadius="80%"
                    width={730}
                    height={250}
                    data={pokemonDetailedData.stats}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Stats"
                      dataKey="base"
                      stroke={color}
                      fill={color}
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default PokemonStatsRadar;
