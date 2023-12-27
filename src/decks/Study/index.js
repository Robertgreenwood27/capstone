import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api/index';
import Breadcrumb from '../../components/Breadcrumb';

const Study = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({ cards: [] });
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFrontOfCard, setIsFrontOfCard] = useState(true);

    useEffect(() => {
        const loadDeck = async () => {
            try {
                const loadedDeck = await readDeck(deckId);
                setDeck(loadedDeck);
            } catch (error) {
                console.error('Error loading deck:', error);
            } finally {
                setIsLoading(false); // Set loading to false once data is fetched
            }
        };
        loadDeck();
    }, [deckId]);

    const flipCard = () => {
        setIsFrontOfCard(!isFrontOfCard);
    };

    const nextCard = () => {
        if (currentCardIndex < deck.cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFrontOfCard(true);
        } else {
            const restart = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
            if (restart) {
                setCurrentCardIndex(0);
                setIsFrontOfCard(true);
            } else {
                history.push('/');
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const cardCount = deck.cards.length;
    if (cardCount <= 2) {
        const cardText = cardCount === 1 ? "card" : "cards"; // Singular or plural
        return (
            <div>
                <Breadcrumb deck={deck} />
                <h2>Study: {deck.name}</h2>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There {cardCount === 1 ? "is" : "are"} {cardCount} {cardText} in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
            </div>
        );
    }
    
    return (
        <div>
            <Breadcrumb deck={deck} current="Study"/>
            <h2>Study: {deck.name}</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Card {currentCardIndex + 1} of {deck.cards.length}
                    </h5>
                    <p className="card-text">
                        {isFrontOfCard ? deck.cards[currentCardIndex].front : deck.cards[currentCardIndex].back}
                    </p>
                    <button className="btn btn-secondary" onClick={flipCard}>Flip</button>
                    {!isFrontOfCard && (
                        <button className="btn btn-primary" onClick={nextCard}>Next</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Study;
