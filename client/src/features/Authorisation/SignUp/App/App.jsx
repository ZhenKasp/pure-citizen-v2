import React from 'react';
import classes from './App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import signup from '../../../../utilities/signup';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const App = (props) => {
  let history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={classes.SignUp}>
      <h1>{t("Please Sign Up")}</h1>
      <Form
        onSubmit={(event) =>
          signup(
          event,
          props.createFlashMessage,
          props.setUser,
          history,
          t
        )}
      >
        <Form.Group>
          <Form.Label>{t("Email address")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="email"
            required
            name="email"
            placeholder={t("Enter email")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("Username")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="username"
            required
            placeholder={t("Username")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("First Name")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="first_name"
            required
            placeholder={t("First Name")}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>{t("Last Name")}</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            name="last_name"
            required
            placeholder={t("Last Name")}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required
            name="password"
            placeholder={t("Password")}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>{t("Password Confirmation")}</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required
            name="password_confirmation"
            placeholder={t("Password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("Registration")}
        </Button>
      </Form>
    </div>
  )
}

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

export default connect(null, mapDispatchToProps)(App);
