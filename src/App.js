import React from 'react';
import Formulario from './components/Formulario';
import FormularioState from './context/formularioState';

function App() {
  return (
    <FormularioState>
      <Formulario />
    </FormularioState>
  );
}

export default App;
