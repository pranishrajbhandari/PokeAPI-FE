import { IPokemonCardData, IPokemonDetailedData } from "../../../services/index.d";
import { getSoftTypeColor } from "../../../utils/color";

interface IPokemonDescriptionProps {
  pokemonDetailedData: IPokemonCardData | IPokemonDetailedData;
}

const PokemonDescription = ({
  pokemonDetailedData,
}: IPokemonDescriptionProps) => {
  return (
    <>
      {"flavorText" in pokemonDetailedData && (
        <>
          <div
            style={{
              background: getSoftTypeColor(pokemonDetailedData.types[0]),
              color: "white",
              height: 50,
            }}
            className="d-flex align-content-center justify-content-center mb-4"
          >
            <h2 className="mt-2 mb-4">Description</h2>
          </div>
          <p
            className="text-muted mt-2"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            {pokemonDetailedData.flavorText}
          </p>
        </>
      )}
    </>
  );
};

export default PokemonDescription;
