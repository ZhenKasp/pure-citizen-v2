import React, { useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../../../UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import classes from './NewRecordModal.module.css';
import MapContainer from '../../../MapContainer';
import { useTranslation } from 'react-i18next';

const NewRecordModal = (props) => {
  const [image, setImage] = useState("");
  const { t } = useTranslation();
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const submitCreateRecord = (event) => {
    event.preventDefault();

    const object = new FormData(event.target);
    object.append('post[latitude]', props.position[0]);
    object.append('post[longitude]', props.position[1]);
    if (image?.name) object.append('post[image]', image, image.name);
    object.append('post[user_id]', props.user.id);
    event.persist();
    axios.post(process.env.REACT_APP_PATH_TO_SERVER + "posts",
      object, { headers: { authorization: props.user.token, 'Content-Type': 'multipart/form-data' }}
    ).then(res => {
      if (res.data.error) {
        props.createFlashMessage(res.data.errors, "danger");
      } else {
        props.createFlashMessage(res.data.message, "success");
        props.setMyRecords([...props.myRecords, res.data.post]);
        props.modalIsShownCancelHandler();
        event.target.reset();
        setImage("");
      }
    })
    .catch((err) => {
      props.createFlashMessage(err.message, "danger");
      props.modalIsShownCancelHandler();
    });
  }

  return (
    <div>
      <Modal
        show={props.modalIsShown}
        modalClosed={props.modalIsShownCancelHandler}
      >
        <Form onSubmit={(e) => submitCreateRecord(e)} id="post">
          <h3>{t("Create Record")}</h3>
          <Form.Group>
            <Form.Label>{t("Title")}</Form.Label>
            <Form.Control
              maxLength="255"
              required type="text"
              placeholder={t("Title")}
              name="post[title]"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("Description")}</Form.Label>
            <Form.Control
              name="post[body]"
              required as="textarea"
              rows={3}
              placeholder={t("Description")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("Сoordinates")}</Form.Label>
            <MapContainer havePosition={false} />
          </Form.Group>
          <Form.Group>
            <label>{t("Image")}</label>
            <div {...getRootProps()} className={classes.Dropzone}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>{t("Drop the image")}</p> :
                  <p>{t("Drag 'n' drop")}</p>
              }
              {image &&
                <>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.path}
                    className={classes.Image}
                  />``
                  <span
                    className={classes.Close}
                    onClick={(e) => {e.stopPropagation(); setImage("")}}
                  />
                </>
              }
            </div>
          </Form.Group>
          <Form.Group />
          <Button type="submit">{t("Confirm")}</Button>
        </Form>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  position: state.position
});

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecordModal);
