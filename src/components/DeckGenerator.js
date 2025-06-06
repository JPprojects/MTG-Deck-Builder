import React, { useState } from 'react';
import { fetchDeckData } from '../services/edhrecService';

/**
 * Component for generating deck lists
 */
function DeckGenerator({ commander, theme }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [deckData, setDeckData] = useState(null);
  const [error, setError] = useState(null);

  const generateDeck = (budget) => {
    setIsGenerating(true);
    setError(null);
    
    const options = {
      commander: commander.id,
      theme: theme,
      budget: budget
    };
    
    fetchDeckData(options, (err, data) => {
      setIsGenerating(false);
      
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
          {deckData.cards && (
            <div className="card-list">
              <h4>Cards ({deckData.cards.length})</h4>
              <ul>
                {deckData.cards.slice(0, 10).map((card, index) => (
                  <li key={index}>{card.name}</li>
                ))}
                {deckData.cards.length > 10 && <li>... and {deckData.cards.length - 10} more</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DeckGenerator;