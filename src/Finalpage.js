import React, { Component } from 'react';
import NavBar from './NavBar';
import Login from './Login';
import jwt_decode from "jwt-decode";
import { Button} from 'react-bootstrap';

// import Login from './test/logintest'

class FinalPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          UserAuthenticated: false,
          token:"",
        };
        this.refer=this.refer.bind(this);
      }

    // componentDidMount(){
    //   this.HandleAuthentif();
    // }
    
    // componentDidUpdate(prevProps, prevState) {
    //   if (prevState.token !== this.state.token) {
    //     console.log('pokemons state has changed.')
    //   }
    // }

    // HandleAuthentif(){
    //  let token = JSON.parse(jwt_decode(localStorage.getItem('token')));   
    //  this.setState({token:token})  ;
    // }

    refer(){
      this.setState({UserAuthenticated:true});
    }


      render(){
          return(
           <div> { this.state.UserAuthenticated ? <NavBar /> : <div><Button onClick={this.refer}>Refer</Button><Login /></div>} </div>
          )
      }
}

export default FinalPage;