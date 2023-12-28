import React from 'react';
import { Link } from 'react-router-dom';

// This component renders a breadcrumb navigation bar
// It takes a deck prop, which is used to render the deck name in the breadcrumb
// It takes a current prop, which is used to render the current page in the breadcrumb
// It takes a cardNumber prop, which is used to render the card number in the breadcrumb
const Breadcrumb = ({ deck, current, cardNumber }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"></span> Home</Link>
        </li>
        {deck && (
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
        )}
        {current && (
          <li className="breadcrumb-item active" aria-current="page">
            {current} {cardNumber ? ` ${cardNumber}` : ''}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;