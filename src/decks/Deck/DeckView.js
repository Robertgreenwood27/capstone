import React from 'react';
import { useParams, Link } from 'react-router-dom';

// this component renders a single deck in the list of decks
const DeckView = ({ deck, cards, onDelete, onDeleteCard }) => {
    const { deckId } = useParams();

    return (
        <div className="container">
            <div className="my-3 p-3 card no-hover rounded shadow-sm">
                <h3 className="border-bottom border-gray pb-2 mb-0">{deck.name}</h3>
                <div className="pt-3">
                    <p>{deck.description}</p>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="mb-2 mb-md-0">
                        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
                            <span className="oi oi-pencil"></span> Edit
                        </Link>
                        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
                            <span className="oi oi-book"></span> Study
                        </Link>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-info">
                            <span className="oi oi-plus"></span> Add Cards
                        </Link>
                    </div>
                    <button className="btn btn-danger" onClick={onDelete}>
                        <span className="oi oi-trash"></span> Delete
                    </button>
                </div>
                
                <div className="my-3">
                    <h5>Cards</h5>
                    {cards.map((card) => (
                        <div key={card.id} className="card p-2 mb-2">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div className="mb-2 mb-md-0">
                                    <p><strong>Front:</strong> {card.front}</p>
                                    <p><strong>Back:</strong> {card.back}</p>
                                </div>
                                <div>
                                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary btn-sm mr-2 oi oi-pencil">
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger btn-sm oi oi-trash" onClick={(e) => onDeleteCard(card.id, e)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DeckView;
