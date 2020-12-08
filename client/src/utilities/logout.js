import axios from 'axios';

const logout = (user, deleteUser, createFlashMessage, history) => {
  axios.delete(process.env.REACT_APP_PATH_TO_SERVER + "authenticate/sign_out",
    { headers: {
      "uid": user.uid, "client": user.client, "access-token": user.accessToken
    }}, {})
  .then(res => {
    if (res.data.success) {
      deleteUser();
      createFlashMessage("Log out successfuly", "success");
      history.push("/");
    }
  })
  .catch(error => {
    console.log(error)
    createFlashMessage(error.message, "danger");
  });
}

export default logout;
