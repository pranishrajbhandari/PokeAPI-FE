import { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";

interface SelectMoveModalProps {
  show: boolean;
  moves: { name: string; type: string }[] | undefined;
  onHide: () => void;
  onSelect: (move: { name: string; type: string }) => void;
}

const SelectMoveModal = ({
  show,
  moves,
  onHide,
  onSelect,
}: SelectMoveModalProps) => {
  const [searchText, setSearchText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show) inputRef?.current?.focus();

    return () => {
      setSearchText("");
    };
  }, [show]);

  const filteredMoves = moves?.filter((move) =>
    move.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!moves) return;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select a Move</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search Moves..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              ref={inputRef}
            />
          </InputGroup>
          {filteredMoves &&
            filteredMoves
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((move, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  className="w-100 mb-2 text-capitalize"
                  onClick={() => {
                    onSelect(move);
                    onHide();
                  }}
                >
                  {move.name} ({move.type})
                </Button>
              ))}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SelectMoveModal;
