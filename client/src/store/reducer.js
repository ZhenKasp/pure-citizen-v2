const actions = {
  SET_USER: "SET_USER",
  DELETE_USER: "DELETE_USER",
  CREATE_FLASH_MESSAGE: "CREATE_FLASH_MESSAGE",
  DESTROY_FLASH_MESSAGE: "DESTROY_FLASH_MESSAGE",
  SET_POSITION: "SET_POSITION",
  SET_LOADING: "SET_LOADING",
}

const initialState = {
  user: {
    id: 0,
    username: "",
    client: "",
    accessToken: "",
    uid: "",
    expiry: ""
  },
  flashMessage: {
    text: "",
    variant: "danger"
  },
  position: [53.9, 27.5667],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: { ...action.value }
      };
    case actions.DELETE_USER:
      return {
        ...state,
        user: { ...initialState.user }
      };
    case actions.CREATE_FLASH_MESSAGE:
      const text = typeof action.text === 'string' ? action.text : "Something went wrong";
      return {
        ...state,
        flashMessage: { text: text, variant: action.variant }
      };
    case actions.DESTROY_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: { text: "", variant: "" }
      };
    case actions.SET_POSITION:
      return {
        ...state,
        position: action.position
      };
    case actions.SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    default:
      return state;
  }
}

export default reducer;
