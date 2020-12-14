import axios from 'axios';

const logout = (user, deleteUser, createFlashMessage, history, t) => {
  axios.delete(process.env.REACT_APP_PATH_TO_SERVER + "authenticate/sign_out",
    { headers: {
      "uid": user.uid, "client": user.client, "access-token": user.accessToken
    }}, {})
  .then(res => {
    if (res.data.success) {
      deleteUser();
      createFlashMessage(t("Log out successfuly"), "success");
      axios.defaults.headers.common["uid"] = '';
      axios.defaults.headers.common["client"] = '';
      axios.defaults.headers.common["access-token"] = '';
      axios.defaults.headers.common["expiry"] = '';
      history.push("/");
    }
  })
  .catch(error => {
    console.log(error)
    createFlashMessage(error.message, "danger");
  });
}

export default logout;
