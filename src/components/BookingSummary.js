import React from "react";
import "../Styles.css";

const BookingSummary = ({ booking, onReset }) => (
  <div className="summary-container">
    <h2 className="summary-title">🎉 Booking Confirmed</h2>
    <p><strong>Name:</strong> {booking.name}</p>
    <p><strong>Mahal:</strong> {booking.mahal.name}</p>
    <button className="btn" onClick={onReset}>Book Another Mahal</button>
  </div>
);

export default BookingSummary;
