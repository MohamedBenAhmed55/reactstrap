import React, { Component } from 'react';
import NavBar from './NavBar';
import Login from './Login';
import jwt_decode from "jwt-decode";

// import Login from './test/logintest'

class FinalPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          UserAuthenticated: false,
        };
      }

    // componentDidMount(){
    //   this.HandleAuthentif();
    // }

    // HandleAuthentif(){
    //   let token = JSON.parse(jwt_decode(localStorage.getItem('token')));;
    //   if (token){
    //     this.setState({UserAuthenticated: true})
    //   }
    //   console.log(token);
    // }


      render(){
          return(
           <div> { this.state.UserAuthenticated ? <NavBar /> : <Login />} </div>
          )
      }
}

export default FinalPage;