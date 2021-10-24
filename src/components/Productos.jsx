import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase, eliminarDocumentoDatabase, datosUsuario} from '../config/firebase'
import { Loading } from './Loading'
import { useHistory } from 'react-router'


export const Productos = () => {

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

  const [listaProductos, setListaProductos] = useState([])
  const [loading, setLoading] = useState(false)

  const cargarProductos = async () => {
    setLoading(true)
    const listaTemporal = await consultarDatabase('lista-productos')
    // console.log(listaTemporal);
    setListaProductos(listaTemporal)
    setLoading(false)
  }

  const onDelete = async (e) => {
    await eliminarDocumentoDatabase('lista-productos')
  }

  // cargarProductos()

  useEffect(() => {
    cargarProductos()
  }, [])

 

  return (
    <div>
      {
        loading
          ?
          <Loading />
          :
          <>
            <h1>
              Lista Productos
              <Link to="/lista-productos/create"
                className="btn btn-outline-success float-end"
              >Adicionar Producto</Link>
            </h1>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Precio Unitario ($)</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  listaProductos.map((producto, index) => (
                    <tr key={producto.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{producto.descripcion}</td>
                      <td>{producto.precioUnitario}</td>
                      <td>{producto.estado}</td>
                      <td>
                        <Link className="btn btn-outline-primary btn-sm"
                          to={`/lista-productos/${producto.id}`}>
                          Editar
                        </Link>
                      </td>
                      <td>
                      <Link className="btn btn-outline-primary btn-sm"
                          to={`/productos`} onClick={(e) => onDelete}>
                          Delete Product
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
