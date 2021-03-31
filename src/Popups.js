import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
 
class Popups extends Component{

    render(){
        return(
        <Popup trigger={<button> Trigger</button>} position="right center">
            <div>
              <button type="button" class="btn btn-primary">Primary</button>
              <button type="button" class="btn btn-secondary">Secondary</button>
              <button type="button" class="btn btn-success">Success</button>
              <button type="button" class="btn btn-info">Info</button>
              <button type="button" class="btn btn-warning">Warning</button>
              <button type="button" class="btn btn-danger">Danger</button>
              <button type="button" class="btn btn-link">Link</button>
            </div>
         </Popup>)
    }
}

export default Popups;
