import React from "react";
import { PokemonType, typeMatchups } from "../../../constants/typeMatchups";
import { IPokemonComparison } from "./PokemonComparisonCard";
import styles from "../../../styles/PokemonComparison.module.css";
import { getSoftTypeColor } from "../../../utils/color";

interface PokemonTypeMatchupProps {
  pokemon1: IPokemonComparison;
  pokemon2: IPokemonComparison;
}

const PokemonTypeMatchup: React.FC<PokemonTypeMatchupProps> = ({
  pokemon1,
  pokemon2,
}) => {
  const calculateMutualAdvantage = (
    type1: PokemonType,
    type2: PokemonType
  ): {
    attacker: { result: string; advantage: number };
    defender: { result: string; advantage: number };
  } => {
    const attackerAdvantage = typeMatchups[type1]?.[type2] ?? 1;
    const defenderAdvantage = typeMatchups[type2]?.[type1] ?? 1;

    const getResult = (from: PokemonType, to: PokemonType, value: number) => {
      if (value > 1) {
        return {
          result: `${from} has an advantage over ${to}. (${value}x)`,
          advantage: value,
        };
      } else if (value < 1) {
        return {
          result: `${from} has a disadvantage against ${to}. (${value}x)`,
          advantage: value,
        };
      } else {
        return {
          result: `${from} has no advantage or disadvantage against ${to}`,
          advantage: 1,
        };
      }
    };

    return {
      attacker: getResult(type1, type2, attackerAdvantage),
      defender: getResult(type2, type1, defenderAdvantage),
    };
  };

  const getTypeMatchups = () => {
    const matchups: { result: string; advantage: number }[] = [];

    pokemon1.types!.forEach((type1) => {
      pokemon2.types!.forEach((type2) => {
        const { attacker, defender } = calculateMutualAdvantage(
          type1 as PokemonType,
          type2 as PokemonType
        );
        matchups.push(attacker);
        matchups.push(defender);
      });
    });

    return matchups;
  };

  const typeComparisons = getTypeMatchups();

  return (
    <>
      <div className="mt-5">
        <div
          style={{
            background: `linear-gradient(90deg, ${getSoftTypeColor(
              pokemon1.types![0]
            )}, ${getSoftTypeColor(pokemon2.types![0])})`,
            color: "white",
            height: 50,
          }}
          className="d-flex align-content-center justify-content-center mb-4"
        >
          <h2>Type Matchup</h2>
        </div>
      </div>
      <div className={`${styles.pokemonTypeMatchup}`} >
        <div className={`${styles.comparisonContainer} d-flex flex-wrap justify-content-center align-items-center text-center gap-3`}>
          {typeComparisons.map((comparison, index) => (
            <div
              className={`${styles.comparisonItem} ${
                comparison.advantage > 1
                  ? styles.advantage
                  : comparison.advantage < 1
                    ? styles.disadvantage
                    : ""
              }`}
              key={index}
            >
              <strong>{comparison.result}</strong>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PokemonTypeMatchup;
