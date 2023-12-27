import React from 'react';

const CardForm = ({ card, onChange, onSubmit, onCancel }) => {
    return (
        <form onSubmit={onSubmit}>
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
            <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
};

export default CardForm;
