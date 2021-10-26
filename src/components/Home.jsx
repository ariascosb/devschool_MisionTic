import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { datosUsuario } from '../config/firebase.js'

export const Home = () => {

  const history = useHistory()

  useEffect(() => {
    const credencialesUsuario = datosUsuario()

    if (credencialesUsuario) {
      console.log('Existe un usuario');
    } else {
      console.log('No Existe un usuario');
      history.push('/Home')
    }


  }, history)

  return (
    <div>
      <h1>Home</h1>
      <hr />
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Gratis</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/mes</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>10 users incluidos</li>
                <li>2 GB of almacenamiento</li>
                <li>Soporte por email</li>
                <li>Acceso al centro de ayuda</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-outline-primary">Suscipción gratis</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Pro</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$75.000<small className="text-muted fw-light">/mes</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>20 users incluidos</li>
                <li>10 GB de almacenamiento</li>
                <li>Soporte por email prioritario</li>
                <li>Acceso al centro de ayuda</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-primary">Seleccionar</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm border-primary">
            <div className="card-header py-3 text-white bg-primary border-primary">
              <h4 className="my-0 fw-normal">Empresarial</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$99.000<small className="text-muted fw-light">/mes</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Hasta 30 usuarios</li>
                <li>15 GB de almacenamiento</li>
                <li>Soporte por email y móvil</li>
                <li>Acceso al centro de ayuda</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-primary">Contactanos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
