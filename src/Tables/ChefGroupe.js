import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Forms from '../Forms/FormAjoutUtilisateur'

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
                                                      <td><Button>Modify</Button></td>
                                                      <td><Button>Delete</Button></td>
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
                <Popup trigger={<Button > Ajouter chef</Button>} position="right center">
                     <Forms />
                </Popup>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ChefGroupe;