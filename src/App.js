import React, { useState } from "react";
import { mahals } from "./data";
import MahalList from "./components/MahalList";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import LocationTracker from "./components/LocationTracker";
import ChatBox from "./components/ChatBox"; // <-- import ChatBox here

const App = () => {
  const [selectedMahal, setSelectedMahal] = useState(null);
  const [booking, setBooking] = useState(null);

  const handleBook = (bookingData) => {
    setBooking(bookingData);
  };

  const reset = () => {
    setSelectedMahal(null);
    setBooking(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🏰 Mahal Booking App</h1>

      {/* Show location tracking map when a Mahal is selected */}
      {selectedMahal && <LocationTracker targetLocation={selectedMahal} />}

      {/* Step 1: Mahal selection */}
      {!selectedMahal && !booking && (
        <MahalList mahals={mahals} onSelect={setSelectedMahal} />
      )}

      {/* Step 2: Booking form */}
      {selectedMahal && !booking && (
        <BookingForm
          mahal={selectedMahal}
          onBook={handleBook}
          onCancel={() => setSelectedMahal(null)}
        />
      )}

      {/* Step 3: Summary */}
      {booking && <BookingSummary booking={booking} onReset={reset} />}

      {/* Show ChatBox when Mahal selected or booking done */}
      {(selectedMahal || booking) && (
           <ChatBox chatId="mahal-123" userName="Brindha" />

      )}
    </div>
  );
};

export default App;
