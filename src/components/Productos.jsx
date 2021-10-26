import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase, eliminarDocumentoDatabase, datosUsuario } from '../config/firebase'
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
  const [busqueda, setBusqueda] = useState("")

  const handleChange = e => {
    setBusqueda(e.target.value);
    buscar(e.target.value);
  }

  const buscar = async (termino) => {
    var resultado = await listaProductos.filter((elemento) => {
      if (elemento.descripcion.toLowerCase().includes(termino.toLowerCase())
        || elemento.precioUnitario.toLowerCase().includes(termino.toLowerCase())) {
        return elemento;
      }
    });
    setListaProductos(resultado);
  }

  const cargarProductos = async () => {
    setLoading(true)
    const listaTemporal = await consultarDatabase('lista-productos')
    // console.log(listaTemporal);
    setListaProductos(listaTemporal)
    setLoading(false)
  }

  const onDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar el producto?')) {
      await eliminarDocumentoDatabase('lista-productos', id)
      cargarProductos()
    }
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
            <h3>
              Lista Productos
              <Link to="/lista-productos/create"
                className="btn btn-outline-success float-end"
              >Adicionar Producto</Link>
            </h3>
            <hr />
            <form className="d-flex">{<input class="form-control me-2" placeholder="Buscar"
              value={busqueda} onChange={handleChange} />}
              <button class="btn btn-outline-secondary" type="submit">Buscar</button>
            </form>
            <br />
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Precio Unitario ($)</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
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
                        <Link className="btn btn-outline-danger btn-sm m-3"
                          to={`/productos`} onClick={() => onDelete(producto.id)}>
                          Eliminar
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
