import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from "./App.module.css";
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const App = props => {
  let history = useHistory();
  let { id } = useParams();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "posts/" + id,
      { headers: { authorization: props.user }}
    ).then(res => {
      if (!res.data.errors) {
        setRecord(res.data.post);
      } else {
        history.replace('/notFound');
      }
    }).catch(err => {
      console.log(err);
      props.createFlashMessage(err.message, "danger");
      history.replace('/');
    });
  }, []);

  return (
    <div className={classes.Wrapper}>
      <h2>{record.title}</h2>
      <p>{record.body}</p>
      <p>latitude: {record.latitude}</p>
      <p>longitude: {record.longitude}</p>
      <p>Author: {record.author}</p>
        {record.url?.length > 0 ?
          <img
            className={classes.Image}
            src={record.url}
            alt={record.title}
          /> : null}
    </div>
  )
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
