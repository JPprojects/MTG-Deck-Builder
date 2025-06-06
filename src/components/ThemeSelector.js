import React, { useState, useEffect } from 'react';
import { getCommanderThemes } from '../services/edhrecService';

/**
 * Component for selecting a theme for the deck based on the commander
 */
function ThemeSelector({ commander, onThemeSelect }) {
  const [themes, setThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch themes based on the selected commander
  useEffect(() => {
    const fetchThemes = async () => {
      if (!commander || !commander.id) return;
      
      setIsLoading(true);
      try {
        const themes = await getCommanderThemes(commander);
        console.log(themes)
        setThemes(themes);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load themes. Please try again.');
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchThemes();
  }, [commander]);

  /**
   * Handle theme selection
   */
  const handleThemeClick = (theme) => {
    onThemeSelect(theme);
  };

  if (isLoading) return <div>Loading themes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="theme-selector">
      <h2>Select a Theme for Your Deck</h2>
      
      <div className="theme-list">
        {themes.map((theme) => (
          <div 
            key={theme.id} 
            className="theme-card"
            onClick={() => handleThemeClick(theme)}
          >
            <h3>{theme}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;