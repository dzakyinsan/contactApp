import axios from "axios";
import { ADD_CONTACT_ERROR, ADD_CONTACT_LOADING, ADD_CONTACT_SUCCESS, GET_CONTACT_LOADING, GET_CONTACT_SUCCESS } from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Swal from "sweetalert2";

export const onAddContactAction = (dataAdd) => {
  return (dispatch) => {
    dispatch({ type: ADD_CONTACT_LOADING });
    if (dataAdd.firstName === "" || dataAdd.lastName === "" || dataAdd.age === "" || dataAdd.photo === "") {
      dispatch({ type: ADD_CONTACT_ERROR, payload: "you must be forgot something" });
    } else if (dataAdd.lastName.length < 3) {
      dispatch({ type: ADD_CONTACT_ERROR, payload: "length must be at least 3 characters long" });
    } else {
      console.log(dataAdd, "dataAdd");
      axios
        .post(`${APIURL}contact`, dataAdd)
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            // title: "Signed in successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .then((res) => {
          dispatch({ type: ADD_CONTACT_SUCCESS });
          dispatch(onGetContactAction());
        })
        .catch((err) => {
          console.log(err, "error 123");
          dispatch({ type: ADD_CONTACT_ERROR, payload: err });
        });
    }
  };
};

export const onGetContactAction = () => {
  return (dispatch) => {
    dispatch({ type: GET_CONTACT_LOADING });
    axios
      .get(`${APIURL}contact`)
      .then((res) => {
        console.log(res.data.data);
        dispatch({ type: GET_CONTACT_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
