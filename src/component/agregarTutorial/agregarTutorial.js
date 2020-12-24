import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AgregaTutorial = () => {

    const [datos, setDatos] = useState({
        titulo: '',
        profesor: '',
        materia: '',
        fecha: ''
    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        // console.log(datos);
        // console.log('enviando datos...' + datos.titulo + ' ' + datos.profesor + ' ' + datos.materia + ' ' + datos.fecha)

        /* fetch('https://rayentutorialtestapp.azurewebsites.net/createtutorial')
        .then(result=>result.json())
        .then(datos=>this.setState({
            done: true,
            datos
        })) */
        let endpoint = 'https://rayentutorialtestapp.azurewebsites.net/createtutorial';
        axios.post(endpoint,datos)
        .then(
            response => response.data
        ).catch(
            err => err
        )
    }

    return (
        <div>
            <div>
                <nav className="navbar navbar-dark bg-primary text-center ">
                    <Link to="/" className="text-light"> 
                        <i className="material-icons"> keyboard_arrow_left </i>
                    </Link>
                
                    <p className="text-white">Agregar Tutorial</p>
                </nav>
            </div>
            <Fragment>
                <h1>Formulario</h1>
                <form className="row" onSubmit={enviarDatos}>
                    <div className="col-md-12">
                        <label>Titulo</label>
                        <input type="text" placeholder="Titulo" className="form-control" onChange={handleInputChange} name="titulo"></input>
                    </div>
                    <div className="col-md-12">
                        <input type="text" placeholder="Profesor" className="form-control" onChange={handleInputChange} name="profesor"></input>
                    </div>
                    <div className="col-md-12">
                        <input type="text" placeholder="Materia" className="form-control" onChange={handleInputChange} name="materia"></input>
                    </div>
                    <div className="col-md-12">
                        <input type="date" placeholder="Fecha" className="form-control" onChange={handleInputChange} name="fecha"></input>
                    </div>
                    <button type="submit" className="btn btn-primary mt-5 float-end">Agregar</button>
                </form>
            </Fragment>
           
        </div>
        
    );
    
}
 
export default AgregaTutorial;