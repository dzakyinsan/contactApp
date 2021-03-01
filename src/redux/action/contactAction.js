import axios from "axios";
import { ADD_CONTACT_ERROR, ADD_CONTACT_SUCCESS, GET_CONTACT_SUCCESS, EDIT_CONTACT_SUCCESS } from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Swal from "sweetalert2";

export const onGetContactAction = () => {
  return (dispatch) => {
    axios
      .get(`${APIURL}contact`)
      .then((res) => {
        dispatch({ type: GET_CONTACT_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {});
  };
};

export const onAddContactAction = (dataAdd) => {
  return (dispatch) => {
    if (dataAdd.firstName === "" || dataAdd.lastName === "" || dataAdd.age === "" || dataAdd.photo === "") {
      dispatch({ type: ADD_CONTACT_ERROR, payload: "you must be forgot something" });
    } else if (dataAdd.lastName.length < 3) {
      dispatch({ type: ADD_CONTACT_ERROR, payload: "length must be at least 3 characters long" });
    } else {
      axios
        .post(`${APIURL}contact`, dataAdd)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contact successfully added",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch({ type: ADD_CONTACT_SUCCESS, payload: res.data.message });
          dispatch(onGetContactAction());
        })
        .catch((err) => {
          dispatch({ type: ADD_CONTACT_ERROR, payload: err });
        });
    }
  };
};

export const onEditContactAction = (dataEdit) => {
  return (dispatch) => {
    const dataNewEdit = {
      firstName: dataEdit.firstName,
      lastName: dataEdit.lastName,
      age: dataEdit.age,
      photo: dataEdit.photo,
    };
    axios
      .put(`${APIURL}contact/${dataEdit.id}`, dataNewEdit)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Contact has been edited `,
          showConfirmButton: false,
          timer: 2500,
        });
        dispatch({ type: EDIT_CONTACT_SUCCESS });
        dispatch(onGetContactAction());
      })
      .catch((err) => {});
  };
};

export const onDeleteContactActon = (idDelete) => {
  return (dispatch) => {
    axios
      .delete(`${APIURL}contact/${idDelete}`)
      .then((res) => {
        let timerInterval;
        Swal.fire({
          title: "Deleting",
          html: " <b></b> ",
          timer: 2000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          },
        });
        dispatch(onGetContactAction());
      })
      .catch((err) => {});
  };
};
