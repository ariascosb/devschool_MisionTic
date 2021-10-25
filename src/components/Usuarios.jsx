import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase, eliminarDocumentoDatabase, datosUsuario, usuario } from '../config/firebase'
import { Loading } from './Loading'
import { useHistory } from 'react-router'


export const Usuarios = () => {

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

  const [listaUsuarios, setListaUsuarios] = useState([])
  const [loading, setLoading] = useState(false)

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
                className="btn btn-outline-success float-end"
              >Crear nuevo usuario</Link>
            </h3>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  listaUsuarios.map((usuario, index) => (
                    <tr key={usuario.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.rol}</td>
                      <td>{usuario.estado}</td>
                      <td>
                        <Link className="btn btn-outline-primary btn-sm"
                          to={`/lista-Usuarios/${usuario.id}`}>
                          Editar
                        </Link>
                      </td>
                      <td>
                        <Link className="btn btn-outline-primary btn-sm"
                          to={`/Usuarios`} onClick={() => onDelete(usuario.id)}>

                          Eliminar usuario

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
