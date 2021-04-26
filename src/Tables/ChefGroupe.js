import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Forms from '../Forms/FormAjoutChefGroupe';
import ModalEntity from '../ModalEntity';

class ChefGroupe extends Component{

    constructor() {
        super();
        this.state = { Chefs: []};
    }
    componentDidMount() {
        this.getChefGroupe();
        
    }

    getChefGroupe() {
        axios.get(`http://localhost:8000/api/chef_groupes`).then(response => {
            this.setState({ Chefs: response.data['hydra:member']})
        })
     } 

     deleteChef(id){
        axios.delete(`http://localhost:8000/api/companies/${id}`);
        
     }
 
     modifyChef(id){
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
                                                  <th scope="col">Date Debut</th>
                                                  <th scope="col">Date Fin</th>
                                                  <th scope="col">Groupe</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>

                                                 </tr>
                                                 </thead>
                                                 
                                                 <tbody>
                                                 { this.state.Chefs.map(chef =>
                                                    <tr class="table-light" >
                                                      <td>{chef.dateDeb.substr(0,10)}</td>
                                                      <td>{chef.dateFin.substr(0,10)}</td>
                                                      <td>{chef.groupes[0]}</td>
                                                      <td><Button onClick={ () => this.modifyChef(chef.id) } >Modify</Button></td>
                                                      <td><Button onClick={ () => this.deleteChef(chef.id) } >Remove</Button></td>
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
                <ModalEntity Buttontitle="Ajouter un chef de groupe" title="Ajouter Chef" body={<Forms />} />
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ChefGroupe;