import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Forms from '../Forms/FormAjoutUtilisateur'
import axios from 'axios';

class Users extends Component {
    constructor() {
        super();
        this.state = { users: []};
    }

    getUsers() {
        axios.get(`http://localhost:8000/api/companies`).then(response => {
            this.setState({ users: response.data['hydra:member']})
        })
     }       
    
    render() {
       
        return(
            <div>
                <section className="row-section">
                
                    <div className="container">
                   
                        {
                            <div className={'row'}>
                                
                                    <div className="col-md-10 offset-md-1 row-block" >                                      
                                             <table class="table table-hover">
                                               <thead>
                                                  <tr>                                                
                                                  <th scope="col">Image</th>
                                                  <th scope="col">Name</th>
                                                  <th scope="col">Description</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>
                                                 </tr>
                                                 </thead>
                                                 { this.state.users.map(user =>
                                                 <tbody>
                                                    <tr class="table-light" >
                                                      <td><img className="rounded-circle"
                                                             src={user.imageURL} alt="avatar"/></td>
                                                      <td>{user.name}</td>
                                                      <td>{user.description}</td>
                                                      <td><Button>Modify</Button></td>
                                                      <td><Button>Delete</Button></td>
                                                    </tr>
   
                                                 </tbody>        )}                                         
                                             </table>                                        
                                    </div>
                               
                       
                               
                            </div>
                        }
                       
                    </div>
                </section>
                <div className="container">
                <div className={'row'}>
                <div className="col-md-10 offset-md-1 row-block" >
                <Popup trigger={<Button > Add User</Button>} position="right center">
                     <Forms />
                </Popup>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Users;