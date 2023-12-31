// CreateDeck.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createDeck } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';
import DeckForm from '../../components/DeckForm'; 

// this component is very similar to EditDeck, but it does not fetch the deck data. it only creates a new deck.
const CreateDeck = () => {
    const history = useHistory();
    const [deck, setDeck] = useState({ name: '', description: '' });

    // Update the deck state when the form fields change
    const handleChange = ({ target }) => {
        setDeck({ ...deck, [target.name]: target.value });
    };

    // this function creates the new deck when the form is submitted
    const handleSubmit = async (deckData, event) => {
        event.preventDefault();
        const newDeck = await createDeck(deckData);
        history.push(`/decks/${newDeck.id}`);
    };

    const handleCancel = () => {
        history.push('/'); // Navigate back to the Home screen
    };

    return (
        <div>
            <Breadcrumb current="Create Deck" />
            <h2>Create Deck</h2>
            <DeckForm 
                deck={deck}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default CreateDeck;