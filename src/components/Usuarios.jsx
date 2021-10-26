import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase, eliminarDocumentoDatabase, datosUsuario, usuario } from '../config/firebase'
import { Loading } from './Loading'
import { useHistory } from 'react-router'


export const Usuarios = () => {

  const history = useHistory()

  useEffect(() => {
    const credencialesUsuario = datosUsuario()

    if (credencialesUsuario) {
      console.log('Existe un usuario');
    } else {
      console.log('No Existe un usuario');
      history.push('/login')
    }


  }, history)

  const [listaUsuarios, setListaUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  const handleChange = e => {
    setBusqueda(e.target.value);
    buscar(e.target.value);
  }

  const buscar = async (termino) => {
    var resultado = await listaUsuarios.filter((elemento) => {
      if (elemento.nombre.toLowerCase().includes(termino.toLowerCase())
        || elemento.rol.toLowerCase().includes(termino.toLowerCase())) {
        return elemento;
      }
    });
    setListaUsuarios(resultado);
  }

  const cargarUsuarios = async () => {
    setLoading(true)
    const listaTemporal = await consultarDatabase('lista-Usuarios')
    // console.log(listaTemporal);
    setListaUsuarios(listaTemporal)
    setLoading(false)
  }

  const onDelete = async (idUsuario) => {
    if (window.confirm('¿Está seguro de eliminar el usuario?')) {
      await eliminarDocumentoDatabase('lista-Usuarios', idUsuario)
      cargarUsuarios()
    }
  }

  // cargarUsuarios()

  useEffect(() => {
    cargarUsuarios()
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
              Lista de Usuarios
              <Link to="/lista-Usuarios/create"
                className="btn btn-warning float-end"
              >Crear nuevo usuario</Link>
            </h3>
            <hr />
            <form className="d-flex">{<input class="form-control me-2" placeholder="Buscar"
              value={busqueda} onChange={handleChange} />}
              <button class="btn btn-outline-secondary" type="submit">Buscar</button>
            </form>
            <br />
            <table className="table table-hover align-middle text-center table-responsive">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaUsuarios &&
                  listaUsuarios.map((usuario, index) => (
                    <tr key={usuario.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.rol}</td>
                      <td>{usuario.estado}</td>
                      <td>
                        <Link className="btn btn-outline-primary btn-sm m-3"
                          to={`/lista-Usuarios/${usuario.id}`}>
                          Editar
                        </Link>
                        <Link className="btn btn-outline-danger btn-sm"
                          to={`/Usuarios`} onClick={() => onDelete(usuario.id)}>
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
