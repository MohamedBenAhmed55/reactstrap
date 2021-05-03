import React from 'react';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import ModalEntity from '../ModalEntity';
import Forms from '../Forms/FormTache';
import validate from '../images/tick.png'
import axios from 'axios';
import jwt_decode from "jwt-decode";


class Taches extends Component{

    constructor(props){
        super(props);
        this.state={
            Taches:[],
            Tachesres:[],
            CompanyId:jwt_decode(localStorage.getItem('token')).company,
            UserId:jwt_decode(localStorage.getItem('token')).UserId,
        }

    }

    componentDidMount(){
        this.getTaches();
        // console.log(this.state.Tachesres)
        // console.log(("/api/users/").concat(this.state.UserId))
        
    }

    getTaches() {
        axios.get(`http://localhost:8000/api/taches`).then(response => {
            this.setState({ Taches: response.data['hydra:member'] })
            // console.log(response.data['hydra:member'])
            // let str="/api/users/";
            // console.log(str.concat(this.state.UserId))
            
            // this.state.Tachesres.map(tache =>{
            //     // console.log(tache.userDestinataire == str.concat(this.state.UserId))
            //     let i =0;
            //     if(tache.userDestinataire == str.concat(this.state.UserId)){
            //         // console.log(tache)
            //         this.state.Taches[i] = tache;
            //         // console.log(this.state.Taches);
            //     }
            // })

            // console.log(this.state.Taches)
            
            // {(tache.userDestinataire.localeCompare(("/api/users/").concat(this.state.UserId))) ? 
            // console.log(this.state.Taches[0].userDestinataire.substr(11, this.state.Taches[0].userDestinataire.length)-11)

        })
    }

    Validatetache(id){
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/taches/${id}`,
            data: {
                "isValidated":true,
            },
            headers: {
                "Content-Type": 'application/merge-patch+json'
            }
        }).catch(err => {
            alert("L'opération a échoué");
        })}
    



    render(){
        return(
            
            <div>
            <section className="row-section">

                <div className="container">

                    {
                        <div className={'row'}>


                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">libelle</th>
                                        <th scope="col">dateDeb</th>
                                        <th scope="col">Delai</th>
                                        <th scope="col">Priorite</th>
                                        <th scope="col">description</th>                                        
                                        <th scope="col">validée</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.Taches.map(tache =>
                                        ( tache.userDestinataire.substr(11,tache.userDestinataire.length-11) == this.state.UserId ?     
                                            <tr class="table-light" key={tache.id}>                                           
                                            <td>{tache.libelle}</td>
                                            <td>{tache.dateDeb.substr(0,10)}</td>
                                            <td>{tache.dateFin.substr(0,10)}</td>
                                            <td>{tache.Priorite}</td>
                                            <td>{tache.description}</td>
                                            { tache.isValidated  ? <td>Validée</td> : <td>Non validée</td>}                                                 
                                            <td><Button onClick={() => this.modifytache(tache.id)} >Modifier</Button></td>
                                            <td><Button onClick={() => this.deletetache(tache.id)} >Supprimer</Button></td>
                                            <td><Button onClick={() => this.Validatetache(tache.id)} >Valider</Button></td>
                                        </tr> : null) )}

                                </tbody>
                            </table>
                        </div>




                    }

                </div>
            </section>
            <div className="container">

                <ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<Forms />} />


            </div>
        </div>             
        )
    }
}

export default Taches;