import React from 'react';
import Map from '../Map/Map';

const App = props => {
  return (
    <Map havePosition={props.havePosition}/>
  )
};

export default App;
