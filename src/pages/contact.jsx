import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAddContactAction, onGetContactAction, onEditContactAction, onDeleteContactActon } from "./../redux/action";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "./../components/modal";
import Swal from "sweetalert2";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { AccordionDetails } from "@material-ui/core";
import { ListGroupItem, ListGroup, Card } from "react-bootstrap";

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
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function Contact() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const contact = useSelector((state) => state.ContactReducer.contact);
  const message = useSelector((state) => state.ContactReducer.message);
  // =========================== ADD ===========================
  const [modaladd, setModaladd] = useState(false);
  const toggleAdd = () => setModaladd(!modaladd);
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
    setDataAdd({
      firstName: "",
      lastName: "",
      age: 0,
      photo: "",
    });
    toggleAdd();
  };
  // ================================== EDIT ========================
  const [modalEdit, setModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const toggleEdit = (index) => {
    setDataEdit(filteredContact[index]);
    setModalEdit(!modalEdit);
  };
  const onEditChange = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  };

  const finishEditContact = () => {
    dispatch(onEditContactAction(dataEdit));
    setModalEdit(!modalEdit);
  };

  const renderMessage = () => {
    if (message.length > 13) {
      Swal.fire({
        icon: "error",
        text: `${message}`,
      }).then(dispatch(onGetContactAction()));
    }
  };

  // ================================ DELETE ============================
  const [idDelete, setIdDelete] = useState("");
  const [modalDelete, setModalDelete] = useState(false);

  const toggleDelete = (index) => {
    setIdDelete(filteredContact[index].id);
    setModalDelete(!modalDelete);
  };

  const finishDeleteContact = () => {
    dispatch(onDeleteContactActon(idDelete));
    setModalDelete(!modalDelete);
  };
  // ================================== FILTER ==========================
  const [search, setSearch] = useState("");
  const [filteredContact, setFilteredContact] = useState([]);

  // ======================================== contact detail =============
  const [detail, setDetail] = useState([]);
  const [showCard, setShowCard] = useState(false);

  // ================================= useEffect =======================
  useEffect(() => {
    dispatch(onGetContactAction());
  }, [modaladd]);

  useEffect(() => {
    setFilteredContact(
      contact.filter((contact) => {
        return contact.firstName.toLowerCase().includes(search.toLocaleLowerCase());
      })
    );
  }, [search, contact]);

  const renderContacts = () => {
    return filteredContact.map((val, index) => {
      return (
        <div className="containerB-2" onClick={() => setDetail(filteredContact[index])}>
          <td style={{ width: "320px" }}>
            <img src={val.photo} className="img-avatar" width="48px" height="48px" />
            {val.firstName} {val.lastName}
          </td>
          <td style={{ width: "100px", fontWeight: "bold" }}>{val.age}</td>
          {/* <td></td> */}
          <td style={{ textAlign: "right" }}>
            <LightTooltip title="edit" TransitionComponent={Zoom}>
              <CreateIcon className="icon-edit-delete" fontSize="small" onClick={() => toggleEdit(index)} />
            </LightTooltip>
            <LightTooltip title="delete" TransitionComponent={Zoom}>
              <DeleteIcon className="icon-edit-delete" fontSize="small" onClick={() => toggleDelete(index)} />
            </LightTooltip>
          </td>
        </div>
      );
    });
  };

  // console.log("contact", contact);
  // console.log("message redux", message);
  // console.log("dataadd", dataAdd);
  return (
    <div>
      {/* ======================= modal create contact =================== */}

      <Modal title="create new contact" toggle={toggleAdd} modal={modaladd} actionfunc={finishAddContact} btnTitle="save">
        <input type="text" name="firstName" placeholder="First name" className="form-control modaladd" onChange={onAddChange} />
        <input type="text" name="lastName" placeholder="Last name" className="form-control modaladd" onChange={onAddChange} />
        <input type="number" name="age" placeholder="Age" className="form-control modaladd" onChange={onAddChange} />
        <input type="text" name="photo" placeholder="image..." className="form-control modaladd" onChange={onAddChange} />
        <div>{renderMessage()}</div>
      </Modal>

      {/* =============================== modal edit contact ========================= */}
      <Modal title="edit contact" toggle={() => setModalEdit(!modalEdit)} modal={modalEdit} actionfunc={finishEditContact} btnTitle="save">
        <input type="text" name="firstName" value={dataEdit.firstName} className="form-control modaladd" onChange={onEditChange} />
        <input type="text" name="lastName" value={dataEdit.lastName} className="form-control modaladd" onChange={onEditChange} />
        <input type="number" name="age" value={dataEdit.age} className="form-control modaladd" onChange={onEditChange} />
        <input type="text" name="photo" value={dataEdit.photo} className="form-control modaladd" onChange={onEditChange} />
        <div>{renderMessage()}</div>
      </Modal>

      {/* ==================================== modal delete contact ============================= */}
      <Modal title="Delete contact" toggle={() => setModalDelete(!modalDelete)} modal={modalDelete} actionfunc={finishDeleteContact} btnTitle="delete"></Modal>
      {/* ========================================== modal end =============================== */}
      <div className="header-container">
        <div className="header-1">
          <div>
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className="contact-main-container" onClick={() => setShowCard(true)}>
          <div className="containerA">
            <div className="addBtn">
              <div style={{ paddingLeft: "10px" }}>
                <AddIcon fontSize="large" />
              </div>
              <div style={{ paddingTop: "9px", paddingLeft: "5px" }} onClick={toggleAdd}>
                Create Contact
              </div>
            </div>
          </div>

          <div className="containerB">
            <div className="containerB-1">
              <th style={{ width: "320px" }}>Name</th>
              <th>Age</th>
            </div>
            <hr />
            <div className="containerB-3">{renderContacts()}</div>
          </div>
        </div>

        {showCard ? (
          <div className="contact-main-container-2-show">
            <div style={{ width: "25rem" }}>
              <Card.Img className="imageDetail" variant="top" src={detail.photo} />
              <Card.Body>
                <Card.Title>
                  About {detail.firstName} {detail.lastName}
                </Card.Title>
                <Card.Text>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quidem numquam beatae ullam. Atque, voluptate quis. Placeat accusantium delectus sapiente! Soluta, qui quam.
                  Consequatur quod repudiandae recusandae doloribus eligendi sit.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <div className="listgroup2">Age</div>
                  <div>{detail.age}</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="listgroup2">Phone</div>
                  <div>-</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="listgroup2">Address</div>
                  <div>-</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div>
                    <div className="listgroup2">github</div>
                    <Card.Link href="https://github.com/dzakyinsan/contactApp">https://github.com/dzakyinsan/contactApp</Card.Link>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default Contact;
