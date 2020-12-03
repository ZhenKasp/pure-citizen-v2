import React from 'react';
import classes from './App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import signup from '../../../../utilities/signup';

const App = (props) => {

  return (
    <div className={classes.SignUp}>
      <h1>Please Sign Up</h1>
      <Form
        onSubmit={(event) => signup(
          event,
          "authenticate"
        )}
      >
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="email"
            required
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="username"
            required
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="first_name"
            required
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="last_name"
            required
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required
            name="password_confirmation"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registration
        </Button>
      </Form>
    </div>
  )
}

export default App;
