import React, { useEffect, useState } from 'react';
import { readDeck, deleteDeck, deleteCard } from '../../utils/api/index';
import { useParams, useHistory } from 'react-router-dom';
import DeckView from './DeckView';
import Breadcrumb from '../../components/Breadcrumb';

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        setCards(deckData.cards || []);
      } catch (error) {
        console.error('Failed to fetch deck:', error);
      }
    }

    loadDeck();
  }, [deckId]);  // Dependency array ensures this effect runs when deckId changes

  const handleDelete = async () => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      try {
        await deleteDeck(deckId);
        history.push('/'); // Navigate back to the home screen
      } catch (error) {
        console.error('Failed to delete deck:', error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?\n\nThis action cannot be undone.")) {
      try {
        await deleteCard(cardId);
        setCards(cards.filter(card => card.id !== cardId));
      } catch (error) {
        console.error('Failed to delete card:', error);
      }
    }
  };

  return (
    <div>
        <Breadcrumb deck={deck}/>
        <DeckView deck={deck} cards={cards} onDelete={handleDelete} onDeleteCard={handleDeleteCard} />
    </div>
  );
}

export default Deck;
