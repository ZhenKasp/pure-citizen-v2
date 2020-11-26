import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import classes from './App.module.css';

const App = () => {
  const position = [51.505, -0.09]

  return (
    <div className={classes.MapContainer}>
      <MapContainer className={classes.LeafletContainer} center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
