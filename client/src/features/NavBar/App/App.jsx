import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classes from './App.module.css';
import { useHistory } from "react-router-dom";
import logout from '../../../utilities/logout';
import { connect } from 'react-redux';

const App = props => {
  let history = useHistory();

  if (props.user.id !== 0) {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand className={classes.Brand} onClick={() => history.push("/")}>All Records</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/myrecords")}>My Records</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown className={classes.Dropdown} title={props.user.username}>
              <NavDropdown.Item onClick={() => history.push("/signup")}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => logout(props.user, props.deleteUser, props.createFlashMessage, history)}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  } else {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand className={classes.Brand} onClick={() => history.push("/")}>All Records</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <NavDropdown className={classes.Dropdown} title="Guest">
              <NavDropdown.Item onClick={() => history.push("/signin")}>
                Sign In
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => history.push("/signup")}>
                Sign Up
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => dispatch({ type: "DELETE_USER"}),
    setUser: value => dispatch({ type: "SET_USER", value }),
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
