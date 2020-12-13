import axios from 'axios';
import getFormData from './getFormData';

const changeProfile = (
  event,
  createFlashMessage,
  setUser,
  setIsChanging
)  => {
  event.preventDefault();
  const object = getFormData(event);
  console.log(object);

  axios.put(process.env.REACT_APP_PATH_TO_SERVER + "authenticate", object)
  .then(res => {
    if (res.data.status === "success") {
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
      setIsChanging(false);
      createFlashMessage("Change profile successful", "success");
    }
  })
  .catch((err) => {
    createFlashMessage(err.response.data.errors.full_messages[0], "danger")
  });
}

export default changeProfile;
