// Updated version with fixed selectedMoveNum
import React, { useState, useEffect } from 'react';
import { PokemonData, Move } from './types';
import pokemonMovesData from './pokemon_moves.json';

const App: React.FC = () => {
  // State
  const [pokemonData, setPokemonData] = useState<PokemonData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPokemon, setCurrentPokemon] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number>(1);
  const [selectedMoveNum, setSelectedMoveNum] = useState<number>(1);

  // Load Pokemon data
  useEffect(() => {
    try {
      setPokemonData(pokemonMovesData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load Pokemon data. Please try again later.');
      setLoading(false);
    }
  }, []);

  // Filter Pokemon based on search term
  const filteredPokemon = Object.keys(pokemonData)
    .filter(pokemon => pokemon.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  // Handle Pokemon selection
  const handlePokemonSelect = (pokemonName: string) => {
    setCurrentPokemon(pokemonName);
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Could add a toast notification here in the future
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Render Pokemon moves
  const renderMoves = () => {
    if (!currentPokemon || !pokemonData[currentPokemon]) {
      return <tr><td colSpan={3}>Select a Pokemon to view its moves</td></tr>;
    }

    const moves = pokemonData[currentPokemon];
    
    if (moves.length === 0) {
      return <tr><td colSpan={3}>No moves found for this Pokemon</td></tr>;
    }

    // Sort moves by level
    const sortedMoves = [...moves].sort((a, b) => a.level - b.level);
    
    return sortedMoves.map((move, index) => {
      const setMoveText = `setMove(${selectedSlot}, ${selectedMoveNum}, "${move.moveName}")`;
      
      return (
        <tr key={index}>
          <td>{move.level}</td>
          <td>{move.moveName}</td>
          <td 
            className="copy-cell" 
            onClick={() => copyToClipboard(setMoveText)}
            title="Click to copy to clipboard"
          >
            {setMoveText}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <header>
        <div className="container">
          <h1>bunav move database</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="pokemon-list-container">
          <h2>Pokémon List</h2>
          <div className="pokemon-list">
            {loading ? (
              <div className="loading">Loading Pokémon data...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : filteredPokemon.length === 0 ? (
              <div>No Pokémon found</div>
            ) : (
              filteredPokemon.map((pokemon) => (
                <div
                  key={pokemon}
                  className={`pokemon-item ${currentPokemon === pokemon ? 'active' : ''}`}
                  onClick={() => handlePokemonSelect(pokemon)}
                >
                  {pokemon}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pokemon-details-container">
          <h2>{currentPokemon || 'Select a Pokémon'}</h2>
          <div className="slot-selector">
            <span>Slot: </span>
            {[1, 2, 3, 4, 5, 6].map((slot) => (
              <button
                key={slot}
                className={`slot-button ${selectedSlot === slot ? 'active' : ''}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          <div className="slot-selector">
            <span>Move: </span>
            {[1, 2, 3, 4].map((moveNum) => (
              <button
                key={moveNum}
                className={`slot-button ${selectedMoveNum === moveNum ? 'active' : ''}`}
                onClick={() => setSelectedMoveNum(moveNum)}
              >
                {moveNum}
              </button>
            ))}
          </div>
          <div className="pokemon-moves-container">
            <table>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Move</th>
                  <th>Set Move</th>
                </tr>
              </thead>
              <tbody>
                {renderMoves()}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>made with <span role="img" aria-label="heart">❤️</span> by bel</p>
        </div>
      </footer>
    </>
  );
};

export default App;
