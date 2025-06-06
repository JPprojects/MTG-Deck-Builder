import React, { useState } from 'react';
import { fetchCommanderData } from '../services/edhrecService';
import { transformCommanderData } from '../utils/dataTransformers';

/**
 * Component for searching and selecting a commander
 */
function CommanderSearch(props) {
  const { onCommanderSelect } = props || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle search input changes
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Perform the search when form is submitted
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const rawData = await fetchCommanderData(searchQuery);
      console.log('Raw API data:', rawData);
      const formattedResults = transformCommanderData(rawData);
      console.log('Formatted results:', formattedResults);
      setSearchResults(formattedResults);
    } catch (err) {
      setError('Failed to search commanders. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle commander selection
   */
  const handleCommanderClick = (commander) => {
    if (onCommanderSelect) {
      onCommanderSelect(commander);
    } else {
      console.error('onCommanderSelect function is not defined');
    }
  };

  return (
    <div className="commander-search">
      <h2>Find Your Commander</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a commander..."
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul className="commander-list">
            {searchResults.map((commander) => (
              <li 
                key={commander.id} 
                className="commander-item"
                onClick={() => handleCommanderClick(commander)}
              >
                <div className="commander-name">{commander.name}</div>
                <div className="commander-colors">{commander.colorIdentity}</div>
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && searchQuery && <p>No commanders found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}

export default CommanderSearch;