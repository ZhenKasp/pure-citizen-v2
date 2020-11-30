import React, { useState, useEffect } from 'react';
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";

const LocationMarker = () => {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      console.log(e.latlng);
      map.flyTo(e.latlng, map.getZoom())
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setPosition({lat: position.coords.latitude, lng: position.coords.longitude})
    });
  }, []);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default LocationMarker;
