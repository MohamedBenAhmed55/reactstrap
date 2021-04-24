import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ModalEntity extends Component {
  constructor(props){
    super(props);
   this.state=
   { 
    show: false,
    setShow: false,
    title: props.title,
    Buttontitle: props.Buttontitle,
    body: props.body,

  }

  this.handleClose=this.handleClose.bind(this);
  this.handleShow=this.handleShow.bind(this);
  this.refreshPage=this.refreshPage.bind(this);
  } 

  handleClose = () =>{
    this.setState({setShow: false});
    this.refreshPage();
 };

 refreshPage = ()=>{
  window.location.reload();
}
   handleShow = () => this.setState({setShow: true});



   render(){
  return (
    <div>
      <Button variant="primary" onClick={this.handleShow}>
        {this.state.Buttontitle}
      </Button>

      <Modal
        show={this.state.setShow}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
      </div>
  )}
}

export default ModalEntity;