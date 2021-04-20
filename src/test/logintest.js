import React, { Component } from 'react';
import axios from 'axios';
import Login from '../Login';

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
    }
  

    componentDidMount(){
        this.Login();
    }
    Login(){
        axios.post(`http://localhost:8000/api/login_check`,{
       
               "username": "TestUserModified",
               "password": "0000",
                
        }).then(response =>{
            this.setState({token: response.data.token});
            console.log(response);
           
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
            <form onSubmit={this.Login}>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
                <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                <button type="submit">Login</button>
            </form>
            { (this.state.token) ? <h1>Hello</h1> : null }
            </div>
        )
    }
}

export default logintest;