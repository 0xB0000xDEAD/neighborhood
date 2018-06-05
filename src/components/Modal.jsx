import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";

class DetailsModal extends Component {
  handleHide = () => {
    // this.setState({ show: false });
    this.props.closeModal();
  };
  doMagic() {
    let map = document.getElementById("map");
    let boundingBox = map.getBoundingClientRect();
    // console.log(boundingBox.top, boundingBox.right);
    let modal = document.getElementById("modal");
    modal.style.top = `${boundingBox.top}px`;
    let modalDialog = document.getElementsByClassName("modal-dialog")[0];
    let modalContent = document.getElementsByClassName("modal-content")[0];

    console.log(modalDialog);
    console.log(modalContent);

    // modalDialog.style.height = "400px";
    // modalDialog.style.border = "1px solid red";
    modalDialog.style.margin = "3px auto";
    modalDialog.style.width = "auto";

    // modalContent.style.border = "1px solid blue";
    modalContent.style.height = "394px";
  }

  render() {
    return (
      this.props.place !== undefined && (
        <Modal
          id="modal"
          // {...this.props} // for what?
          show={this.props.isModalShowed}
          onHide={this.handleHide}
          // dialogClassName="custom-modal"
          autoFocus={true}
          restoreFocus={true}
          onEnter={this.doMagic}
        >
          {/* <Modal.Dialog
            bsClass="custom-modal"
            // bsSize="sm"
          > */}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Modal heading - details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.place.name}</h4>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
              unde commodi aspernatur enim, consectetur. Cumque deleniti
              temporibus ipsam atque a dolores quisquam quisquam adipisci
              possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
              quasi quod accusamus eos quod.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
          {/* </Modal.Dialog> */}
        </Modal>
      )
    );
  }
}

DetailsModal.propTypes = {};

export default DetailsModal;
