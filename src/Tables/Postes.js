import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Forms from '../Forms/FormAjoutPoste'

class Postes extends Component{

    constructor() {
        super();
        this.state = { Postes: []};

        this.handleDelete=this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getPostes();
        
    }


    getPostes() {
        axios.get(`http://localhost:8000/api/postes`).then(response => {
            this.setState({ Postes: response.data['hydra:member']})
            // console.log(response.data['hydra:member']);
        })
     }
     
    handleDelete(poste){
        axios.delete(`http://localhost:8000/api/postes`, {
            id:poste.id,
        }).then( 
            console.log("deleted")
        )
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
                                                  <th scope="col">Name</th>
                                                  <th scope="col">Company</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>
                                                 </tr>
                                                 </thead>
                                                 
                                                 <tbody>
                                                 { this.state.Postes.map(poste =>
                                                    <tr class="table-light" key={poste.id} >
                                                      
                                                      <td>{poste.name}</td>
                                                      <td>{poste.company}</td>
                                                      <td><Button>Modify</Button></td>
                                                      <td><Button onClick={this.handleDelete(poste)}>Delete</Button></td>
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
                <Popup trigger={<Button > Ajouter Poste</Button>} position="right center">
                     <Forms />
                </Popup>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Postes;