import { SetStateAction, useContext } from "react";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { PokemonListContext } from "../../../global-state/contexts/PokemonListContext";
import { updatePokemonGeneration } from "../../../global-state/actions/pokemonListAction";

interface IGenreationSelectDropdownProps {
  setPage: React.Dispatch<SetStateAction<number>>;
}
const GenerationSelectDropdown = ({
  setPage,
}: IGenreationSelectDropdownProps) => {
  const { state: PokemonListState, dispatch } = useContext(PokemonListContext);

  return (
    <Row className="d-flex justify-content-center mb-3 mt-5">
      <Col xs="auto">
        <DropdownButton
          id="dropdown-generation"
          variant="secondary"
          title={`Generation ${PokemonListState.generation}`}
          onSelect={(eventKey) => {
            dispatch(updatePokemonGeneration(Number(eventKey)));
            setPage(0);
          }}
        >
          {[1, 2, 3].map((number) => (
            <Dropdown.Item
              key={number}
              eventKey={number}
              active={number === PokemonListState.generation}
              disabled={number === PokemonListState.generation}
            >
              Gen {number}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Col>
    </Row>
  );
};

export default GenerationSelectDropdown;
