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

    componentDidMount() {
        this.getUsers();
        
    }

    getUsers() {
        axios.get(`http://localhost:8000/api/users`).then(response => {
            this.setState({ users: response.data['hydra:member']})
            // console.log(response.data['hydra:member']);
        })
     }
     
     
    
    render() {
       
        return(
            <div>
                <section className="row-section">
                
                    
                   
                        {
                            <div className={'row'}>
                                
                                    <div className="col-md-10 offset-md-1 row-block" >                                      
                                             <table class="table table-hover">
                                               <thead>
                                                  <tr>                                                
                                                  <th scope="col">Nom</th>
                                                  <th scope="col">Prenom</th>
                                                  <th scope="col">Matricule</th>
                                                  <th scope="col">Cin</th>
                                                  <th scope="col">Date Embauche</th>
                                                  <th scope="col">Présence</th>
                                                  <th scope="col">Salaire</th>
                                                  <th scope="col">numéro</th>
                                                  <th scope="col">Pays</th>
                                                  <th scope="col">Email</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>
                                                 </tr>
                                                 </thead>
                                                 
                                                 <tbody>
                                                 { this.state.users.map(user =>
                                                    <tr class="table-light" >
                                                      <td>{user.nom}</td>
                                                      <td>{user.prenom}</td>
                                                      <td>{user.matricule}</td>
                                                      <td>{user.cin}</td>
                                                      <td>{user.dateEmbauche.substr(0,10)}</td>
                                                      <td>{user.etatPresence}</td>
                                                      <td>{user.Salaire}</td>
                                                      <td>{user.Fax}</td>
                                                      <td>{user.Pays}</td>
                                                      <td>{user.email}</td>
                                                      <td><Button>Modify</Button></td>
                                                      <td><Button>Delete</Button></td>
                                                    </tr>)} 
   
                                                 </tbody>                                                
                                             </table>                                        
                                    </div>
                               
                       
                               
                            </div>
                        }
                       
                    
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