import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form } from 'react-bootstrap';

class logintest extends Component{

    constructor(props) {
        super(props);
        this.state = { 
             
               "username": "",
               "password": "",
               "token":""
               
        };
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.Login=this.Login.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
  

    componentDidMount(){
        this.Login();
    }

    Login(){
        axios.post(`http://localhost:8000/api/login_check`,{
       
               "username": "TestUserModified",
               "password": "0000",
                
        }).then(response =>{
            console.log(response.data.token);
           
        });
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value})
      }
  
      handlePasswordChange(event) {
          this.setState({password: event.target.value});       
        }

    render(){

        return(
            <div>
            <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={this.state.username} name="username" onChange={this.onChange}  />
                </Form.Group>
              </Col>
    
              <Col md>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={this.state.password} name="password" onChange={this.onChange} />
                </Form.Group>   
              </Col>
            </Row>
    
            <Button variant="secondary" type="submit" >Login</Button>
          </Form>
          </div>
        )
    }
}

export default logintest;