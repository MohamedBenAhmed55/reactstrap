import React, { Component } from 'react';
import logo from '../images/LogoCosap.png'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import classes from './HomePage.module.css'
import { Container, Row , Col } from 'react-bootstrap';
import Time from './Time';

class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            id:"",
            currentHour:   new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours(),
            currentMinute: new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' +new Date().getMinutes()
        };
    }

      currentHour = new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours() ;
      currentMinute = new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' +new Date().getMinutes(); 

    componentDidMount(){
        this.TokenHandle();
         this. getUsername(this.state.id);
    }

    
    TokenHandle(){
        let token = localStorage.getItem('token');
        // console.log(jwt_decode(token).UserId);
        this.state.id=jwt_decode(token).UserId;
    }

    getUsername(id) {
        
        axios.get(`http://localhost:8000/api/getsingleuser/${id}`).then(response => {
            this.setState({ user: response.data });
        })
    }

    render() {
        return (
            <Container style={{marginTop:70}}>
            
            
            
            <Row>
            {/* <Col xs="6" sm="4"> </Col> */}
            <Col>
            <div class="card">
                <div class="card-header">
                    {/* <img src={logo} style={{ width: "60px", height: "60px " , "text-align":"center" }} /> */}
                    <img src={logo} className={classes.center} />
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p className={classes.textCenter}>Bienvenue {this.state.user.name} {this.state.user.lastname}</p>
                        <p><Time></Time></p>
                        {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                    </blockquote>
                </div>
            </div>
            </Col>
            {/* <Col xs="6" sm="4"> </Col> */}
            </Row>
            </Container>)
    }
}

export default HomePage;