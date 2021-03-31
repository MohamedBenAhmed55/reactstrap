import FullCalendar from '@fullcalendar/react';
import React,{Component} from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';
import axios from 'axios';

class EventCalendar extends Component{
    constructor() {
        super();
        // this.state = { Events:[
        //     {title: 'Title 1' , date: '2021-03-01'},
        //     {title: 'Title 2' , date: '2021-03-02'},
        //     {title: 'Title 3' , date: '2021-03-03'},
        //     {title: 'Title 4' , date: '2021-03-04'},
        //     {title: 'Title 5' , date: '2021-03-05'},
        //     {title: 'Title 6' , date: '2021-03-06'},         
        // ]};

        this.state = {Events:[]}
    }

    getUsers() {
        axios.get(`http://localhost:8000/api/Evenements`).then(response => {
            this.setState({ Events: response.data['hydra:member']})
        })
     }     
    
    // addevenement=() =>{ this.state.Events.map(event =>
    //    FullCalendar.addevent )

    // }
    
    render(){
        return(
            <div className="Calendar">
            {this.state.Events.map(event=>
                <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            
            events={[{title:event.title,date: event.date}]}
          />)}
            </div>
        )
    }
    
    
    
   
}

export default EventCalendar;