import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, createCard } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';
import CardForm from '../../components/CardForm';

// this component is very similar to EditCard, but it does not fetch the card data. it only creates a new card.
const AddCard = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({ front: '', back: '' });

    // this useEffect hook fetches the deck data and sets the deck state
    useEffect(() => {
        const fetchDeck = async () => {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
        };
        fetchDeck();
    }, [deckId]); // this will only run when the deckId changes

    // Update the card state when the form fields change
    const handleChange = ({ target }) => {
        setCard({ ...card, [target.name]: target.value });
    };

    // this function creates the new card when the form is submitted
    const handleSave = async (event) => {
        event.preventDefault();
        await createCard(deckId, card);
        setCard({ front: '', back: '' }); // Reset the form fields
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`); // Navigate back to the Deck screen
    };

    return (
        <div>
            <Breadcrumb deck={deck} current="Add Card" />
            <h2>{deck.name}: Add Card</h2>
            <CardForm 
                card={card}
                onChange={handleChange}
                onSave={handleSave}
                onDone={handleDone}
            />
        </div>
    );
};

export default AddCard;
