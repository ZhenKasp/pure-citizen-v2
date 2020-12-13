import React, { useState } from 'react';
import classes from './App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import changeProfile from '../../../utilities/changeProfile';
import { connect } from 'react-redux';

const App = props => {
  const [isChanging, setIsChanging] = useState(false);

  if (isChanging === false) {
    return (
      <div className={classes.Wrapper}>
        <h4>Profile</h4>
        <p>Email: {props.user.email}</p>
        <p>Username: {props.user.username}</p>
        <p>First name: {props.user.first_name}</p>
        <p>Last Name: {props.user.last_name}</p>
        <Button onClick={() => setIsChanging(true)}>Change profile</Button>
      </div>
    )
  } else {
    return (
      <div className={classes.Wrapper}>
        <h4>Change profile</h4>
        <Form
          onSubmit={(event) =>
            changeProfile(
            event,
            props.createFlashMessage,
            props.setUser,
            setIsChanging
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
              defaultValue={props.user.email}
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
              defaultValue={props.user.username}
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
              defaultValue={props.user.first_name}
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
              defaultValue={props.user.last_name}
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
            <Button
              variant="primary"
              type="submit"
              className={classes.Button}
            >
              Confirm changes
            </Button>
            <Button
              variant="danger"
              className={classes.Button}
              onClick={() => setIsChanging(false)}
            >
              Discard changes
            </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => {
  return {
    setUser: value => dispatch({ type: "SET_USER", value }),
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
