import React, { Component } from 'react';

import axios from 'axios';

class loginform extends Component{
    
    constructor(props) {
        super(props);
        this.state = { 
             
               "username": "",
               "password": "",
               
        };
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.Login=this.Login.bind(this);
    }

    Login(){
        axios.post(`http://localhost:8000/api/login_check`,{
       
               "username": this.state.name,
               "password": this.state.city,
                
        }) 
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
           <form onSubmit={this.state.Login}>
                
                <input type="email" id="inputEmail"  placeholder="Email address"  value={this.state.username} onchange={this.handleUsernameChange}/>
                <input type="password" id="inputPassword" placeholder="Password"  value={this.state.password} onchange={this.handlePasswordChange}/>
                
                <button type="submit">Sign in</button>
            </form>
          </div>
          
    
        )
    }
}

export default loginform;