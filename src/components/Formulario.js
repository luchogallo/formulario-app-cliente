import React, { useContext, useState, useEffect } from 'react';
import formularioContext from '../context/formularioContext';

const Formulario = () => {

    const formulariosContext = useContext(formularioContext);
    const { errorform, agregarFormulario, mostrarError} = formulariosContext;

    //state para formulario
    const [formulario, setFormulario] = useState({
        nombre: '',
        pais: ''
    });

    // state para API
    const [form, setForm] = useState([]);

    //extraer campos del formulario
    const {nombre, pais} = formulario;

    useEffect(() => {
        //console.log('useEffect');
        obtenerDatos();
    }, []);

    // funcion que permite consultar los paises de la API
    const obtenerDatos = async () => {
        const api = await fetch('https://restcountries.com/v3.1/all');
        const country = await api.json();
        //console.log(country);
        setForm(country);
    }
    
    //lee los contenidos del input
    const onChange = e => {
        setFormulario({
            ...formulario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario envia el formulario
    const onSubmit = e =>{
        e.preventDefault();

        //validar el formulario
        if(nombre === '' || pais === '') {
            mostrarError();
            return;
        }

        //agregar al state
        agregarFormulario(formulario)

        //reiniciar el form
        setFormulario({
            nombre: '',
            pais: ''
        })

    }

    return(
        <div className="container">
            <div className="contenido-form contenido">
                <h1>Formulario</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="pais">Pais</label>
                        <select
                            name="pais"
                            value={pais}
                            onChange={onChange}
                            className="select-form"
                        >
                            <option value="">-- Seleccione --</option>
                            {
                                form.map(item => (
                                    <option key={item.id} value={item.name.common}>{item.name.common}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn-block"
                        value="Enviar" />
                    </div>
                </form>
                {errorform ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}
            </div>
        </div>
    );
}

export default Formulario;