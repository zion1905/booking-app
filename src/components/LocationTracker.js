import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationTracker = ({ targetLocation }) => {
  const [location, setLocation] = useState({ lat: null, lng: null, error: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((loc) => ({ ...loc, error: "Geolocation not supported by your browser" }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, error: null });
      },
      (err) => {
        setLocation((loc) => ({ ...loc, error: err.message }));
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!targetLocation) {
    return <p>Please select a Mahal to see its location on the map.</p>;
  }

  if (location.error) {
    return <p style={{ color: "red" }}>Error: {location.error}</p>;
  }

  if (!location.lat || !location.lng) {
    return <p>Fetching your current location...</p>;
  }

  const userPos = [location.lat, location.lng];
  const mahalPos = [targetLocation.lat, targetLocation.lng];

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Your Location & Mahal Location</h3>
      <p>
        User: Latitude: {location.lat.toFixed(4)}, Longitude: {location.lng.toFixed(4)}
      </p>
      <p>
        Mahal: Latitude: {targetLocation.lat.toFixed(4)}, Longitude: {targetLocation.lng.toFixed(4)}
      </p>

      <MapContainer
        center={userPos}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userPos}>
          <Popup>Your Location</Popup>
        </Marker>

        <Marker position={mahalPos}>
          <Popup>{`Mahal: ${targetLocation.name || "Selected Mahal"}`}</Popup>
        </Marker>

        <Polyline positions={[userPos, mahalPos]} color="blue" />
      </MapContainer>
    </div>
  );
};

export default LocationTracker;
