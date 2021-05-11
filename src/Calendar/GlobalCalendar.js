import React, { Component } from 'react';
// import axios from 'axios';
import './GlobalCalendar.css'

class GlobalCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TailleTab:[
        {taille: 1},
        {taille: 2},
        {taille: 3},
        {taille: 4},
        {taille: 5},
        {taille: 6},
        {taille: 7},
        {taille: 8},
        {taille: 9},
        {taille: 10},

      ]
    };
  }

  maketable(i){
        return(<th scope="col">jour {i}</th>)           
  }

  render() {

    return (  
      <table class="table table-hover" style={{marginTop:70}}>
      <thead>
        <tr>
          <th scope="col">Utilisateur</th>
          {this.state.TailleTab.map( tab=>
           this.maketable(tab.taille))
          }
        </tr>
      </thead>
      <tbody>
        <tr class="table-light">
          <th scope="row">img</th>
          <td scope="row">+</td>
          <td scope="row">+</td>
          <td scope="row">+</td>
          <td scope="row">+</td>
          <td scope="row">+</td>
          <td scope="row">+</td>
          <td scope="row">+</td>
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