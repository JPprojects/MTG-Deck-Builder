import React, { useState } from 'react';
import { fetchDeckData } from '../services/edhrecService';

/**
 * Component for generating deck lists
 */
function DeckGenerator(props) {
  const { commander, theme } = props || {};
  const [isGenerating, setIsGenerating] = useState(false);
  const [deckData, setDeckData] = useState(null);
  const [error, setError] = useState(null);

  const generateDeck = (budget) => {
    setIsGenerating(true);
    setError(null);

    console.log("generating")
    
    const options = {
      commander: commander.id,
      theme: theme,
      budget: budget
    };
    
    fetchDeckData(options, (err, data) => {
      setIsGenerating(false);
      console.log("Deck data", data)
      
      if (err) {
        console.error('Error generating deck:', err);
        setError('Failed to generate deck. Please try again.');
        return;
      }
      
      setDeckData(data);
    });
  };

  return (
    <div className="deck-generator">
      <div className="generate-buttons">
        <button 
          className="generate-button"
          onClick={() => generateDeck(false)}
          disabled={isGenerating || !commander || !theme}
        >
          {isGenerating ? 'Generating...' : 'Generate Deck'}
        </button>
        <button 
          className="generate-button budget"
          onClick={() => generateDeck(true)}
          disabled={isGenerating || !commander || !theme}
        >
          {isGenerating ? 'Generating...' : 'Generate Budget Deck'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {deckData && (
        <div className="deck-display">
          <h3>Generated Deck</h3>
          <p>Commander: {commander.name}</p>
          <p>Theme: {theme}</p>
          {deckData.deck && (
            <div className="card-list">
              <h4>Cards ({deckData.deck.length})</h4>
              <ul>
                {deckData.deck.map((card, index) => (
                  <li key={index}>{card}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DeckGenerator;