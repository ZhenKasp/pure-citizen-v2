import React, { useEffect, useRef, useMemo } from 'react';
import { Marker, Popup, useMap } from "react-leaflet";
import { connect } from 'react-redux';

const LocationMarker = props => {
  const map = useMap();
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          props.setPosition([marker.getLatLng().lat, marker.getLatLng().lng])
        }
      },
    }),
    [],
  );

  useEffect(() => {
    map.flyTo(props.position, map.getZoom(15))
  }, props.position)

  return props.position === null ? null : (
    <Marker
      position={props.position}
      eventHandlers={eventHandlers}
      ref={markerRef}
      draggable={!props.havePosition}
    >
      <Popup>You are here</Popup>
    </Marker>
  )
}

const mapStateToProps = state => ({ position: state.position });
const mapDispatchToProps = dispatch => ({ setPosition: position => dispatch({ type: "SET_POSITION", position }) });

export default connect(mapStateToProps, mapDispatchToProps)(LocationMarker);
