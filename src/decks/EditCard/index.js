import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';
import CardForm from '../../components/CardForm';

const EditCard = () => {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({ front: '', back: '' });

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
    }, [deckId, cardId]);

    const handleChange = ({ target }) => {
        setCard({ ...card, [target.name]: target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard({ ...card, deckId: Number(deckId) });
        history.push(`/decks/${deckId}`);
    };

    const handleCancel = () => history.push(`/decks/${deckId}`);

    return (
        <div>
            <Breadcrumb deck={deck} current="Edit Card" cardNumber={cardId} />
            <h2>Edit Card</h2>
            <CardForm 
                card={card}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default EditCard;
