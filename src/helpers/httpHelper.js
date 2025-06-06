import axios from 'axios';

/**
 * @param {string} url - The URL to fetch
 * @param {function} callback - Callback function that receives (error, responseData)
 */
export function fetchJson(url, callback) {
  console.log(`Fetching data from: ${url}`);

  if (typeof callback !== 'function') {
    console.error('Callback is not a function');
    return Promise.reject(new Error('Callback is not a function'));
  }

  axios
    .get(url)
    .then((response) => {
      console.log(response);
      callback(null, response.data);
    })
    .catch((error) => {
      const errMsg = error.response
        ? `HTTP error ${error.response.status}`
        : `Request failed: ${error.message}`;
      callback(new Error(errMsg), null);
    });
}