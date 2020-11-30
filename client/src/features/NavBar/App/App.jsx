import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classes from './App.module.css';
import { useHistory } from "react-router-dom";

const App = props => {
  let history = useHistory();

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand onClick={() => history.push("/")}>All Records</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push("/myrecords")}>My Records</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown className={classes.Dropdown} title="Dropdown">
            <NavDropdown.Item onClick={() => history.push("/signin")}>Sign In</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push("/signup")}>Sign Up</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default App;
