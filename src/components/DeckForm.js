// DeckForm.js
import React from 'react';

// This component renders the form for creating or editing a deck
const DeckForm = ({ deck, onChange, onSubmit, onCancel }) => {
    return (
        <form onSubmit={(event) => onSubmit(deck, event)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Deck Name"
                    onChange={onChange}
                    value={deck.name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Brief description of the deck"
                    rows="3"
                    onChange={onChange}
                    value={deck.description}
                ></textarea>
            </div>
            <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
};

export default DeckForm;
