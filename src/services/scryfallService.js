const BASE_URL = 'https://api.scryfall.com/cards/named?exact=';

async function getImageUri(card) {
    try {
        console.log('card name is', card)
        const trimmedName = card.trim().replace(/^\d+\s*/, '');
        const encodedName = encodeURIComponent(trimmedName);
        const response = await fetch(`${BASE_URL}${encodedName}`);
        const data = await response.json();
        
        if (data.image_uris) {
            return data.image_uris.small;
        } else if (data.card_faces && data.card_faces[0].image_uris) {
            // Handle double-faced cards
            return data.card_faces[0].image_uris.small;
        } else {
            throw new Error('No image found for card');
        }
    } catch (error) {
        console.error('Error fetching image URI:', error);
        return null;
    }
}

module.exports = {
    getImageUri
}

