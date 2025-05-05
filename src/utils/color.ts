export const getSoftTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    bug: "#B0C820",
    dark: "#A1A5B1",
    dragon: "#A0A6F9",
    electric: "#F9E28C",
    fairy: "#F7B6D1",
    fighting: "#D37871",
    fire: "#F8A75E",
    flying: "#B1A9F7",
    ghost: "#9B8BB5",
    grass: "#9CCB75",
    ground: "#F1D28E",
    ice: "#A6E3E2",
    normal: "#B8B88F",
    poison: "#D080C4",
    psychic: "#F8A8C5",
    rock: "#D4A762",
    steel: "#D1D1E3",
    water: "#A7BFF7",
  };

  return typeColors[type] || "#f5f5f5";
};
