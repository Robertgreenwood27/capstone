// Deck/index.js
import React, { useEffect, useState } from 'react';
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
        const response = await fetch(`http://localhost:8080/decks/${deckId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const deckData = await response.json();
        setDeck(deckData);
      } catch (error) {
        console.error('Failed to fetch deck:', error);
      }
    }

    async function loadCards() {
      try {
        const response = await fetch(`http://localhost:8080/cards?deckId=${deckId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const cardsData = await response.json();
        setCards(cardsData);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    }

    loadDeck();
    loadCards();
  }, [deckId]);

  const handleDelete = async () => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      try {
        await fetch(`http://localhost:8080/decks/${deckId}`, { method: 'DELETE' });
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
        await fetch(`http://localhost:8080/cards/${cardId}`, { method: 'DELETE' });
        
        // Update the cards state to reflect the deletion
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
