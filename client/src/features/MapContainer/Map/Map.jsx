import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from '../LocationMarker/LocationMarker';
import classes from './Map.module.css';
import { connect } from 'react-redux';

const Map = props => {
  useEffect(() => {
    if (!props.havePosition) {
      navigator.geolocation.getCurrentPosition((position) => {
        props.setPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <div className={classes.MapContainer}>
      <MapContainer className={classes.LeafletContainer} center={props.position} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <LocationMarker position={props.position} />
      </MapContainer>
    </div>
  )
};

const mapStateToProps = state => ({ position: state.position });
const mapDispatchToProps = dispatch => ({ setPosition: position => dispatch({ type: "SET_POSITION", position }) });

export default connect(mapStateToProps, mapDispatchToProps)(Map);
