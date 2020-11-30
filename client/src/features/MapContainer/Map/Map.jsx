import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from '../LocationMarker/LocationMarker';
import classes from './Map.module.css';

const Map = props => {
  const [position, setPosition] = useState([51.505, -0.09]);
      console.log(position);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setPosition([position.coords.latitude, position.coords.longitude])
    });
  }, []);


  return (
    <div className={classes.MapContainer}>
      <MapContainer className={classes.LeafletContainer} center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
};

export default Map;
