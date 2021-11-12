import React, { useReducer } from 'react';
import formularioContext from './formularioContext';
import formularioReducer from './formularioReducer';
import { AGREGAR_DATO, VALIDAR_FORM } from '../types';
import clienteAxios from '../config/axios';

const FormularioState = props => {

    const initialState = {
        datos: [],
        errorform: false
    }

    const [state, dispatch] = useReducer(formularioReducer, initialState)

    const agregarFormulario = async formulario => {

        try {
            
            const resultado = await clienteAxios.post('/api/formulario', formulario);

            dispatch({
                type: AGREGAR_DATO,
                payload: resultado.data
            });

        } catch (error) {
            console.log(error);
        }

    }

    // valida el formulario
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORM
        })
    }

    return(
        <formularioContext.Provider
            value={{
                datos: state.datos,
                errorform: state.errorform,
                agregarFormulario,
                mostrarError
            }}
        >
            {props.children}
        </formularioContext.Provider>
    );

}

export default FormularioState;