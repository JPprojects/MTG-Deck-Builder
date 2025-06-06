/**
 * Transforms raw commander data from the API into a format suitable for the UI
 * @param {Object} rawData - The raw data from the API
 * @returns {Array} - Formatted array of commander objects
 */
export function transformCommanderData(rawData) {
  if (!rawData || !rawData.container || !rawData.container.json_dict) {
    return [];
  }
  
  // For single card response
  if (rawData.container.json_dict.card) {
    const card = rawData.container.json_dict.card;
    return [{
      id: card.sanitized || card.name,
      name: card.name,
      colorIdentity: card.color_identity || [],
      imageUrl: card.image_uris?.[0]?.normal || '',
      type: card.type || '',
      cmc: card.cmc || 0
    }];
  }
  
  return [];
}