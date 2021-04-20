import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Forms from '../Forms/FomAjoutGroupe'

class Groupes extends Component{

    constructor() {
        super();
        this.state = { Groupes: []};
    }

    componentDidMount() {
        this.getGroupes();
        
    }


    getGroupes() {
        axios.get(`http://localhost:8000/api/groupes`).then(response => {
            this.setState({ Groupes: response.data['hydra:member']})
        })
     } 
     deleteGroup(id){
        axios.delete(`http://localhost:8000/api/companies/${id}`);
        
     }
 
     modifyGroup(id){
         axios.put(`http://localhost:8000/api/companies/${id}`);
     }

    render(){

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
                                                  <th scope="col">Nom du groupe</th>
                                                  <th scope="col">chef</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>
                                                 </tr>
                                                 </thead>
                                                 
                                                 <tbody>
                                                 { this.state.Groupes.map(groupe =>
                                                    <tr class="table-light" >
                                                      <td>{groupe.name}</td>
                                                      <td>{groupe.chef}</td>
                                                      <td><Button onClick={ () => this.deleteGroup(groupe.id) } >Modify</Button></td>
                                                      <td><Button onClick={ () => this.modifyGroup(groupe.id) } >Remove</Button></td>
                                                    </tr>)} 
   
                                                 </tbody>                                                
                                             </table>                                        
                                    </div>
                               
                       
                               
                            </div>
                        }
                       
                    </div>
                </section>
                <div className="container">
                <div className={'row'}>
                <div className="col-md-10 offset-md-1 row-block" >
                <Popup trigger={<Button > Ajouter groupe</Button>} position="right center">
                     <Forms />
                </Popup>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Groupes;