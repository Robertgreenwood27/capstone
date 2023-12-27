// Home/index.js
import React, { useEffect, useState } from 'react';
import { listDecks, deleteDeck } from '../../utils/api/index';
import DeckList from './DeckList';
import { Link } from 'react-router-dom';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      try {
        const responseData = await listDecks();
        setDecks(responseData);
      } catch (error) {
        console.error('Failed to fetch decks:', error);
      }
    }
    loadDecks();
  }, []);
  

  const getCardCountForDeck = (deck) => {
    return deck.cards ? deck.cards.length : 0;
  }
  

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?\n\nThis action cannot be undone.")) {
      try {
        await deleteDeck(deckId);
        setDecks(decks.filter(deck => deck.id !== deckId));
      } catch (error) {
        console.error('Failed to delete deck:', error);
      }
    }
  };
  

  return (
    <div>
      <Link to="/decks/new">
        <button className='btn btn-info'>
          <span className="oi oi-plus"></span> Create Deck
        </button>
      </Link>
      <br /><br />
      {decks.length > 0 && 
      decks.map((deck) => (
        <DeckList key={deck.id} deck={deck} cardCount={getCardCountForDeck(deck)} onDeleteDeck={() => handleDeleteDeck(deck.id)} />
      ))
    }
    </div>
  );
}

export default Home;
