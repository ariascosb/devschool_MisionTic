import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase, eliminarDocumentoDatabase, datosUsuario} from '../config/firebase'
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

  const cargarVentas = async () => {
    setLoading(true)
    const listaTemporal = await consultarDatabase('lista-Ventas')
    // console.log(listaTemporal);
    setListaVentas(listaTemporal)
    setLoading(false)
  }

  const onDelete = async (e) => {
    await eliminarDocumentoDatabase('lista-Ventas')
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
                className="btn btn-outline-success float-end"
              >Adicionar Venta</Link>
            </h3>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Curso</th>
                  <th scope="col">Precio ($)</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Encargado</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
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
                        <Link className="btn btn-outline-primary btn-sm"
                          to={`/lista-ventas/${ventas.id}`}>
                          Editar
                        </Link>
                      </td>
                      <td>
                      <Link className="btn btn-outline-primary btn-sm"
                          to={`/ventas`} onClick={(e) => onDelete}>
                          Delete venta
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
