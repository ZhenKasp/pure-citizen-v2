import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import classes from './App.module.css';
import NewRecordModal from '../NewRecordModal/NewRecordModal';

const App = (props) => {
  const [myRecords, setMyRecords] = useState([]);
  const [modalIsShown, setModalIsShown] = useState(false);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "posts")
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setMyRecords(res.data.posts);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
  }, []);

  return (
    <div className={classes.Wrapper}>
      <h2>My Records</h2>
      <Button  onClick={() => setModalIsShown(true)}>Create new record</Button>
      {myRecords.length > 0 ?
        myRecords.map(record => (
          <div className={classes.Record} key={record.id}>
            <h4>{record.title}</h4>
            <p>{record.body}</p>
            <p>Longitude:</p>
            <p>Latitude:</p>
            <img className={classes.Image} src={record.url} alt={record.title} />
          </div>
        )) : <p>No records yet</p>
      }
      <NewRecordModal
        modalIsShownHandler={() => setModalIsShown(true)}
        modalIsShownCancelHandler={() => setModalIsShown(false)}
        modalIsShown={modalIsShown}
        myRecords={myRecords}
        setMyRecords={setMyRecords}
      />
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
