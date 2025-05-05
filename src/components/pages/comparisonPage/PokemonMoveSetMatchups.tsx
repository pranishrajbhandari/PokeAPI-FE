import React, { useEffect, useState } from "react";
import { IPokemonComparison } from "./PokemonComparisonCard";
import { fetchMoveDetails } from "../../../services";
import { getSoftTypeColor } from "../../../utils/color";
import MovesetAnalysisBox from "./MovesetAnalysisBox";
import styles from "../../../styles/PokemonComparison.module.css";

interface IPokemonMovesetMatchupProps {
  pokemon1: IPokemonComparison;
  pokemon2: IPokemonComparison;
}

export interface IMove {
  name: string;
  type: string;
  power: number;
  isDamaging: boolean;
}

interface IMovesetComparisonPanelProps {
  name: string | null;
  color: string;
  moves: IMove[];
  opponentTypes: string[];
}

const PokemonMovesetMatchup: React.FC<IPokemonMovesetMatchupProps> = ({
  pokemon1,
  pokemon2,
}) => {
  const [pokemon1Moves, setPokemon1Moves] = useState<IMove[] | []>([]);
  const [pokemon2Moves, setPokemon2Moves] = useState<IMove[] | []>([]);

  const enrichMoves = async (moves: { name: string; type: string }[]) => {
    const detailedMoves = await Promise.all(
      moves.map((move) => fetchMoveDetails(move.name))
    );
    return detailedMoves;
  };

  const MovesetComparisonPanel = ({
    name,
    color,
    moves,
    opponentTypes,
  }: IMovesetComparisonPanelProps) => {
    return (
      <div className="p-3 border rounded shadow-sm flex-grow-1 text-center">
        <div style={{ background: color, width: "100%", color: "white" }}>
          <h3 className="text-capitalize m-0">
            <strong>{name}'s Moveset</strong>
          </h3>
        </div>
        <MovesetAnalysisBox
          pokemonMoves={moves}
          opponentTypes={opponentTypes}
        />
      </div>
    );
  };

  useEffect(() => {
    const updateMovesWithPowerAndDamage = async () => {
      const enrichedMoves1 = await enrichMoves(pokemon1.moves);
      const enrichedMoves2 = await enrichMoves(pokemon2.moves);
      setPokemon1Moves(enrichedMoves1);
      setPokemon2Moves(enrichedMoves2);
    };

    updateMovesWithPowerAndDamage();
  }, [pokemon1.moves, pokemon2.moves]);

  const color1 =
    pokemon1 && pokemon1.types
      ? getSoftTypeColor(pokemon1?.types[0])
      : "#FF0000";
  const color2 =
    pokemon2 && pokemon2.types
      ? getSoftTypeColor(pokemon2?.types[0])
      : "#0000FF";

  return (
    <>
      <div className="mt-5">
        <div
          style={{
            background: `linear-gradient(90deg, ${color1}, ${color2})`,
            color: "white",
            height: 50,
          }}
          className="d-flex align-content-center justify-content-center mb-4"
        >
          <h2>Moveset Comparison</h2>
        </div>
      </div>
      <div className="mt-5">
        <div className={styles.pokemonTypeMatchup}>
          <div
            className={`${styles.comparisonContainer} d-flex flex-row gap-4`}
          >
            <MovesetComparisonPanel
              name={pokemon1.name}
              color={color1}
              moves={pokemon1Moves}
              opponentTypes={pokemon2.types!}
            />

            <MovesetComparisonPanel
              name={pokemon2.name}
              color={color2}
              moves={pokemon2Moves}
              opponentTypes={pokemon1.types!}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonMovesetMatchup;
