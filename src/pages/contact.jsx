import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAddContactAction, onGetContactAction } from "./../redux/action";
import { MODAL_ADD_CLOSE, MODAL_ADD_OPEN } from "./../redux/action/types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "./../components/modal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "600px",
      height: "46px",
      marginTop: "-1px",
      marginLeft: "-2px",
      fontFamily: "Source Sans Pro",
    },
  },
}));

function Contact() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const contact = useSelector((state) => state.ContactReducer.contact);
  const message = useSelector((state) => state.ContactReducer.message);
  const AddModal = useSelector((state) => state.ContactReducer.AddModal);
  // ===========================add===========================
  // const [modaladd, setModaladd] = useState(false);
  // const toggleAdd = () => setModaladd(!modaladd);
  const [dataAdd, setDataAdd] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    photo: "",
  });
  const onAddChange = (e) => {
    const { name, value } = e.target;
    setDataAdd({ ...dataAdd, [name]: value });
  };
  const finishAddContact = () => {
    dispatch(onAddContactAction(dataAdd));
  };
  const onClickModal = () => {
    dispatch({ type: MODAL_ADD_OPEN });
  };
  // ================================= useEffect =======================
  useEffect(() => {
    dispatch(onGetContactAction());
  }, []);

  const renderContacts = () => {
    return contact.map((val, index) => {
      return (
        <div className="containerB-2">
          <td style={{ width: "350px" }}>
            {val.firstName}
            {val.lastName}
          </td>
          <td style={{ width: "370px" }}>{val.age}</td>
          <td>{val.photo}</td>
          <td>
            <CreateIcon className="icon-edit-delete" fontSize="small" />
            <DeleteIcon className="icon-edit-delete" fontSize="small" />
          </td>
        </div>
      );
    });
  };

  console.log(contact);
  console.log(AddModal);
  return (
    <div>
      {/* ======================= modal create contact =================== */}

      <Modal title="create new contact" toggle={() => dispatch({ type: MODAL_ADD_CLOSE })} modal={AddModal} actionfunc={finishAddContact} btnTitle="save">
        <input type="text" name="firstName" placeholder="First name" className="form-control modaladd" onChange={onAddChange} />
        <input type="text" name="lastName" placeholder="Last name" className="form-control modaladd" onChange={onAddChange} />
        <input type="number" name="age" placeholder="Age" className="form-control modaladd" onChange={onAddChange} />
        <input type="text" name="photo" placeholder="image..." className="form-control modaladd" onChange={onAddChange} />
      </Modal>
      {/* =============================== modal end ========================= */}

      <div className="header-container">
        <div className="header-1">
          <div style={{ fontWeight: "bold", paddingTop: "8px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/id/8/89/Jenius-logo.png" width="170px" height="60px" />
          </div>
          <div style={{ marginLeft: "-5px" }}>Contacts</div>
        </div>

        <div className="main-searchBar">
          <div className="searchbar-1">
            <TextField
              className={classes.root}
              id="outlined-basic"
              placeholder="Search"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>

      <div className="contact-main-container">
        <div className="containerA">
          <div className="addBtn">
            <div style={{ paddingLeft: "10px" }}>
              <AddIcon fontSize="large" />
            </div>
            <div style={{ paddingTop: "9px", paddingLeft: "5px" }} onClick={onClickModal}>
              Create Contact
            </div>
          </div>
        </div>

        <div className="containerB">
          <div className="containerB-1">
            <th style={{ width: "350px" }}>Name</th>
            <th>Age</th>
          </div>
          <hr />
          {renderContacts()}
        </div>
      </div>
    </div>
  );
}
export default Contact;
