import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase, eliminarDocumentoDatabase, datosUsuario } from '../config/firebase'
import { Loading } from './Loading'
import { useHistory } from 'react-router'


export const Ventas = () => {

  const history = useHistory()
  console.log(history);

  useEffect(() => {
    const credencialesUsuario = datosUsuario()

    if (credencialesUsuario) {
      console.log('Existe un usuario');
    } else {
      console.log('No Existe un usuario');
      history.push('/login')
    }


  }, history)

  const [listaVentas, setListaVentas] = useState([])
  const [loading, setLoading] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  const handleChange = e => {
    setBusqueda(e.target.value);
    buscar(e.target.value);
  }

  const buscar = async (termino) => {
    var resultado = await listaVentas.filter((elemento) => {
      if (elemento.curso.toLowerCase().includes(termino.toLowerCase())
        || elemento.estado.toLowerCase().includes(termino.toLowerCase())) {
        return elemento;
      }
    });
    setListaVentas(resultado);
  }

  const cargarVentas = async () => {
    setLoading(true)
    const listaTemporal = await consultarDatabase('lista-Ventas')
    // console.log(listaTemporal);
    setListaVentas(listaTemporal)
    setLoading(false)
  }

  const onDelete = async (idVenta) => {
    if (window.confirm('¿Está seguro de eliminar la venta?')) {
      await eliminarDocumentoDatabase('lista-Ventas', idVenta);
      cargarVentas();
    }
  }
  // cargarVentas()

  useEffect(() => {
    cargarVentas()
  }, [])


  return (
    <div>
      {
        loading
          ?
          <Loading />
          :
          <>
            <h3>
              Lista Ventas
              <Link to="/lista-Ventas/create"
                className="btn btn-warning float-end"
              >Adicionar Venta</Link>
            </h3>
            <hr />
            <form className="d-flex">{<input class="form-control me-2" placeholder="Buscar"
              value={busqueda} onChange={handleChange} />}
              <button class="btn btn-outline-secondary" type="submit">Buscar</button>
            </form>
            <br />
            <table className="table table-hover align-middle text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Curso</th>
                  <th scope="col">Precio ($)</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Encargado</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaVentas &&
                  listaVentas.map((ventas, index) => (
                    <tr key={ventas.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{ventas.curso}</td>
                      <td>{ventas.precio}</td>
                      <td>{ventas.fecha}</td>
                      <td>{ventas.cliente}</td>
                      <td>{ventas.encargado}</td>
                      <td>{ventas.estado}</td>
                      <td>
                        <Link className="btn btn-outline-primary btn-sm m-3"
                          to={`/lista-ventas/${ventas.id}`}>
                          Editar
                        </Link>
                        <Link className="btn btn-outline-danger btn-sm"
                          to={`/ventas`} onClick={() => onDelete(ventas.id)}>
                          Eliminar venta
                        </Link>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </>
      }


    </div>
  )
}
