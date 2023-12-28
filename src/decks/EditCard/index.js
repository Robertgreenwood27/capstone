import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';
import CardForm from '../../components/CardForm';

// this component is very similar to AddCard, but it fetches the card data and populates the form fields with the card data
const EditCard = () => {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({ front: '', back: '' });


    // this useEffect hook fetches the deck and card data and sets the deck and card state
    useEffect(() => {
        const fetchDeckAndCard = async () => {
            try {
                const deckData = await readDeck(deckId);
                setDeck(deckData);

                const cardData = await readCard(cardId);
                setCard(cardData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDeckAndCard();
    }, [deckId, cardId]); // this will only run when the deckId or cardId changes

    // Update the card state when the form fields change
    const handleChange = ({ target }) => {
        setCard({ ...card, [target.name]: target.value });
    };

    // this function updates the card data when the form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard({ ...card, deckId: Number(deckId) });
        history.push(`/decks/${deckId}`); // Navigate to the Deck screen
    };

    const handleCancel = () => history.push(`/decks/${deckId}`); // Navigate back to the Deck screen

    return (
        <div>
            <Breadcrumb deck={deck} current="Edit Card" cardNumber={cardId} />
            <h2>Edit Card</h2>
            <CardForm 
                card={card}
                onChange={handleChange}
                onSave={handleSubmit}
                onCancel={handleCancel}
                isEditMode={true}
            />

        </div>
    );
};

export default EditCard;
