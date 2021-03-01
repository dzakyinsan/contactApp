import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Row, Col, Button } from "reactstrap";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { ListGroupItem, ListGroup, Card } from "react-bootstrap";
import { onAddContactAction, onGetContactAction, onEditContactAction, onDeleteContactActon } from "./../redux/action";
import Modal from "./../components/modal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20rem",
      height: "46px",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modaladd]);

  useEffect(() => {
    setFilteredContact(contact.filter((contact) => contact.firstName.toLowerCase().includes(search.toLocaleLowerCase())));
  }, [search, contact]);

  const renderContacts = () => {
    return filteredContact.map((val, index) => {
      return (
        <tr
          className="containerB-2 "
          onClick={() => {
            setShowCard(true);
            setDetail(filteredContact[index]);
          }}
          key={index}
        >
          <td>
            {val.photo.substring(0, 4) === "http" ? (
              <img src={val.photo} className="img-avatar" width="48px" height="48px" alt="img" />
            ) : (
              <div className="avatar-img ">
                <i className="fas fa-user"></i>
              </div>
            )}
          </td>
          <td>
            {val.firstName} {val.lastName}
          </td>
          <td className="table-age">{val.age}</td>
          <td className="table-action">
            <LightTooltip title="edit" TransitionComponent={Zoom}>
              <CreateIcon className="icon-edit-delete" fontSize="small" onClick={() => toggleEdit(index)} />
            </LightTooltip>
            <LightTooltip title="delete" TransitionComponent={Zoom}>
              <DeleteIcon className="icon-edit-delete" fontSize="small" onClick={() => toggleDelete(index)} />
            </LightTooltip>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="page-content">
      {/* MODAL-CREATE */}
      <Modal title="create new contact" toggle={toggleAdd} modal={modaladd} actionfunc={finishAddContact} btnTitle="save">
        <input type="text" name="firstName" placeholder="First name" className="form-control modal-add" onChange={onAddChange} />
        <input type="text" name="lastName" placeholder="Last name" className="form-control modal-add" onChange={onAddChange} />
        <input type="number" name="age" placeholder="Age" className="form-control modal-add" onChange={onAddChange} />
        <input type="text" name="photo" placeholder="image url" className="form-control modal-add" onChange={onAddChange} />
        <div>{renderMessage()}</div>
      </Modal>

      {/* MODAL-EDIT */}
      <Modal title="edit contact" toggle={() => setModalEdit(!modalEdit)} modal={modalEdit} actionfunc={finishEditContact} btnTitle="save">
        <input type="text" name="firstName" value={dataEdit.firstName} className="form-control modal-add" onChange={onEditChange} />
        <input type="text" name="lastName" value={dataEdit.lastName} className="form-control modal-add" onChange={onEditChange} />
        <input type="number" name="age" value={dataEdit.age} className="form-control modal-add" onChange={onEditChange} />
        <input type="text" name="photo" value={dataEdit.photo} className="form-control modal-add" onChange={onEditChange} />
        <div>{renderMessage()}</div>
      </Modal>

      {/* MODAL-DELETE */}
      <Modal title="Delete contact" toggle={() => setModalDelete(!modalDelete)} modal={modalDelete} actionfunc={finishDeleteContact} btnTitle="delete"></Modal>
      {/* MODAL-END*/}
      <div className="page-2-content">
        <h1 className="title">Contact App</h1>
        <Row>
          <Col md="7">
            <Card className="card-style">
              <Card.Body>
                <Row>
                  <Col sm="4" className="create-btn">
                    <Button onClick={toggleAdd} style={{ borderRadius: "10px" }} block>
                      Create
                    </Button>
                  </Col>
                  <Col sm="8">
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
                  </Col>
                </Row>

                <Table className="containerB" borderless>
                  <thead>
                    <tr className="containerB-1">
                      <th>#</th>
                      <th>Name</th>
                      <th colSpan="2">Age</th>
                    </tr>
                  </thead>
                  <tbody>{renderContacts()}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="5">
            {showCard ? (
              <Card className="card-style" style={{ position: "sticky", top: "0" }}>
                <Card.Img className="image-detail" variant="top" src={detail.photo} />
                <Card.Body>
                  <Card.Title>
                    About {detail.firstName} {detail.lastName}
                  </Card.Title>
                  <Card.Text>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quidem numquam beatae ullam. Atque, voluptate quis. Placeat accusantium delectus sapiente! Soluta, qui quam.
                    Consequatur quod repudsiandae recusandae doloribus eligendi sitsss.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="card-color">
                    <div className="listgroup-2">Age</div>
                    <div>{detail.age}</div>
                  </ListGroupItem>
                  <ListGroupItem className="card-color">
                    <div className="listgroup-2">Phone</div>
                    <div>-</div>
                  </ListGroupItem>
                  <ListGroupItem className="card-color">
                    <div className="listgroup-2">Address</div>
                    <div>-</div>
                  </ListGroupItem>
                  <ListGroupItem className="card-color">
                    <div>
                      <div className="listgroup-2">github</div>
                      <Card.Link href="https://github.com/dzakyinsan/contactApp">https://github.com/dzakyinsan/contactApp</Card.Link>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Contact;
