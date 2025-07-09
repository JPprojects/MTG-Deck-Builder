import React from 'react';
import Data from '../data/combo-list.json';
import './ComboList.css';

const ComboList = ({ deckList }) => {
    const processedDeck = deckList.map(entry => entry.replace(/^\d+\s/, '').trim());
    const deckSet = new Set(processedDeck.map(card => card.toLowerCase()));

    const combolist = Data.filter(combo =>
        combo.cards.every(card => deckSet.has(card.toLowerCase()))
    );

    if (combolist.length === 0) {
        return (
            <div className="combo-card">
                <h3>Combos</h3>
                <p>No combos found in this deck.</p>
            </div>
        );
    }

    return (
        <div className="combo-card">
            <h3>Combos ({combolist.length})</h3>
            {combolist.map((combo, index) => (
                <div key={index} className="combo-item">
                    <h4>{combo.name}</h4>
                    <div className="combo-cards">
                        {combo.cards.map((card, cardIndex) => (
                            <span key={cardIndex} className="combo-card-name">{card}</span>
                        ))}
                    </div>
                    <p className="combo-result">{combo.result}</p>
                </div>
            ))}
        </div>
    );
};

export default ComboList;