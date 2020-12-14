import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import classes from './App.module.css';
import { useTranslation } from 'react-i18next';

const App = props => {
  const { t } = useTranslation();

  let history = useHistory();
  return (
    <div className={classes.NotFound}>
      <h1>{t("Hmmm...")}</h1>
      <h4>{t("Can't see page")}</h4>
      <Button onClick={() => history.replace('/')}>{t("Go to homepage")}</Button>
    </div>
  )
};

export default App;
