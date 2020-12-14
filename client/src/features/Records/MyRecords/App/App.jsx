import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import classes from './App.module.css';
import NewRecordModal from '../NewRecordModal/NewRecordModal';
import { useHistory } from 'react-router-dom';

const App = (props) => {
  let history = useHistory();
  const [myRecords, setMyRecords] = useState([]);
  const [modalIsShown, setModalIsShown] = useState(false);

  useEffect(() => {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "posts")
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, "danger");
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
      <Button onClick={() => setModalIsShown(true)}>Create new record</Button>
      {myRecords.length > 0 ?
        myRecords.map(record => (
          <div
            className={classes.Record}
            key={record.id}
            onClick={() => history.push("record/" + record.id)}
          >
            <h4>{record.title}</h4>
            <p>
              Latitude: {record.latitude}
              Longitude: {record.longitude}
            </p>
            {record.url.length > 0 ?
              <img
                className={classes.Image}
                src={record.url}
                alt={record.title}
              /> : null}
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

const mapStateToProps = state => ({ position: state.position });

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);