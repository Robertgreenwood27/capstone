// components/DeckList.js
import React from 'react';
import { Link } from 'react-router-dom';

// This component renders a single deck in the list of decks
const DeckList = ({ deck, onDeleteDeck, cardCount }) => {


    return (
      <div className="deck-detail card mb-4">
      <div className="card-body">
          <div className="row justify-content-between">
              <div className="col-12 col-md">
                  <h5 className="card-title">{deck.name}</h5>
                  <p className="card-text">{deck.description}</p>
              </div>
              <div className="col-12 col-md-auto">
                  <p className="card-text text-secondary">{cardCount} {cardCount === 1 ? 'card' : 'cards'}</p>
              </div>
          </div>
          <div className="row justify-content-between mt-2">
              <div className="col-12 col-md mb-2 mb-md-0">
                  <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                      <span className="oi oi-eye"></span> View
                  </Link>
                  <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                      <span className="oi oi-book"></span> Study
                  </Link>
              </div>
              <div className="col-12 col-md-auto">
                  <button className="btn btn-danger" onClick={onDeleteDeck}>
                      <span className="oi oi-trash"></span> Delete
                  </button>
              </div>
          </div>
      </div>
  </div>

    );
};

export default DeckList;
