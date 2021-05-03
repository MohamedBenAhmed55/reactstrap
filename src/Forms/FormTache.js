import React from 'react';
import { Component } from 'react';

class FormTache extends Component{

    constructor(props){
        super(props);
        this.state={

        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        
    }

    componentDidMount(){

    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(){

    }


}

export default FormTache
