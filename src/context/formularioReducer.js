import { AGREGAR_DATO, VALIDAR_FORM } from '../types';

const reducer = (state, action) => {
    switch(action.type) {
        case AGREGAR_DATO:
            return {
                ...state,
                datos: [...state.datos, action.payload],
                errorform: false
            }
        case VALIDAR_FORM:
            return {
                ...state,
                errorform: true
            }
        
        default:
            return state;
    }
}

export default reducer;