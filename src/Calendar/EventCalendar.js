import FullCalendar from '@fullcalendar/react';
import React, { Component } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';
import ModalEntity from '../ModalEntity';
import axios from 'axios';
import Forms from '../Forms/FormAjoutEvenement';
import interactionPlugin from "@fullcalendar/interaction";

import { Button, Modal } from 'react-bootstrap';

class EventCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Events: [
                { title: 'Title 1', date: '2021-05-01' },
                { title: 'Title 2', date: '2021-05-02' },
                { title: 'Title 2-1', date: '2021-05-02' },
                { title: 'Title 3', date: '2021-05-03' },
                { title: 'Title 4', date: '2021-05-04' },
                { title: 'Title 5', date: '2021-05-05' },
                { title: 'Title 6', date: '2021-05-06' },
            ]
            ,Event:[],
        };

    }

    componentDidMount(){
        this.getEvent();
    }


    getEvents() {
        axios.get(`http://localhost:8000/api/taches`).then(response => {
            this.setState({ Event: response.data['hydra:member'] })
            

        })
    }

    getEvent(){
        axios.get(`http://localhost:8000/api/calendarevents`).then(response => {
            this.setState({ Event: response.data['hydra:member'] })
            console.log(response.data)
        })

      
    }

    handleDateClick = (arg) => {
        window.alert(arg.dateStr)
    }

    render() {
        return (
            <div style={{marginTop:80}}>

                <div className="Calendar">

                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={this.state.Events}
                    />
                    <br />

                    <ModalEntity Buttontitle="Add Event" title="Ajouter evenement" body={<Forms />} />
                </div>

            </div>
        )
    }




}

export default EventCalendar;