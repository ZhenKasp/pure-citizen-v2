import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from "./App.module.css";
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import MapContainer from '../../../MapContainer';
import { useTranslation } from 'react-i18next';

const App = props => {
  let history = useHistory();
  let { id } = useParams();
  const { t } = useTranslation();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    props.setLoading(true);
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "posts/" + id,
      { headers: { authorization: props.user }}
    ).then(res => {
      if (!res.data.errors) {
        setRecord(res.data.post);
        props.setPosition([res.data.post.latitude, res.data.post.longitude]);
      } else {
        history.replace('/notFound');
      }
      props.setLoading(false);
    }).catch(err => {
      console.log(err);
      props.createFlashMessage(err.message, "danger");
      history.replace('/');
    });
  }, []);

  return (
    <div className={classes.Wrapper}>
      {!props.loading &&
        <div>
          <h2>{record.title}</h2>
          <p>{record.body}</p>
          <p>
            {t("Latitude")}: {record.latitude + " "}
            {t("Longitude")}: {record.longitude}
          </p>
          <MapContainer havePosition/>
          <p>{t("Author")}: {record.author}</p>
          {record.url?.length > 0 ?
            <img
              className={classes.Image}
              src={record.url}
              alt={record.title}
            /> : null}
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  position: state.position,
  loading: state.loading
});

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    }),
    setPosition: position => dispatch({ type: "SET_POSITION", position }),
    setLoading: loading => dispatch({ type: "SET_LOADING", loading })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
