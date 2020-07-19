import { ADD_CONTACT_ERROR, ADD_CONTACT_SUCCESS, GET_CONTACT_SUCCESS, EDIT_CONTACT_ERROR, EDIT_CONTACT_SUCCESS } from "./../action/types";

const INITIAL_STATE = {
  message: "",
  contact: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CONTACT_SUCCESS:
      return { ...INITIAL_STATE, message: action.payload };
    case ADD_CONTACT_ERROR:
      return { ...INITIAL_STATE, message: action.payload };
    case GET_CONTACT_SUCCESS:
      return { ...INITIAL_STATE, contact: action.payload };

    default:
      return state;
  }
};
