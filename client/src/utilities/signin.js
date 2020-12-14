import axios from 'axios';
import getFormData from './getFormData';

const signin = (
  event,
  createFlashMessage,
  setUser,
  history
) => {
  event.preventDefault();
  const object = getFormData(event);

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + "authenticate/sign_in", object)
  .then(res => {
    if (!res.data.errors) {
      setUser({
        ...res.data.data,
        accessToken: res.headers["access-token"],
        client: res.headers.client,
        expiry: res.headers.expiry
      });
      axios.defaults.headers.common["uid"] = res.data.data.uid;
      axios.defaults.headers.common["client"] = res.headers.client;
      axios.defaults.headers.common["access-token"] = res.headers["access-token"];
      axios.defaults.headers.common["expiry"] = res.headers.expiry;
      createFlashMessage("Sign In sucessful", "success");
      history.push("/");
    }
  })
  .catch((err) => {
    createFlashMessage(err.response.data.errors[0], "danger");
  });
}

export default signin;
