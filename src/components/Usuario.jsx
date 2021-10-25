import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { actualizarDocumentoDatabase, consultarDocumentoDatabase, guardarDatabase } from '../config/firebase';
import { Loading } from './Loading'

export const Usuario = () => {

  const { id } = useParams()
  console.log(id);

  const [nombre, setNombre] = useState('')
  const [rol, setRol] = useState('')
  const [estado, setEstado] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const consultarUsuario = async (idUsuario) => {
    setLoading(true)
    const UsuarioTemp = await consultarDocumentoDatabase('lista-Usuarios', idUsuario)
    console.log(UsuarioTemp);
    setNombre(UsuarioTemp.nombre)
    setRol(UsuarioTemp.rol)
    setEstado(UsuarioTemp.estado)
    setLoading(false)
  }

  useEffect(() => {
    if (id !== 'create') {
      consultarUsuario(id)
    }

    setNombre('')
    setRol('')
    setEstado('')


  }, [id])

  const handleActualizarUsuario = async (e) => {
    e.preventDefault()

    const Usuario = {
      nombre,
      rol,
      estado
    }
    // console.log(Usuario);

    await actualizarDocumentoDatabase('lista-Usuarios', id, Usuario)
    history.push('/usuarios')
  }

  const handleGuardarUsuario = async (e) => {
    e.preventDefault()

    const Usuario = {
      nombre,
      rol,
      estado
    }

    await guardarDatabase('lista-Usuarios', Usuario)
    history.push('/usuarios')
  }


  return (
    <div>
      {
        loading
          ?
          <Loading />
          :
          <>
            <h3>
              {id === 'create' ? 'Crear ' : 'Editar '}Usuario
            </h3>
            <hr />
            <div className="mt-3">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nombre"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label me-3">Rol </label>
                      <select name="select" placeholder="Rol"
                        value={rol}
                        onChange={(event) => setRol(event.target.value)}>
                        <option value=""></option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Administrador">Administrador</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label me-3">Estado  </label>
                      <select name="select" placeholder="Estado"
                        value={estado}
                        onChange={(event) => setEstado(event.target.value)}>
                        <option value=""></option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Autorizado">Autorizado</option>
                        <option value="No Autorizado">No Autorizado</option>
                      </select>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={id === 'create' ? handleGuardarUsuario : handleActualizarUsuario}
                    >
                      {id === 'create' ? 'Guardar' : 'Actualizar'} Usuario
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
      }

    </div>
  )
}
