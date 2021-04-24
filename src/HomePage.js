import React, { Component } from 'react';
import logo from './images/LogoCosap.png'

class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            id:"",         
        };
    }

    componentDidMount(){
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
            <div class="card">
                <div class="card-header">
                    <img src={logo} />
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                        <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                </div>
            </div>)
    }
}

export default HomePage;