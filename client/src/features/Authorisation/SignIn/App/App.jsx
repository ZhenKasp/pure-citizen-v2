import React from 'react';
import classes from './App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import signin from '../../../../utilities/signin';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const App = props => {
  let history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={classes.SignIn}>
      <h1>{t("Please Sign In")}</h1>
      <Form
        onSubmit={(event) =>
          signin(
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
            placeholder={t("Email address")}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required name="password"
            placeholder={t("Password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("Sign In")}
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
