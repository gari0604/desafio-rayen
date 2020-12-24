import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom'
import axios from 'axios';


import {
    Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter
  } from 'reactstrap'

class DesafioRayen extends React.Component{
    constructor(args){
        super(args)
        this.state = {
            loading: false,
            tutoriales: [],
            url: 'https://rayentutorialtestapp.azurewebsites.net/tutorials',
            modalActualizar: false,
            form: {
                nombre: '',
                profesor: '',
                materia: '',
                fecha:'',
            },
        }
    }

    componentDidMount() {
        this.getTutoriales();
    }
    getTutoriales = () => {
        this.setState ({loading: true })
        fetch(this.state.url)
        .then(res => res.json())
        .then(tutorialesJson => {
            this.setState({
                tutoriales: tutorialesJson,
                loading: false
            })
        })
        .catch((error) => {
            console.error(error)
        });
    };

    mostrarModalActualizar = (dato,i) => {
        this.setState({
            index: i,
            form: dato,
            modalActualizar: true,
        });
      };
    
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };
    handleChange = (e) => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
    };
    editar = (dato) => {
        const index = this.state.index

        let endpoint = 'https://rayentutorialtestapp.azurewebsites.net/updatetutorial/'+index;
        axios.put(endpoint,dato)
        .then(
            response => response.data
            
        ).catch(
            err => err
        )
        this.setState({ modalActualizar: false });
        
    };
    eliminar = (dato,i) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
        if (opcion == true) {
            
            let endpoint = 'https://rayentutorialtestapp.azurewebsites.net/deletetutorial/'+i;
            axios.delete(endpoint,dato)
            .then(
                response => response.data
                
            ).catch(
                err => err
            )
        
        }
    };
    parseData(){
        if (this.state.tutoriales){
            return (
                <div>
                    <Container>
                        <br />
                        <Table>
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Profesor</th>
                                <th>Acción</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.tutoriales.map((dato,i) => (
                                <tr key={dato.id}>
                                <td>{dato.nombre}</td>
                                <td>{dato.profesor}</td>
                                <td>
                                    <Button
                                    color="primary"
                                    onClick={() => this.mostrarModalActualizar(dato,i)}
                                    >
                                    Editar
                                    </Button>{" "}
                                    <Button color="danger" onClick={()=> this.eliminar(dato,i)}>Eliminar</Button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <br /><br />
                    </Container>
                    <Modal isOpen={this.state.modalActualizar}>
                        <ModalHeader>
                            <div><h3>Editar Registro</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                    Nombre:
                                </label>
                            
                                <input
                                    className="form-control"
                                    name="nombre"
                                    type="text"
                                    onChange={this.handleChange}
                                    value= {this.state.form.nombre}
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <label>
                                    Profesor: 
                                </label>
                                <input
                                    className="form-control"
                                    name="profesor"
                                    type="text"
                                    onChange={this.handleChange}
                                    value= {this.state.form.profesor}
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <label>
                                    Materia: 
                                </label>
                                <input
                                    className="form-control"
                                    name="materia"
                                    type="text"
                                    onChange={this.handleChange}
                                    value= {this.state.form.materia}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Fecha: 
                                </label>
                                <input
                                    className="form-control"
                                    name="fecha"
                                    type="date"
                                    onChange={this.handleChange}
                                    value= {this.state.form.fecha}
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => this.editar(this.state.form)}
                            >
                                Editar
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => this.cerrarModalActualizar()}
                            >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                
                
            );
           
        }
    }
    render(){
        if (this.state.loading) {
            return(
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                        <div className="circle"></div>
                        </div><div className="gap-patch">
                        <div className="circle"></div>
                        </div><div className="circle-clipper right">
                        <div className="circle"></div>
                        </div>
                    </div>
                </div>
            )
        }
        
        return(
            <div>
                <div>
                    <nav className="navbar navbar-dark bg-primary">
                    <p className="text-white">Tutoriales</p>
                    </nav>
                </div>
                <div>
                    {this.parseData()}
                </div>
                <div>
                    <Link className="btn btn-danger" to="/agregarTutorial">
                        <i className="material-icons"> add </i>
                    </Link>
                    <br />
                </div>
            </div>

        );

        
    }
    
}

export default DesafioRayen;
