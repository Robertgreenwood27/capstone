import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, createCard } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';
import CardForm from '../../components/CardForm';

const AddCard = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({ Front: '', Back: '' });

    useEffect(() => {
        const fetchDeck = async () => {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
        };
        fetchDeck();
    }, [deckId]);

    const handleChange = ({ target }) => {
        setCard({ ...card, [target.name]: target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, card);
        setCard({ Front: '', Back: '' }); // Reset the card form
        history.push(`/decks/${deckId}`); // Redirect to the deck view
    };

    const handleCancel = () => history.push(`/decks/${deckId}`);

    return (
        <div>
            <Breadcrumb deck={deck} current="Add Card" />
            <h2>{deck.name}: Add Card</h2>
            <CardForm 
                card={card}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default AddCard;
