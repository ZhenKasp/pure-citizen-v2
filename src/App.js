import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllRecords from './features/AllRecords';
import MyRecords from './features/MyRecords';
import SignIn from './features/Authorisation/SignIn';
import SignUp from './features/Authorisation/SignUp';
import NavBar from './features/NavBar';
import NotFound from './features/NotFound';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <AllRecords />
        </Route>
        <Route path="/myrecords">
          <MyRecords />
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
    </div>
  </Router>
);

export default App;
