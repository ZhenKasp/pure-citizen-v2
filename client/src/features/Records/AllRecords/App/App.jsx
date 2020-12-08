import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classes from "./App.module.css";

const App = (props) => {
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "posts")
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, "danger");
        } else {
          setAllRecords(res.data.posts);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, []);

  return (
    <div className={classes.Wrapper}>
      <h2>Records</h2>
      {allRecords.length > 0 ?
        allRecords.map(record => (
          <div className={classes.Record} key={record.id}>
            <h4>{record.title}</h4>
            <p>{record.body}</p>
            <p>Longitude:</p>
            <p>Latitude:</p>
            {record.url.length > 0 ?
              <img
                className={classes.Image}
                src={record.url}
                alt={record.title}
              /> : null}
          </div>
        )) : <p>No records yet</p>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    })
  }
}

export default connect(null, mapDispatchToProps)(App);
