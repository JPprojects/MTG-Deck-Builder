import React, { useState, useEffect } from 'react';
import { getCommanderThemes } from '../services/edhrecService';

/**
 * Component for selecting a theme for the deck based on the commander
 */
function ThemeSelector(props) {
  const { commander, onThemeSelect } = props || {};
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
        console.log('themes', themes)
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
    if (onThemeSelect) {
      onThemeSelect(theme);
    } else {
      console.error('onThemeSelect function is not defined');
    }
  };

  if (isLoading) return <div>Loading themes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="theme-selector">
      <h2>Select a Theme for Your Deck</h2>
      
      <div className="theme-list">
        {themes.map((theme, index) => (
          <div 
            key={index} 
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