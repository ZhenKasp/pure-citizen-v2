import axios from 'axios';

const signinViaVK = (
  createFlashMessage,
  authResult,
  setUser,
  history,
  t
) => {
  axios.post(
    process.env.REACT_APP_PATH_TO_SERVER + "sign_in_via_vk",
    authResult,
    { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
  ).then(res => {
    console.log(res.data)
    if (!res.data.errors) {
      setUser({
        ...res.data.user,
        accessToken: res.headers["access-token"],
        client: res.headers.client,
        expiry: res.headers.expiry
      });
      axios.defaults.headers.common["uid"] = res.data.user.uid;
      axios.defaults.headers.common["client"] = res.headers.client;
      axios.defaults.headers.common["access-token"] = res.headers["access-token"];
      axios.defaults.headers.common["expiry"] = res.headers.expiry;
      createFlashMessage(t("Sign In sucessfuly"), "success");
      history.push("/");
    }
  }).catch((err) => {
    createFlashMessage(err.message, "danger");
  });
}

export default signinViaVK;
