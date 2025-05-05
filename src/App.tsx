import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Header from "./components/common/Header";
import FavoritesPage from "./pages/FavoritesPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import PokemonComparisonPage from "./pages/PokemonComparisonPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonDetailsPage />} />
        <Route path="/compare" element={<PokemonComparisonPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}
