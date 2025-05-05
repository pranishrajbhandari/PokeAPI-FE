import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PokemonListProvider } from "./global-state/contexts/PokemonListContext";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PokemonListProvider>
      <App />
    </PokemonListProvider>
  </BrowserRouter>
);
