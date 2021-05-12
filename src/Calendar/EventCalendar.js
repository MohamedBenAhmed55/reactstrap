import FullCalendar from '@fullcalendar/react';
import React, { Component } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';
import ModalEntity from '../ModalEntity';
import axios from 'axios';
import Forms from '../Forms/FormAjoutEvenement';
import interactionPlugin from "@fullcalendar/interaction";

import { Button, Modal } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';

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
            conges:[],
            userId:jwtDecode(localStorage.getItem('token')).UserId,
        };

    }

    componentDidMount(){
        this.getEvent(this.state.userId);
    }


    getEvents() {
        axios.get(`http://localhost:8000/api/taches`).then(response => {
            this.setState({ Event: response.data['hydra:member'] })
        
            
        })
    }

    getEvent(id){
        axios.get(`http://localhost:8000/api/calendarevents/${id}`).then(response => {
            this.setState({ Event: response.data.data })
            // console.log(response.data.data[0].date.date.substr(0,10))
            this.creatTable(response.data.data)
        })      
    }

    handleDateClick = (arg) => {
        window.alert(arg.dateStr)
    }

    creatTable(table){
        var Tab= [];
        var event=table;
        console.log('event', event)
        for(let i=0;i<event.length;i++){
            Tab[i]=({
                'date' : event[i].date.date.substr(0,10),
                'title': event[i].titre,
        })
        }

        console.log(Tab);
        this.setState({conges: Tab})

    }

    render() {
        return (
            <div style={{marginTop:80}}>

                <div className="Calendar">

                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={this.state.conges}
                    />
                    <br />

                    <ModalEntity Buttontitle="Add Event" title="Ajouter evenement" body={<Forms />} />
                </div>

            </div>
        )
    }




}

export default EventCalendar;