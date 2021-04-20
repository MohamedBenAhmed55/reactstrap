import React, { Component } from 'react';
import NavBar from './NavBar';
import Login from './Login';

class FinalPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          UserAuthenticated: true,
          token:"",
        };
      }

      render(){
          return(
           <div> { this.state.UserAuthenticated ? <NavBar /> : <Login />} </div>
          )
      }
}

export default FinalPage;