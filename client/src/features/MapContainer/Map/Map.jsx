import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from '../LocationMarker/LocationMarker';
import classes from './Map.module.css';
import { connect } from 'react-redux';

const Map = props => {
  useEffect(() => {
    if (!props.havePosition) {
      const success = position => {
        props.setPosition([position.coords.latitude, position.coords.longitude]);
      };
      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, []);

  return (
    <div className={classes.MapContainer}>
      <MapContainer className={classes.LeafletContainer} center={props.position} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={props.position} havePosition={props.havePosition}/>
      </MapContainer>
    </div>
  )
};

const mapStateToProps = state => ({ position: state.position });
const mapDispatchToProps = dispatch => ({ setPosition: position => dispatch({ type: "SET_POSITION", position }) });

export default connect(mapStateToProps, mapDispatchToProps)(Map);
