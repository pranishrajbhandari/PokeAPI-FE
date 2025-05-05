import React from "react";
import styles from "../../../styles/PokemonComparison.module.css";
import { typeMatchups, PokemonType } from "../../../constants/typeMatchups";
import { IMove } from "./PokemonMoveSetMatchups";

interface IMoveSetAnalysisBoxProps {
  pokemonMoves: [] | IMove[];
  opponentTypes: string[];
}

const MoveSetAnalysisBox: React.FC<IMoveSetAnalysisBoxProps> = ({
  pokemonMoves,
  opponentTypes,
}) => {
  const getEffectiveness = (
    moveType: PokemonType,
    targetTypes: string[]
  ): number => {
    return targetTypes.reduce((multiplier, targetType) => {
      return multiplier * (typeMatchups[moveType]?.[targetType] ?? 1);
    }, 1);
  };

  const getEffectivenessLabel = (value: number): string => {
    if (value > 1) return "Super Effective";
    if (value < 1) return "Not Very Effective";
    return "Neutral";
  };

  const getTypeCoverage = (moveType: PokemonType) => {
    console.log(typeMatchups[moveType]);
  };

  getTypeCoverage(pokemonMoves[0].type as PokemonType);
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {pokemonMoves.map((move, index) => {
        if (move.isDamaging) {
          const effectiveness = getEffectiveness(
            move.type as PokemonType,
            opponentTypes
          );
          const label = getEffectivenessLabel(effectiveness);

          return (
            <div
              key={index}
              style={{ marginTop: 10 }}
              className={`${styles.comparisonItem} ${
                effectiveness > 1
                  ? styles.advantage
                  : effectiveness < 1
                    ? styles.disadvantage
                    : ""
              }`}
            >
              <div className="text-capitalize">
                <strong>
                  {move.name} ({move.type}) -- {move.power}
                </strong>
              </div>
              {label} ({effectiveness}x)
            </div>
          );
        } else {
          return (
            <div
              key={index}
              style={{ marginTop: 10 }}
              className={styles.comparisonItem}
            >
              <div className="text-capitalize">
                <strong>
                  {move.name} ({move.type})
                </strong>
              </div>
              <em>This move doesn't deal direct damage.</em>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MoveSetAnalysisBox;
