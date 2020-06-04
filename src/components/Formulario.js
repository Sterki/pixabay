import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';



const Formulario = ({actualizarBusqueda}) => {

    const [imagenbuscada, guardarImagenBuscada] = useState('');
    const [error, guardarError] = useState(false);

    const enviarBusqueda = e =>{

        e.preventDefault();

        // validar
        if(imagenbuscada.trim() === ''){

            guardarError(true);
            return;
        }
        guardarError(false);
        
        // enviar al componente principal
        actualizarBusqueda(imagenbuscada);

    }
    return ( 
        <form 
            onSubmit={enviarBusqueda}
        >
            <div className="row">
                <div className="form-group col-md-8">

                        <input 
                            onChange={e => guardarImagenBuscada(e.target.value) }
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Busca una imagen"
                        />
                </div>
                <div className="form-group col-md-4">

                        <input 
                            type="submit"
                            className="btn btn-lg btn-danger btn-block"
                            value="Buscar"
                            placeholder="Busca una imagen"
                        />

                </div>
            </div>
                {error ? <Error mensaje="Agrega un termino de Busqueda" /> : null}
            </form>

     );
}
 Formulario.propTypes = {

    actualizarBusqueda: PropTypes.func.isRequired
 }
export default Formulario;