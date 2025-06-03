import React, { useState } from "react";
import "../Styles.css";

const BookingForm = ({ mahal, onBook, onCancel }) => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({ name, mahal });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h2 className="form-title">Book: {mahal.name}</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input-field"
      />
      <div className="button-group">
        <button type="submit" className="btn primary-btn">Book</button>
        <button type="button" onClick={onCancel} className="btn cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
