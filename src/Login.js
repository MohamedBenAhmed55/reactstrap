import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Redirect ,Switch , Router } from 'react-router';
// import NavBar from './NavBar';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "password": "",
            "token": "",
            "redirect":false,
            "boolean":false,
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.redirect=this.redirect.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    handleSubmit(event) {
        // console.log('login', {

        //     "username": this.state.username,
        //     "password": this.state.password,

        // });
        axios.post(`http://localhost:8000/api/login_check`, {

            "username": this.state.username,
            "password": this.state.password,

        }).then(response => {
            console.log(response);
            if (response.data.token) {
                this.setState({ token: response.data.token });
                console.log(this.state.token);
                console.log(jwtDecode(this.state.token));
                localStorage.setItem('token', this.state.token);
                // console.log(localStorage.getItem('token'));
                
                <Router ><Redirect to="/dashboard" /></Router>
                // localStorage.setItem('authenticate', true);
                this.setState({redirect: true});
                // localStorage.setItem("isLoggedout", false);            
            }
            
        }).catch((error) => {
            console.log(error);
            alert("Données invalides") 
            this.setState({count: this.state.count + 1})
        });

        event.preventDefault();
    }

    // redirect(token){
    //     if(token){
    //         <Redirect to="/dashboard" />
    //     }
    // }

    // handleUsernameChange(event) {
    //     this.setState({ username: event.target.value })
    // }

    // handlePasswordChange(event) {
    //     this.setState({ password: event.target.value });
    // }

    render() {     
        return (           
            <div className="container">
                <div className="card card-container">

                    <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                    <p id="profile-name" className="profile-name-card"></p>
                    <form className="form-signin" method="post" onSubmit={this.handleSubmit} >
                        <span id="reauth-email" className="reauth-email"></span>
                        <input type="text" id="inputEmail" className="form-control" required placeholder="Username" value={this.state.username} name="username" onChange={this.onChange} readOnly={this.state.boolean} />
                        <input type="password" id="inputPassword" className="form-control" required placeholder="Password" value={this.state.password} name="password" onChange={this.onChange} readOnly={this.state.boolean}/>
                        {/* <div id="remember" className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div> */}
                        <button type="submit" className="btn btn-lg btn-primary btn-block btn-signin" >Login</button>
                    </form>
                    {/* <a href="#" className="forgot-password">
                        Forgot the password?
            </a> */}
                </div>
                {this.state.redirect ? <Redirect exact from="/login" to="/dashboard" /> : null}
            </div>
        )
    }
}

export default Login;