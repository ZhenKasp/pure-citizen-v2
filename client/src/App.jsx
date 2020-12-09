import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllRecords from './features/Records/AllRecords';
import CurrentRecord from './features/Records/CurrentRecord';
import MyRecords from './features/Records/MyRecords';
import FlashMessage from './features/FlashMessage';
import SignIn from './features/Authorisation/SignIn';
import SignUp from './features/Authorisation/SignUp';
import NavBar from './features/NavBar';
import NotFound from './features/NotFound';
import { connect } from 'react-redux';

const App = props => (
  <Router>
    <NavBar />
    <FlashMessage />
    <Switch>
      <Route exact path="/" >
        <AllRecords />
      </Route>
      <Route path="/myrecords">
        <MyRecords />
      </Route>
      <Route exact path="/record/:id" >
        <CurrentRecord />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

const mapStateToProps = state => {
  return {
    flashMessage: state.flashMessage,
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
