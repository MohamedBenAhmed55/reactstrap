import React, { Component } from 'react';
import { Breadcrumb} from 'react-bootstrap';

class Breadcrumbs extends Component{
    render(){
        return(
        <Breadcrumb>
          <Breadcrumb.Item> Test 1</Breadcrumb.Item>
          <Breadcrumb.Item> Test 2</Breadcrumb.Item>
          <Breadcrumb.Item active="true"> Test 3</Breadcrumb.Item>
        </Breadcrumb>
        )
    }
}

export default Breadcrumbs;