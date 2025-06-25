import React, { useEffect, useState } from 'react';
import { getImageUri } from '../services/scryfallService';

function CardImage({ cardName }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function loadImage() {
            console.log('card name is for me', cardName)
            const imageUrl = await getImageUri(cardName);
            setImage(imageUrl);
        }
        
        loadImage();
    }, [cardName]);

    return (
        <img src={image} alt={cardName} />
    );
}

export default CardImage;