import React from 'react';
import { Link } from 'react-router-dom';

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