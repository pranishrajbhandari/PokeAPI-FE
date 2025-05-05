import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ListGroup,
  FormControl,
  InputGroup,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { axiosPokeApiClient } from "../../../config/axiosClient";
import { IPokemonEntry } from "../../../global-state/reducers/pokemonListReducer.d";
import { sortPokemonById } from "../../../utils/sort";
import { formatPokedexId } from "../../../utils/string";

type SelectPokemonModalProps = {
  show: boolean;
  onHide: () => void;
  onSelect: (pokemonId: number) => void;
};

const SelectPokemonModal = ({
  show,
  onHide,
  onSelect,
}: SelectPokemonModalProps) => {
  const [searchText, setSearchText] = useState("");
  const [generation, setGeneration] = useState(1);

  const [pokemonList, setPokemonList] = useState<
    { id: number; name: string }[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show) inputRef?.current?.focus();

    return () => {
      setSearchText("");
    };
  }, [show]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const { data } = await axiosPokeApiClient.get(
        `/generation/${generation}`
      );

      const pokemonList: IPokemonEntry[] = [];
      if (data?.pokemon_species) {
        const species = data.pokemon_species;

        species.forEach((entry: { url: string; name: string }) => {
          const regex = /pokemon-species\/(\d+)\//;
          pokemonList.push({
            id: parseInt(entry!.url!.match(regex)![1]),
            name: entry.name,
          });
        });
      }
      setPokemonList(pokemonList.sort(sortPokemonById));
    };

    fetchPokemonList();
  }, [generation]);

  const filteredPokemon = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Pokémon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-center mb-3 mt-5">
          <Col xs="auto">
            <DropdownButton
              id="dropdown-generation"
              variant="secondary"
              title={`Generation ${generation}`}
              onSelect={(eventKey) => {
                setGeneration(Number(eventKey));
              }}
            >
              {[1, 2, 3].map((number) => (
                <Dropdown.Item
                  key={number}
                  eventKey={number}
                  active={number === generation}
                  disabled={number === generation}
                >
                  Gen {number}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Pokémon..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            ref={inputRef}
          />
        </InputGroup>

        <ListGroup>
          {filteredPokemon.map((pokemon) => (
            <ListGroup.Item
              key={pokemon.id}
              action
              onClick={() => {
                onSelect(pokemon.id);
                onHide();
              }}
              className="text-capitalize"
            >
              {`#${formatPokedexId(String(pokemon.id))} ${pokemon.name}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default SelectPokemonModal;
