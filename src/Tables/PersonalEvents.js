import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormPersonalEvent';
import axios from 'axios';
import ModalEntity from '../ModalEntity';
import jwtDecode from 'jwt-decode';
import ReactPaginate from 'react-paginate';


class PersonalEvents extends Component {

    constructor() {
        super();
        this.state = {
            jours: [],
            UserId:jwtDecode(localStorage.getItem('token')).UserId,
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getPersonalEvents();

    }

    getPersonalEvents() {
        axios.get(`http://localhost:8000/api/personal_events`).then(response => {
            // this.setState({ jours: response.data['hydra:member'] })
            var tdata=response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
        })
        })
    }

    deleteJour(id) {
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios.delete(`http://localhost:8000/api/personal_events/${id}`).then(res => {
                alert("élément supprimé!");
                this.getPersonalEvents();
                // window.location.reload();
            }
            );
        }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

    render() {
        return (
            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">La Liste Des événements personnels</h1>                    
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>

                                                <th scope="col">Titre</th>
                                                <th scope="col">Date</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.tableData.map((event,i) =>
                                                ( event.user.substr(11,event.user.length-11) == this.state.UserId ?
                                                <tr class="table-light" key={event.id}>
                                                

                                                    <td>{event.title}</td>
                                                    <td>{event.date.substr(0, 10)}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier un événement personnel" body={<Forms body={event} modify={event.id} />} /></td>
                                                    <td><button  className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteJour(event.id)} >Remove</button></td>
                                                </tr>: null) )}

                                        </tbody>
                                    </table>
                                    <ReactPaginate
                                    previousLabel={"🠔"}
                                    nextLabel={"🠖"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                                </div>



                            </div>
                        }

                    </div>
                </section>              
            </div>
        )

    }
}

export default PersonalEvents;