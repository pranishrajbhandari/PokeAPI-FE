import { useContext, useState } from "react";
import { PokemonListContext } from "../global-state/contexts/PokemonListContext";
import { Container, Row } from "react-bootstrap";
import PokemonCard from "../components/common/PokemonCard";
import PaginationComponent from "../components/pages/indexPage/PaginationComponent";
import SearchForm from "../components/pages/indexPage/SearchForm";
import GenerationSelectDropdown from "../components/pages/indexPage/GenerationSelectDropdown";

const IndexPage = () => {
  const { state: PokemonListState } = useContext(PokemonListContext);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(0);
  const pageSize = 12;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(PokemonListState.pokemons.length / pageSize);

  const searchedPokemons = searchText
    ? PokemonListState.pokemons.filter((pokemon) =>
        pokemon.name.startsWith(searchText.toLowerCase())
      )
    : undefined;

  const pokemonsToShow = searchText
    ? searchedPokemons && searchedPokemons.length > 0
      ? searchedPokemons
      : []
    : PokemonListState.pokemons.slice(startIndex, endIndex);

  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <Container className="mt-4">
      <GenerationSelectDropdown setPage={setPage} />

      <PaginationComponent
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        itemsPerPage={pageSize}
        totalItems={
          searchedPokemons?.length ?? PokemonListState.pokemons.length
        }
      />

      <SearchForm searchText={searchText} onChange={handleSearchTextChange} />

      <Row
        className="d-flex justify-content-center align-items-center text-center"
        style={{ minHeight: "200px" }}
      >
        {pokemonsToShow.length > 0 ? (
          pokemonsToShow.map((pokemon) => (
            <PokemonCard key={pokemon.id} id={pokemon.id} />
          ))
        ) : (
          <>
            <h1>No Results!!</h1>
            <h2>Please try another keyword</h2>
          </>
        )}
      </Row>
    </Container>
  );
};

export default IndexPage;
