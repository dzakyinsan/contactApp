import { ADD_CONTACT_ERROR, ADD_CONTACT_SUCCESS, GET_CONTACT_SUCCESS, MODAL_ADD_OPEN, MODAL_ADD_CLOSE } from "./../action/types";

const INITIAL_STATE = {
  message: "",
  contact: [],
  AddModal: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CONTACT_SUCCESS:
      return { ...INITIAL_STATE, AddModal: false };
    case ADD_CONTACT_ERROR:
      return { ...INITIAL_STATE, message: action.payload };
    case GET_CONTACT_SUCCESS:
      return { ...INITIAL_STATE, contact: action.payload };
    case MODAL_ADD_OPEN:
      return { ...INITIAL_STATE, AddModal: true };
    case MODAL_ADD_CLOSE:
      return { ...INITIAL_STATE, AddModal: false };
    default:
      return state;
  }
};
