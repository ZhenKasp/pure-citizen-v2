import axios from 'axios';
import getFormData from './getFormData';

const signup = (event, path) => {
  event.preventDefault();
  const object = getFormData(event);

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + path, object)
  .then(res => {
    if (!res.data.token) {
      console.log(res);
    } else {
      console.log(res);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export default signup;
