import React, {Component} from 'react';
import axios from 'axios';
import './GlobalCalendar.css'

class GlobalCalendar extends Component{

    construcor(){
        this.state=[];
    }

    render(){

        return(
            <table class="table table-hover">
              <thead>
               <tr>
             <th scope="col">Utilisateur</th>            
             <th scope="col">jour 1</th>
             <th scope="col">jour 2</th>
             <th scope="col">jour 3</th>                      
             </tr>
           </thead>
          <tbody>
            <tr class="table-light">
              <th scope="row">img</th>
              <td scope="row">+</td>
              <td scope="row">+</td>
              <td scope="row">+</td>
           </tr>
    
  </tbody>
</table>

        )
    }
}

export default GlobalCalendar;