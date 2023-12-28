import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';
import DeckForm from '../../components/DeckForm'; 

// this component is very similar to AddDeck, but it fetches the deck data and populates the form fields with the deck data
const EditDeck = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({ name: '', description: '' });

    // this useEffect hook fetches the deck data and sets the deck state
    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const deckData = await readDeck(deckId);
                setDeck(deckData);
            } catch (error) {
                console.error('Error fetching deck data:', error);
            }
        };

        fetchDeck();
    }, [deckId]); // this will only run when the deckId changes

    // Update the deck state when the form fields change
    const handleChange = ({ target }) => {
        setDeck({ ...deck, [target.name]: target.value });
    };

    // this function updates the deck data when the form is submitted
    const handleSubmit = async (deckData, event) => {
        event.preventDefault();
        await updateDeck(deckData);
        history.push(`/decks/${deckData.id}`);
    };

    const handleCancel = () => {
        history.push(`/decks/${deckId}`); // Navigate back to the Deck screen
    };

    return (
        <div>
            <Breadcrumb deck={deck} current="Edit Deck" />
            <h2>Edit Deck</h2>
            <DeckForm 
                deck={deck}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default EditDeck;
