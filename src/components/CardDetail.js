// components/CardDetail.js
import React, { useEffect, useState } from 'react';

const CardDetail = ({ cardId }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await fetch(`http://localhost:8080/cards/${cardId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCard(data);
      } catch (error) {
        console.error('Failed to fetch card:', error);
      }
    }
    fetchCard();
  }, [cardId]);

  if (!card) {
    return <div>Loading...</div>;
  }

  // Adjusted to display the front and back of the card
  return (
    <div>
      <h2>Front of Card</h2>
      <p>{card.front}</p>
      <h2>Back of Card</h2>
      <p>{card.back}</p>
      {/* other card details */}
    </div>
  );
};

export default CardDetail;
