import FullCalendar from '@fullcalendar/react';
import React,{Component} from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';
import axios from 'axios';

import { Button, Modal } from 'react-bootstrap';

class EventCalendar extends Component{
    constructor(props) {
        super(props);
        this.state = { Events:[
            {title: 'Title 1' , date: '2021-04-01'},
            {title: 'Title 2' , date: '2021-04-02'},
            {title: 'Title 2-1' , date: '2021-04-02'},
            {title: 'Title 3' , date: '2021-04-03'},
            {title: 'Title 4' , date: '2021-04-04'},
            {title: 'Title 5' , date: '2021-04-05'},
            {title: 'Title 6' , date: '2021-04-06'},         
        ],show: false,
        setShow: false,
};
this.handleClose=this.handleClose.bind(this);
this.handleShow=this.handleShow.bind(this);
this.refreshPage=this.refreshPage.bind(this);
    }
    handleClose = () =>{
        this.setState({setShow: false});
        this.refreshPage();
     };
    handleShow = () => this.setState({setShow: true});
    refreshPage = ()=>{
        window.location.reload();
     }

    // getEvents() {
    //     axios.get(`http://localhost:8000/api/evenements`).then(response => {
    //         this.setState({ Events: response.data['hydra:member']})
           
    //     })
    //  }
    

    render(){
        return(
            <div>
   
            <div className="Calendar">
           
                <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            
            events={this.state.Events}
          />
            </div>
            <div className="container">
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
          <Modal.Title>Ajouter Companie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Test</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
                
                
                </div>
            </div>
        )
    }
    
    
    
   
}

export default EventCalendar;