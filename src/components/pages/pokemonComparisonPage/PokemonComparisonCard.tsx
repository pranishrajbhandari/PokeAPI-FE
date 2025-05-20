import { Card, Button, Spinner } from "react-bootstrap";
import usePokemon from "../../../hooks/usePokemon";
import styles from "../../../styles/PokemonCard.module.css";
import { SetStateAction, useEffect, useState } from "react";
import SelectMoveModal from "./SelectMoveModal";
import { IStats } from "../../../services/index.d";

export interface IPokemonComparison {
  id: number | null;
  name: string | null;
  types: string[] | null;
  moves: { name: string; type: string }[] | [];
  stats: IStats[] | [];
}

interface IPokemonComparisonCardProps {
  pokemonId: number | null;
  onSelectPokemon: () => void;
  setPokemonDetails: React.Dispatch<SetStateAction<IPokemonComparison>>;
}

const PokemonComparisonCard = ({
  pokemonId,
  onSelectPokemon,
  setPokemonDetails,
}: IPokemonComparisonCardProps) => {
  const { pokemonData, loading } = usePokemon(pokemonId ?? 0, "details");

  const [selectedMoves, setSelectedMoves] = useState<
    ({ name: string; type: string } | null)[]
  >([null, null, null, null]);

  const [showMoveModal, setShowMoveModal] = useState(false);
  const [activeMoveSlot, setActiveMoveSlot] = useState<number | null>(null);

  const handleOpenMoveModal = (slotIndex: number) => {
    setActiveMoveSlot(slotIndex);
    setShowMoveModal(true);
  };

  const handleSelectMove = (move: { name: string; type: string }) => {
    if (activeMoveSlot !== null) {
      const newMoves = [...selectedMoves];
      newMoves[activeMoveSlot] = move;
      setSelectedMoves(newMoves);
      setActiveMoveSlot(null);
    }
  };

  const getAvailableMoves = () => {
    if (!pokemonData) return [];

    if (pokemonData && "moves" in pokemonData) {
      const selectedMoveNames = selectedMoves
        .filter((move) => move !== null)
        .map((move) => move!.name);

      return pokemonData.moves.filter(
        (move) => !selectedMoveNames.includes(move.name)
      );
    }
  };

  useEffect(() => {
    setSelectedMoves([null, null, null, null]);
  }, [pokemonData?.id]);

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Card style={{minHeight: '500px'}}>
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            {pokemonId && pokemonData?.name ? (
              <>
                <Card.Title className="text-capitalize">
                  {pokemonData.name}
                </Card.Title>

                <Card.Img
                  src={pokemonData?.sprite[0]}
                  alt={pokemonData.name}
                  style={{ width: "150px" }}
                />

                <div className={styles.typePillsContainer + " mt-3"}>
                  {pokemonData.types.map((type) => (
                    <span
                      key={type}
                      className={`${styles.typePill} ${styles[type]}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <div className="mt-3 d-flex flex-row align-items-center gap-2">
                  {selectedMoves.map((move, index) => (
                    <Button
                      key={index}
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleOpenMoveModal(index)}
                    >
                      {move ? (
                        <span
                          key={move.name}
                          className={`${styles.typePill} ${styles[move.type]}`}
                        >
                          {move.name}
                        </span>
                      ) : (
                        `Select Move ${index + 1}`
                      )}
                    </Button>
                  ))}
                </div>
                <div className="mt-3 d-flex align-items-center">
                  <Button
                    onClick={() =>
                      setPokemonDetails((prevState) => ({
                        id: prevState.id,
                        moves: selectedMoves.filter((move) => move !== null),
                        stats: "stats" in pokemonData ? pokemonData.stats : [],
                        name: pokemonData.name || null,
                        types: pokemonData.types || null,
                      }))
                    }
                    disabled={
                      pokemonData.types == null || pokemonData.name == null
                    }
                  >
                    Ready
                  </Button>
                </div>
              </>
            ) : (
              <Button
                variant="outline-primary"
                size="lg"
                onClick={onSelectPokemon}
              >
                <i className="fas fa-plus"></i> Select Pokémon
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
      {pokemonData && "moves" in pokemonData && (
        <SelectMoveModal
          show={showMoveModal}
          moves={getAvailableMoves()}
          onHide={() => setShowMoveModal(false)}
          onSelect={handleSelectMove}
        />
      )}
    </>
  );
};

export default PokemonComparisonCard;
