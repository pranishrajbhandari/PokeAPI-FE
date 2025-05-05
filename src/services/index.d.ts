export interface IPokemonCardData {
  id: string;
  name: string;
  sprite: string;
  types: string[];
}

export interface IStats {
  name: string;
  base: number;
}

export interface IPokemonDetailedData {
  id: number;
  name: string;
  cries: string;
  sprite: string[];
  types: string[];
  stats: IStats[];
  moves: { name: string; type: string }[];
  flavorText: string;
  evolutionChain: { id: number; name: string }[];
  abilities: { name: string; description: string }[];
}

