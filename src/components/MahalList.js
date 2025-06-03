import React from "react";

const MahalList = ({ mahals, onSelect }) => (
  <div className="mahal-list">
    <h2>Select a Mahal:</h2>
    <ul>
      {mahals.map((mahal) => (
        <li key={mahal.id}>
          <button onClick={() => onSelect(mahal)}>{mahal.name}</button>
        </li>
      ))}
    </ul>
  </div>
);


export default MahalList;
