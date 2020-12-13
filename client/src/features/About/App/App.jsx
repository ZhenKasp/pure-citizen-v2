import React from 'react';
import classes from "./App.module.css";
import { connect } from 'react-redux';

const App = props => {
  return (
    <div className={classes.Wrapper}>
      <h4>What it is about</h4>
      <p>Pure Citizens APP is a private initiative to offer to the public and government agencies a single tool to reach for help in emergency situations and
        in cleaning up our republic.</p>
      <p>We have conceptualized a solution to improve the daily lives of each and every citizens, by offering you easy and safe solution to help and protect lives.</p>
    </div>
  )
}

const mapStateToProps = state => {
  return { flashMessage: state.flashMessage }
}

export default connect(mapStateToProps)(App);
