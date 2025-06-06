import React, { useState } from 'react';
import './App.css';
import CommanderSearch from './components/CommanderSearch';
import ThemeSelector from './components/ThemeSelector';
import DeckGenerator from './components/DeckGenerator';

function App() {
  const [selectedCommander, setSelectedCommander] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Handler for when a commander is selected
  const handleCommanderSelect = (commander) => {
    console.log('Commander selected:', commander);
    setSelectedCommander(commander);
    setSelectedTheme(null); // Reset theme when commander changes
  };

  // Handler for when a theme is selected
  const handleThemeSelect = (theme) => {
    console.log('Theme selected:', theme);
    setSelectedTheme(theme);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MTG Deck Builder</h1>
      </header>
      <main className="App-main">
        {!selectedCommander ? (
          <CommanderSearch onCommanderSelect={handleCommanderSelect} />
        ) : !selectedTheme ? (
          <div>
            <div className="selected-commander">
              <h2>Selected Commander: {selectedCommander.name}</h2>
              <p>Color Identity: {selectedCommander.colorIdentity}</p>
              <button onClick={() => setSelectedCommander(null)}>
                Choose Different Commander
              </button>
            </div>
            <ThemeSelector 
              commander={selectedCommander} 
              onThemeSelect={handleThemeSelect} 
            />
          </div>
        ) : (
          <div className="deck-building">
            <div className="selected-commander">
              <h2>Selected Commander: {selectedCommander.name}</h2>
              <p>Color Identity: {selectedCommander.colorIdentity}</p>
              <p>Theme: {selectedTheme}</p>
              <div className="button-container">
                <button onClick={() => setSelectedCommander(null)}>
                  Choose Different Commander
                </button>
                <button onClick={() => setSelectedTheme(null)}>
                  Choose Different Theme
                </button>
              </div>
            </div>
            
            <DeckGenerator 
              commander={selectedCommander} 
              theme={selectedTheme} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;