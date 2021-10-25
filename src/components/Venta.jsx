import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { actualizarDocumentoDatabase, consultarDocumentoDatabase, guardarDatabase } from '../config/firebase';
import { Loading } from './Loading'

export const Venta = () => {

  const { id } = useParams()
  console.log(id);

  const [curso, setCurso] = useState('')
  const [precio, setPrecio] = useState('')
  const [fecha, setFecha] = useState('')
  const [cliente, setCliente] = useState('')
  const [encargado, setEncargado] = useState('')
  const [estado, setEstado] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const consultarVenta = async (idVenta) => {
    setLoading(true)
    const VentaTemp = await consultarDocumentoDatabase('lista-Ventas', idVenta)
    console.log(VentaTemp);
    setCurso(VentaTemp.curso)
    setPrecio(VentaTemp.precio)
    setFecha(VentaTemp.fecha)
    setCliente(VentaTemp.cliente)
    setEncargado(VentaTemp.encargado)
    setEstado(VentaTemp.estado)
    setLoading(false)
  }

  useEffect(() => {
    if (id !== 'create') {
      consultarVenta(id)
    }

    setCurso('')
    setPrecio('')
    setFecha('')
    setCliente('')
    setEncargado('')
    setEstado('')


  }, [id])

  const handleActualizarVenta = async (e) => {
    e.preventDefault()

    const Venta = {
      curso,
      precio,
      fecha,
      cliente,
      encargado,
      estado
    }
    // console.log(Venta);

    await actualizarDocumentoDatabase('lista-Ventas', id, Venta)
    history.push('/ventas')
  }

  const handleGuardarVenta = async (e) => {
    e.preventDefault()

    const Venta = {
      curso,
      precio,
      fecha,
      cliente,
      encargado,
      estado
    }

    await guardarDatabase('lista-Ventas', Venta)
    history.push('/ventas')
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
              {id === 'create' ? 'Crear ' : 'Editar '}Venta
            </h3>
            <hr />
            <div className="mt-3">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Curso</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio ($)</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Precio"
                        value={precio}
                        onChange={(event) => setPrecio(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label me-3">Fecha venta</label>
                      <input type="date" id="start" name="trip-start"
                        value={fecha} min="2021-01-01" max="2021-12-31"
                        onChange={(event) => setFecha(event.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cliente</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Cliente"
                        value={cliente}
                        onChange={(event) => setCliente(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Encargado</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Encargado"
                        value={encargado}
                        onChange={(event) => setEncargado(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label me-3">Estado  </label>
                      <select name="select"
                        placeholder="Estado"
                        value={estado}
                        onChange={(event) => setEstado(event.target.value)}>
                        <option value=""></option>
                        <option value="En proceso">En proceso</option>
                        <option value="Entregada">Entregada</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </div>
                    <button
                      className="btn btn-primary mt-4"
                      onClick={id === 'create' ? handleGuardarVenta : handleActualizarVenta}
                    >
                      {id === 'create' ? 'Guardar' : 'Actualizar'} Venta
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
