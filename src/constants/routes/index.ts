export const pageRoutes = {
  HOME: "/",
  FAVORITES: '/favorites',
  COMPARE: '/compare'
};

export const buildPokemonDetailsUrl = (id: number) => {
  return `/pokemon/${id}`;
};
