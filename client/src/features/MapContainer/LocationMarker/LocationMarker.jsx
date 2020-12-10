import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from "react-leaflet";
import { connect } from 'react-redux';

const LocationMarker = props => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(props.position, map.getZoom(15))
  }, props.position)

  return props.position === null ? null : (
    <Marker position={props.position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const mapStateToProps = state => ({ position: state.position });
const mapDispatchToProps = dispatch => ({ setPosition: position => dispatch({ type: "SET_POSITION", position }) });

export default connect(mapStateToProps, mapDispatchToProps)(LocationMarker);
