import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";
import { getSoftTypeColor } from "../../../utils/color";
import { IPokemonComparison } from "./PokemonComparisonCard";

interface PokemonStatsRadarProps {
  pokemon1: IPokemonComparison;
  pokemon2: IPokemonComparison;
}

const PokemonComparisonStatsRadar: React.FC<PokemonStatsRadarProps> = ({
  pokemon1,
  pokemon2,
}) => {
  const chartData = pokemon1.stats.map((stat, index) => ({
    name: stat.name,
    pokemon1: stat.base,
    pokemon2: pokemon2.stats[index]?.base || 0,
  }));

  const defaultColor1 = "rgba(255, 99, 132, 0.6)";
  const defaultColor2 = "rgba(54, 162, 235, 0.6)";

  let color1 =
    pokemon1 && pokemon1.types
      ? getSoftTypeColor(pokemon1?.types[0])
      : defaultColor1;
  let color2 =
    pokemon2 && pokemon2.types
      ? getSoftTypeColor(pokemon2?.types[0])
      : defaultColor2;

  if (color1 === color2) {
    color1 = defaultColor1;
    color2 = defaultColor2;
  }

  return (
    <>
      {pokemon1.stats.length > 0 && pokemon2.stats.length > 0 && (
        <>
          <div className="mt-5">
            <div
              style={{
                background: `linear-gradient(90deg, ${getSoftTypeColor(pokemon1!.types![0])}, ${getSoftTypeColor(pokemon2!.types![0])})`,
                color: "white",
                height: 50,
              }}
              className="d-flex align-content-center justify-content-center mb-4"
            >
              <h2>Stats Comparison</h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name={pokemon1.name || "Pokemon 1"}
                      dataKey="pokemon1"
                      stroke={color1}
                      fill={color1}
                      fillOpacity={0.6}
                    />
                    <Radar
                      name={pokemon2.name || "Pokemon 2"}
                      dataKey="pokemon2"
                      stroke={color2}
                      fill={color2}
                      fillOpacity={0.6}
                    />
                    <Legend />
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

export default PokemonComparisonStatsRadar;
