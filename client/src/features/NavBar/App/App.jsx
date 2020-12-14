import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classes from './App.module.css';
import { useHistory } from "react-router-dom";
import logout from '../../../utilities/logout';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const App = props => {
  const [language, changeLanguage] = useState("ru");
  let history = useHistory();
  const { t, i18n } = useTranslation();
  console.log(i18n);

  const changeLanguageRU = () => {
    i18n.changeLanguage('ru');
    changeLanguage("ru");
  }
  const changeLanguageEN = () => {
    i18n.changeLanguage('en');
    changeLanguage("eng");
  }

  if (props.user.id !== 0) {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand className={classes.Brand} onClick={() => history.push("/")}>PURE CITIZEN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/")}>{t("All Records")}</Nav.Link>
            <Nav.Link onClick={() => history.push("/myrecords")}>{t("My Records")}</Nav.Link>
            { language === "ru" ?
              <Button variant="outline-info" onClick={changeLanguageEN}>{t("Change language EN")}</Button> :
              <Button variant="outline-info" onClick={changeLanguageRU}>{t("Change language RU")}</Button>
            }
          </Nav>
          <Nav>
            <NavDropdown className={classes.Dropdown} title={props.user.username}>
              <NavDropdown.Item onClick={() => history.push("/profile")}>
                {t("Profile")}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => history.push("/about")}>
                {t("About")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => logout(props.user, props.deleteUser, props.createFlashMessage, history, t)}>
                {t("Log out")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  } else {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand className={classes.Brand} onClick={() => history.push("/")}>PURE CITIZEN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/")}>{t("All Records")}</Nav.Link>
            { language === "ru" ?
              <Button variant="outline-info" onClick={changeLanguageEN}>{t("Change language EN")}</Button> :
              <Button variant="outline-info" onClick={changeLanguageRU}>{t("Change language RU")}</Button>
            }
          </Nav>
          <Nav>
            <NavDropdown className={classes.Dropdown} title={t("Guest")}>
              <NavDropdown.Item onClick={() => history.push("/about")}>
                {t("About")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => history.push("/signin")}>
                {t("Sign In")}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => history.push("/signup")}>
                {t("Sign Up")}
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
