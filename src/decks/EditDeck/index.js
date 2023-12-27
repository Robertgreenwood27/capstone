import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';
import DeckForm from '../../components/DeckForm'; 

const EditDeck = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({ name: '', description: '' });

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
    }, [deckId]);

    const handleChange = ({ target }) => {
        setDeck({ ...deck, [target.name]: target.value });
    };

    const handleSubmit = async (deckData, event) => {
        event.preventDefault();
        await updateDeck(deckData);
        history.push(`/decks/${deckData.id}`);
    };

    const handleCancel = () => {
        history.push(`/decks/${deckId}`);
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
