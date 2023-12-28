import React from 'react';

// This component renders the form for creating or editing a card
const CardForm = ({ card, onChange, onSave, onDone, onCancel, isEditMode = false }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(event); // Pass the event object to the onSave handler
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    placeholder="Front side of card"
                    onChange={onChange}
                    value={card.front}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    placeholder="Back side of card"
                    onChange={onChange}
                    value={card.back}
                ></textarea>
            </div>
            {isEditMode ? (
                <div>
                    <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            ) : (
                <div>
                    <button type="button" className="btn btn-secondary mr-2" onClick={onDone}>Done</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            )}
        </form>
    );
};

export default CardForm;
