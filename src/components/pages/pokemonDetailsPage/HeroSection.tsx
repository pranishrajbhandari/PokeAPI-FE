import { Button } from "react-bootstrap";
import {
  IPokemonCardData,
  IPokemonDetailedData,
} from "../../../services/index.d";
import styles from "../../../styles/PokemonCard.module.css";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../constants/routes";

interface IHeroSectionProps {
  pokemonDetailedData: IPokemonCardData | IPokemonDetailedData;
}
const HeroSection = ({ pokemonDetailedData }: IHeroSectionProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{ position: "relative", display: "inline-block", width: "100%" }}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetailedData.id}.png`}
          alt={pokemonDetailedData.name}
          style={{ width: "350px", height: "350px", objectFit: "contain" }}
          className="mb-3"
        />

        <Button
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onClick={() => {
            navigate(pageRoutes.COMPARE, {
              state:{
                id: pokemonDetailedData.id
              }
            });
          }}
        >
          Compare
        </Button>
      </div>

      <h1 className="text-capitalize mt-2">{pokemonDetailedData.name}</h1>

      <div className={styles.typePillsContainer}>
        {pokemonDetailedData.types.map((type) => (
          <span key={type} className={`${styles.typePill} ${styles[type]}`}>
            {type}
          </span>
        ))}
      </div>

      <div className="d-flex justify-content-center align-items-center gap-4 mt-3 flex-wrap">
        {"sprite" in pokemonDetailedData &&
          Array.isArray(pokemonDetailedData.sprite) &&
          pokemonDetailedData.sprite.map((img) => {
            return (
              <div className="d-flex p-5">
                <img
                  src={img}
                  alt="Default Sprite"
                  style={{ width: "116px", height: "96px" }}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HeroSection;
