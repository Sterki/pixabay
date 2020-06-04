import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, actualizarBusqueda] = useState(''); 
  const [imagenes, guardarImagenes] = useState([]);

  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);


  //consultamos la api para traer las imagenes

  useEffect( () =>{

      if(busqueda === '') return;

    
      const consultarApi = async () =>{

          // paginador
        const imagenesPorPagina = 30;

         // asignamos la apikey
        const apikey = '16068230-e4231adc028b040d2bfc0ccd7';
        // agregamos la url de la api
        const urlApi = `https://pixabay.com/api/?key=${apikey}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
        const consulta = await fetch(urlApi);
        const resultado = await consulta.json();

        guardarImagenes(resultado.hits);
        
        // calcular el total de paginas 


        const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
        guardarTotalPaginas(calcularTotalPaginas);


        // mover la pantalla hacia arriba ç
        // aqui seleccionamos un div con la clase jumbotron y luego ejecutamos la clase mas 
        // una propieda llamada scrollintoview y le pasamos como paramtros un behavior de tipo smooth que hará
        // que la pantalla suba con un efecto
          const jumbotron = document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({behavior: 'smooth'});

      }

      consultarApi();      

  }, [busqueda, paginaactual]) 



  // definir pagina anterior

  const paginaAnterior = () =>{

    const nuevaPaginaActual = paginaactual - 1;
    
    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);

  }
  // definir pagina siguiente 

  const paginaSiguiente = () =>{

      // crear variable para asignar la pagina siguiente

      const nuevaPaginaActual = paginaactual + 1;

      if(nuevaPaginaActual > totalpaginas) return;

      guardarPaginaActual(nuevaPaginaActual);
     


  }


  return (
    
    <div className="container">
        <div className="jumbotron">
            <p className="lead text-center">Buscador de imagenes</p>
            <Formulario 
              actualizarBusqueda={actualizarBusqueda}
            />
        </div>
        <div className="row justify-content-center">

          <ListadoImagenes 
            imagenes={imagenes}
          />
         {(paginaactual === 1) ? null :  <button 
             type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
             
             >&laquo;Anterior</button>}
             {(paginaactual === totalpaginas) ? null : 
             <button 
             type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaSiguiente}
             
             >Siguiente&raquo;</button>}
        </div>


    </div>
  );
}

export default App;
