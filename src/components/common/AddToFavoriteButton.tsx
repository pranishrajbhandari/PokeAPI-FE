import { useEffect, useState } from "react";
import {
  addFavoritePokemon,
  getFavoritePokemons,
  removeFavoritePokemon,
} from "../../services";
import { IPokemonCardData, IPokemonDetailedData } from "../../services/index.d";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/PokemonCard.module.css";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

interface IAddToFavoriteButtonProps {
  id: number;
  pokemonCardData: IPokemonCardData | IPokemonDetailedData;
  onActionCompleteNeeded?: boolean;
}
const AddToFavoriteButton = ({
  pokemonCardData,
  id,
  onActionCompleteNeeded = false,
}: IAddToFavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);


  const checkIfAlreadyFavorited = async (): Promise<boolean> => {
    const data = await getFavoritePokemons();
    return Array.isArray(data) && data.some((entry) => entry.id == id);
  };

  const handleAddOrRemoveFromFavorites = async () => {
    try {
      if (!isFavorite) {
        await addFavoritePokemon(String(id), String(pokemonCardData?.name));
        setIsFavorite(true);
      } else {
        await removeFavoritePokemon(String(id));
        setIsFavorite(false);
        // if (onActionCompleteNeeded === true) await refetchFavorites();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const isFavorited = await checkIfAlreadyFavorited();
      setIsFavorite(isFavorited);
    };

    fetchFavoriteStatus();
  }, [id]);

  return (
    <div className={styles.heartIconWrapper}>
      <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        className={styles.heartIcon}
        onClick={() => handleAddOrRemoveFromFavorites()}
        style={{
          color: isFavorite ? "red" : "white",
        }}
      />
    </div>
  );
};

export default AddToFavoriteButton;
