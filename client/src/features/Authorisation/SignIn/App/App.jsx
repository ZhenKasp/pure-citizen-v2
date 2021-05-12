import React from 'react';
import classes from './App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import signin from '../../../../utilities/signin';
import signinWithGoogle from '../../../../utilities/signinViaGoogle';
import signinWithVK from '../../../../utilities/signinViaVK';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import GoogleLogin from 'react-google-login';
import VK, {Auth} from 'react-vk';

const App = props => {
  let history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={classes.SignIn}>
      <h1>{t("Sign In")}</h1>
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
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login via Google"
          onSuccess={(authResult) => signinWithGoogle(props.createFlashMessage, authResult, props.setUser, history, t)}
          onFailure={() => props.createFlashMessage("Couldn't sign in", "danger")}
          cookiePolicy={'single_host_origin'}
        />
        <div className={classes.VKAuthentication}>
          <VK apiId={process.env.REACT_APP_VK_CLIENT_ID}>
            <Auth options={{
              width: '280',
              onAuth: (authResult) => signinWithVK(props.createFlashMessage, authResult, props.setUser, history, t)
            }}/>
          </VK>
        </div>
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
