import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

            "username": "",
            "password": "",
            "token": ""

        };
        this.onChange = this.onChange.bind(this);
        this.Login = this.Login.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    // componentDidMount(){
    //     this.Login();
    // }

    Login() {
        axios.post(`http://localhost:8000/api/login_check`, {

            "username": this.state.username,
            "password": this.state.password,

        }).then(response => {
            console.log(response.data);
            this.setState({ token: response.data.token });
            console.log(this.state.token);
            console.log(jwtDecode(this.state.token));
            localStorage.setItem('token',this.state.token );
            console.log(localStorage.getItem('token'));
        });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="card card-container">

                    <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                    <p id="profile-name" className="profile-name-card"></p>
                    <form className="form-signin" onSubmit={this.Login}>
                        <span id="reauth-email" className="reauth-email"></span>
                        <input type="text" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus value={this.state.username} name="username" onChange={this.onChange} />
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required value={this.state.password} name="password" onChange={this.onChange} />
                        <div id="remember" className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                    </form>
                    <a href="#" className="forgot-password">
                        Forgot the password?
            </a>
                </div>
            </div>
        )
    }
}

export default Login;