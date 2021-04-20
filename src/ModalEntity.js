import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ModalEntity extends Component {
  constructor(props){
    super(props);
   this.state=
   { 
    show: false,
    setShow: false,
  }

  this.handleClose=this.handleClose.bind(this);
  this.handleShow=this.handleShow.bind(this);
  } 

   handleClose = () =>this.setState({show: false});
   handleShow = () => this.setState({show: true});



   render(){
  return (
    <div>
      <Button variant="primary" onClick={this.handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={this.state.setShow}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      </div>
  )}
}

export default ModalEntity;