import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PokemonComparisonCard, {
  IPokemonComparison,
} from "../components/pages/pokemonComparisonPage/PokemonComparisonCard";
import SelectPokemonModal from "../components/pages/pokemonComparisonPage/SelectPokemonModal";
import PokemonComparisonStatsRadar from "../components/pages/pokemonComparisonPage/PokemonComparisonStatsRadar";
import PokemonTypeMatchup from "../components/pages/pokemonComparisonPage/PokemonTypeMatchups";
import PokemonMovesetMatchup from "../components/pages/pokemonComparisonPage/PokemonMoveSetMatchups";
import PokemonMatchup from "../components/pages/pokemonComparisonPage/PokemonMatchup";
import { useLocation } from "react-router-dom";

const PokemonComparisonPage = () => {
  const location = useLocation();
  const id = parseInt(location?.state?.id) ?? null;

  const [pokemon1, setPokemon1] = useState<IPokemonComparison>({
    id: null,
    name: null,
    types: null,
    moves: [],
    stats: [],
  });

  const [pokemon2, setPokemon2] = useState<IPokemonComparison>({
    id: null,
    name: null,
    types: null,
    moves: [],
    stats: [],
  });

  const [selectedSlot, setSelectedSlot] = useState(1);
  const [showSelectModal, setShowSelectModal] = useState(false);

  const [showAnalyzedData, setShowAnalyzedData] = useState(false);

  const handleSelectPokemon = (pokemonId: number) => {
    if (selectedSlot === 1) {
      setPokemon1({ ...pokemon1, id: pokemonId });
    } else {
      setPokemon2({ ...pokemon2, id: pokemonId });
    }
    setShowSelectModal(false);
  };

  const handleReset = () => {
    setPokemon1({ id: null, moves: [], stats: [], name: null, types: null });
    setPokemon2({ id: null, moves: [], stats: [], name: null, types: null });
    setShowAnalyzedData(false);
  };

  useEffect(() => {
    if (id && !isNaN(id) && pokemon1.id === null) {
      setPokemon1({ ...pokemon1, id });
    }
  }, [id]);

  return (
    <>
      <Container className="mt-5">
        <h1 className="text-center mb-4">Compare Two Pokémons</h1>
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={5}>
            <PokemonComparisonCard
              pokemonId={pokemon1.id}
              onSelectPokemon={() => {
                setSelectedSlot(1);
                setShowSelectModal(true);
              }}
              setPokemonDetails={setPokemon1}
            />
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <h1>V/S</h1>
            <Button variant="outline-danger" onClick={() => handleReset()}>
              Reset
            </Button>
          </Col>

          <Col xs={12} md={5}>
            <PokemonComparisonCard
              pokemonId={pokemon2.id}
              onSelectPokemon={() => {
                setSelectedSlot(2);
                setShowSelectModal(true);
              }}
              setPokemonDetails={setPokemon2}
            />
          </Col>
        </Row>

        {pokemon1.types !== null &&
          pokemon2.types !== null &&
          !showAnalyzedData && (
            <Row>
              <Col className="text-center">
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => setShowAnalyzedData(true)}
                >
                  Compare
                </Button>
              </Col>
            </Row>
          )}

        {showAnalyzedData && (
          <>
            <PokemonMatchup pokemon1={pokemon1} pokemon2={pokemon2} />
            <PokemonTypeMatchup pokemon1={pokemon1} pokemon2={pokemon2} />
            <PokemonComparisonStatsRadar
              pokemon1={pokemon1}
              pokemon2={pokemon2}
            />
            {pokemon1.moves.length === 4 && pokemon2.moves.length === 4 && (
              <PokemonMovesetMatchup pokemon1={pokemon1} pokemon2={pokemon2} />
            )}
          </>
        )}
      </Container>
      <SelectPokemonModal
        show={showSelectModal}
        onHide={() => setShowSelectModal(false)}
        onSelect={handleSelectPokemon}
      />
    </>
  );
};

export default PokemonComparisonPage;
