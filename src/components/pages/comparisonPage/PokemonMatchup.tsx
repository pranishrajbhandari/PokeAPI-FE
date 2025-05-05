import { getSoftTypeColor } from "../../../utils/color";
import PokemonCard from "../../common/PokemonCard";
import { IPokemonComparison } from "./PokemonComparisonCard";

interface IPokemonShowcaseProps {
  pokemon1: IPokemonComparison;
  pokemon2: IPokemonComparison;
}

const PokemonMatchup = ({ pokemon1, pokemon2 }: IPokemonShowcaseProps) => {
  return (
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
        <h2>Pokemon Matchup</h2>
      </div>
      <div className="d-flex flex-row justify-content-evenly">
        <PokemonCard id={pokemon1.id!} />
        <PokemonCard id={pokemon2.id!} />
      </div>
    </div>
  );
};

export default PokemonMatchup;
