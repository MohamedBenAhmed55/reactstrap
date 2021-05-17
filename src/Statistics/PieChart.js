import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class PieChart extends Component {

  constructor() {
    super();
    this.state = {
      statistiques: "",
      company: jwtDecode(localStorage.getItem('token')).company,
    };
  }

  getStatistiques(id) {
    axios.get(`http://localhost:8000/api/statistics/${id}`).then(response => {
      // console.log(response.data.data[0].present)
      this.setState({ statistiques: response.data.data[0] });
      console.log(this.state.statistiques);
    })
  }

  componentDidMount() {
    this.getStatistiques(this.state.company);
  }


  render() {
    return (
      <>
        <div className='header'>
        <Jumbotron style={{ "text-align": "center", "fontWeight": "bold", height: 160 }}>
            <h1 className="display-3">Etat de présence des employés</h1>
          </Jumbotron>
        </div>
        <div style={{ width: 700, height: 700, textAlign: 'center', marginLeft: 410 }}>
        <br />
        <br />
        <br />
        <Bar data={{
          labels: ['Présent', 'En congé', 'En mission', 'En intérim'],
          datasets: [
            {
              label: 'Présence',
              data: [this.state.statistiques.present, this.state.statistiques.conge, this.state.statistiques.mission, this.state.statistiques.interim],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
          options={{
            indexAxis: 'y',
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
              },
            },
          },
         { maintainAspectRation:true}} />
         </div>
      </>)
  }

}

export default PieChart;