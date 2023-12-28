// Home/index.js
import React, { useEffect, useState } from 'react';
import { listDecks, deleteDeck } from '../../utils/api/index';
import DeckList from './DeckList';
import { Link } from 'react-router-dom';

// This component fetches the list of decks and renders the DeckList component
function Home() {
  const [decks, setDecks] = useState([]);

  // This useEffect hook fetches the list of decks and sets the decks state
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
    // Since listDecks is a function that does not change over time (it's not a prop or a state),
    // it does't need to be included in the dependency array.
  }, []);
  
  
  // This function is used to get the number of cards in a deck.
  const getCardCountForDeck = (deck) => {
    return deck.cards ? deck.cards.length : 0;
  }
  
  // This function is used to delete a deck.
  // It's passed to the DeckList component as a prop.
  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?\n\nThis action cannot be undone.")) {
      try {
        await deleteDeck(deckId); // Delete the deck from the API
        setDecks(decks.filter(deck => deck.id !== deckId));// Remove the deck from the decks state
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
      {decks.length > 0 && // Only render the decks if there are decks to render
      decks.map((deck) => (
        <DeckList key={deck.id} deck={deck} cardCount={getCardCountForDeck(deck)} onDeleteDeck={() => handleDeleteDeck(deck.id)} />
      ))
    }
    </div>
  );
}

export default Home;
