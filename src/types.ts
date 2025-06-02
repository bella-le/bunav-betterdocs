export interface Move {
  level: number;
  moveName: string;
}

export interface PokemonData {
  [pokemonName: string]: Move[];
}
