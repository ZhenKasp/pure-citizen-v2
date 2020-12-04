import axios from 'axios';
import getFormData from './getFormData';

const signin = (
  event,
  path,
  createFlashMessage
) => {
  event.preventDefault();
  const object = getFormData(event);

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + path, object)
  .then(res => {
    console.log(res.data);
    if (res.data.errors) {
      console.log(res.data.error);
    } else {
      console.log(res);
    }
  })
  .catch((err) => {
    createFlashMessage(err.message, "danger")
  });
}

export default signin;
