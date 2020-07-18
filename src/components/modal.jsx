import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      fontSize: "15px",
    },
  },
}));

const ModalParent = (props) => {
  const classes = useStyles();

  const { className, toggle, modal, title, actionfunc, btnTitle } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <b>{title}</b>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <div className={classes.root}>
            <Button style={{ color: "#00ade9", fontSize: "13px" }} onClick={toggle}>
              Cancel
            </Button>
            <Button style={{ color: "#00ade9", fontSize: "13px" }} onClick={actionfunc}>
              {btnTitle}
            </Button>{" "}
            {/* onClick={actionfunc} ini ngebaca actionfunc dari modal yg ada di app.js */}
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalParent;
