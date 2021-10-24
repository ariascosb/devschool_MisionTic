import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { actualizarDocumentoDatabase, consultarDocumentoDatabase, guardarDatabase } from '../config/firebase';
import { Loading } from './Loading'

export const Producto = () => {

  const { id } = useParams()
  console.log(id);

  const [descripcion, setDescripcion] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [precioUnitario, setPrecioUnitario] = useState('')
  const [estado, setEstado] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const consultarProducto = async (idProducto) => {
    setLoading(true)
    const productoTemp = await consultarDocumentoDatabase('lista-productos', idProducto)
    console.log(productoTemp);
    setDescripcion(productoTemp.descripcion)
    setCantidad(productoTemp.cantidad)
    setPrecioUnitario(productoTemp.precioUnitario)
    setEstado(productoTemp.estado)
    setLoading(false)
  }

  useEffect(() => {
    if (id !== 'create') {
      consultarProducto(id)
    }

    setDescripcion('')
    setCantidad('')
    setPrecioUnitario('')
    setEstado('')


  }, [id])

  const handleActualizarProducto = async (e) => {
    e.preventDefault()

    const producto = {
      descripcion,
      cantidad,
      precioUnitario,
      estado
    }
    // console.log(producto);

    await actualizarDocumentoDatabase('lista-productos', id, producto)
    history.push('/productos')


  }

  const handleGuardarProducto = async (e) => {
    e.preventDefault()

    const producto = {
      descripcion,
      cantidad,
      precioUnitario,
      estado
    }

    await guardarDatabase('lista-productos', producto)
    history.push('/productos')
  }


  return (
    <div>
      {
        loading
          ?
          <Loading />
          :
          <>
            <h1>
              {id === 'create' ? 'Crear ' : 'Editar '}Producto
            </h1>
            <hr />
            <div className="mt-3">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Descripcion</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Descripcion"
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cantidad</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={(event) => setCantidad(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio Unitario ($)</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Precio Unitario"
                        value={precioUnitario}
                        onChange={(event) => setPrecioUnitario(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Estado  </label>
                      <select name="select"
                       placeholder="Estado"
                        value={estado} 
                        onChange={(event) => setEstado(event.target.value)}>
                       <option value="No disponible">No disponible</option>
                        <option value="Disponible">Disponible</option>
                       </select>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={id === 'create' ? handleGuardarProducto : handleActualizarProducto}
                    >
                      {id === 'create' ? 'Guardar' : 'Actualizar'} Producto
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
