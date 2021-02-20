import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classes from "./App.module.css";
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const App = (props) => {
  let history = useHistory();
  const { t } = useTranslation();
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    props.setLoading(true);
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "posts")
    .then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.error, "danger");
      } else {
        setAllRecords(res.data.posts);
      }
      props.setLoading(false);
    }).catch(err => {
      props.createFlashMessage(err.message, "danger");
      props.setLoading(false);
    });
  }, []);

  return (
    <div className={classes.Wrapper}>
      {!props.loading &&
        <div>
          <h2>{t("Records")}</h2>
          {allRecords.length > 0 ?
            allRecords.map(record => (
              <div
                className={classes.Record}
                key={record.id}
                onClick={() => history.push("record/" + record.id)}
              >
                <h4>{record.title}</h4>
                <p>{t("Author")}: {record.author}</p>
                {record.url.length > 0 ?
                  <img
                    className={classes.Image}
                    src={record.url}
                    alt={record.title}
                  /> : null}
              </div>
            )) : <p>{t("No records yet")}</p>
          }
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.loading
})

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    }),
    setLoading: (loading) => dispatch({ type: "SET_LOADING", loading: loading })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
