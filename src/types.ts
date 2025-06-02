export interface Move {
  level: number;
  moveName: string;
}

export interface PokemonData {
  [pokemonName: string]: Move[];
}

export interface Evolution {
  method: string;
  evolvesTo: string;
}

export interface EvolutionData {
  [pokemonName: string]: Evolution[];
}
