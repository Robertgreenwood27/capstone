import React, { useEffect, useState } from 'react';
import { readDeck, deleteDeck, deleteCard } from '../../utils/api/index';
import { useParams, useHistory } from 'react-router-dom';
import DeckView from './DeckView';
import Breadcrumb from '../../components/Breadcrumb';

// this component fetches the deck data and renders the DeckView component
function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  // this useEffect hook fetches the deck data and sets the deck state
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
  }, [deckId]); // this will only run when the deckId changes

  // this function deletes the deck when the delete button is clicked
  const handleDelete = async () => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      try {
        await deleteDeck(deckId);
        history.push('/');
      } catch (error) {
        console.error('Failed to delete deck:', error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>; // Render loading state if deck is not loaded
  }

  // This function is used to delete a card. It shows a confirmation dialog before deleting the card.
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
