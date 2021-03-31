import React, { Component } from 'react';
import {Card, Button } from 'react-bootstrap';

class Cards extends Component{
    render(){
        return(
            <Card className="mb-3" style={{ color: "#000"}}>
          <Card.Img src="https://picsum.photos/200/50" />
          <Card.Body>
            <Card.Title> Card Example</Card.Title>
            <Card.Text> This is an example of react bootstrap cards</Card.Text>
            <Button variant="primary">Read More</Button>
          </Card.Body>
        </Card>
        )
    }
}

export default Cards;