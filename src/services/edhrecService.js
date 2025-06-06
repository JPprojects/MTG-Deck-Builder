const httpHelper = require('../helpers/httpHelper');

const BASE_URL = 'https://json.edhrec.com/pages';

/**
 * Fetches deck data from EDHREC
 * @param {Object} options - Options for the request
 * @param {string} options.commander - The commander name (slug format, e.g., 'bello-bard-of-the-brambles')
 * @param {string} [options.theme] - Optional theme (e.g., 'enchantress')
 * @param {boolean} [options.budget=false] - Whether to get budget version
 * @param {function} callback - Callback function to handle the response data
 */
function fetchDeckData(options, callback) {
  if (!options.commander) {
    throw new Error('Commander name is required');
  }

  let urlPath = `${BASE_URL}/average-decks/${options.commander}`;
  
  if (options.theme) {
    urlPath += `/${options.theme.toLowerCase()}`;
  }
  
  if (options.budget) {
    urlPath += '/budget';
  }
  
  const url = `${urlPath}.json`;
  
  httpHelper.fetchJson(url, callback);
}

/**
 * Fetches commander data from EDHREC
 * @param {string} commanderName - The commander name (slug format)
 * @param {function} callback - Callback function to handle the response data
 */
function fetchCommanderData(commanderName, callback) {
  if (!commanderName) {
    throw new Error('Commander name is required');
  }

  const commander = commanderName.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');

  const url = `${BASE_URL}/commanders/${commander}.json`;   
  console.log(`Fetching commander data from: ${url}`);
  
  return new Promise((resolve, reject) => {
    httpHelper.fetchJson(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Gets available themes for a commander
 * @param {string} commanderName - The commander name (slug format)
 * @returns {Promise} - Promise resolving to array of themes
 */
function getCommanderThemes(commanderName) {
  return fetchCommanderData(commanderName.name)
    .then(response => {
      // Find the object with header 'Tags'
      const tagsObj = response.panels.links.find(link => link.header === 'Tags');
      // Extract theme values from items array
      return tagsObj ? tagsObj.items.map(item => item.value) : [];
    });
}

module.exports = {
  fetchDeckData,
  fetchCommanderData,
  getCommanderThemes
};