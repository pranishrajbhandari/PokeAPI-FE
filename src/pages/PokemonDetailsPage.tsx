import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import { Container, Row, Spinner } from "react-bootstrap";
import PokemonStatsRadar from "../components/pages/pokemonDetailsPage/StatRadarGraph";
import PokemonCard from "../components/common/PokemonCard";
import { useEffect, useRef } from "react";
import { getSoftTypeColor } from "../utils/color";
import HeroSection from "../components/pages/pokemonDetailsPage/HeroSection";
import PokemonDescription from "../components/pages/pokemonDetailsPage/PokemonDescription";
import PokemonAbilities from "../components/pages/pokemonDetailsPage/PokemonAbilities";
import PokemonMoves from "../components/pages/pokemonDetailsPage/PokemonMoves";

const PokemonDetailsPage = () => {
  const params = useParams();

  const { pokemonData: pokemonDetailedData, loading } = usePokemon(
    parseInt(String(params!.pokemonId)),
    "details"
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params?.pokemonId]);

  const typeNames = pokemonDetailedData?.types.join(" and ");
  const narratorText = `${pokemonDetailedData?.name}, a ${typeNames} Pokémon. ${pokemonDetailedData && "flavorText" in pokemonDetailedData ? pokemonDetailedData.flavorText : null}`;

  const cryAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (pokemonDetailedData) {
      const audio = new Audio(
        `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonDetailedData.id}.ogg`
      );
      cryAudioRef.current = audio;
      audio.play();

      const handleCryEnded = () => {
        if (narratorText) {
          const utterance = new SpeechSynthesisUtterance(narratorText);
          utterance.lang = "en-US";
          speechSynthesis.speak(utterance);
        }
      };

      audio.addEventListener("ended", handleCryEnded);

      return () => {
        audio.removeEventListener("ended", handleCryEnded);
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [pokemonDetailedData, narratorText]);

  if (loading || !pokemonDetailedData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  console.log(pokemonDetailedData);

  return (
    <>
      {pokemonDetailedData && (
        <Container className="mt-4 text-center">
          <HeroSection pokemonDetailedData={pokemonDetailedData} />

          <PokemonDescription pokemonDetailedData={pokemonDetailedData} />

          <PokemonStatsRadar
            color={getSoftTypeColor(pokemonDetailedData.types[0])}
            pokemonDetailedData={pokemonDetailedData}
          />

          <PokemonAbilities pokemonDetailedData={pokemonDetailedData} />

          <PokemonMoves pokemonDetailedData={pokemonDetailedData} />

          <div className="mt-5">
            <div
              style={{
                background: getSoftTypeColor(pokemonDetailedData.types[0]),
                color: "white",
                height: 50,
              }}
              className="d-flex align-content-center justify-content-center mb-4"
            >
              <h2 className="mb-4">Evolution Chain</h2>
            </div>
            <Row className="g-4 justify-content-center">
              {"evolutionChain" in pokemonDetailedData &&
                Array.isArray(pokemonDetailedData.evolutionChain) &&
                pokemonDetailedData.evolutionChain.map((evolution) => (
                  <PokemonCard key={evolution.id} id={evolution.id} />
                ))}
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default PokemonDetailsPage;
