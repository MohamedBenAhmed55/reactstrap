import React, {Component} from 'react';
import axios from 'axios';

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
             
             <th scope="col">jour</th>
            

            
             </tr>
           </thead>
          <tbody>
            <tr class="table-light">
              <th scope="row">Light</th>
              <td>+</td>
              <td>+</td>
              <td>+</td>
           </tr>
    
  </tbody>
</table>

        )
    }
}