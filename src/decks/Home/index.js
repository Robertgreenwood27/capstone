// Home/index.js
import React, { useEffect, useState } from 'react';
import DeckList from './DeckList';

function Home() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
   
    async function loadDecks() {
      try {
        const response = await fetch('http://localhost:8080/decks');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setDecks(responseData);
      } catch (error) {
        console.error('Failed to fetch decks:', error);
      }
    }

   
    async function loadCards() {
      try {
        const response = await fetch('http://localhost:8080/cards');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setCards(responseData);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    }

    loadDecks();
    loadCards();
  }, []);

  const getCardCountForDeck = (deckId) => {
    const count = cards.filter(card => card.deckId === deckId).length;
    return count;
  }

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?\n\nThis action cannot be undone.")) {
      try {
        await fetch(`http://localhost:8080/decks/${deckId}`, { method: 'DELETE' });
        
        // Update the decks state to remove the deleted deck
        setDecks(decks.filter(deck => deck.id !== deckId));
      } catch (error) {
        console.error('Failed to delete deck:', error);
      }
    }
  };

  return (
    <div>
      <a href='decks/CreateDeck'>
        <button className='btn btn-info'>
          <span className="oi oi-plus"></span> Create Deck
        </button>
      </a>
      <br /><br />
      {decks.length > 0 && cards.length > 0 && 
      decks.map((deck) => (
        <DeckList key={deck.id} deck={deck} cardCount={getCardCountForDeck(deck.id)} onDeleteDeck={() => handleDeleteDeck(deck.id)} />
      ))
    }
    </div>
  );
}

export default Home;
