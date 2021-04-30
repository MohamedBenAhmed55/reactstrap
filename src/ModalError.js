import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ModalError extends Component {
  constructor(props){
    super(props);
   this.state=
   { 
    show: false,
    setShow: true,
    body: props.body,

  }

  this.handleClose=this.handleClose.bind(this);
  this.handleShow=this.handleShow.bind(this);
  } 

  handleClose = () =>{
    this.setState({setShow: false});
 };

   handleShow = () => this.setState({setShow: true});



   render(){
  return (
    <div>
     

      <Modal
        show={this.state.setShow}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Erreur des champs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )}
}

export default ModalError;