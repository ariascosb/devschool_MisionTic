import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logOutUsuario } from '../config/firebase.js'
import logo from './Logo.png'
import { useHistory } from 'react-router'

export const Navbar = ({ usuario }) => {

  console.log(usuario);

  const handleLogOut = () => {
    logOutUsuario()
  }

  const [busqueda, setBusqueda] = useState("")
  const history = useHistory()

  return (
    <>
      <nav className="navbar navbar-dark bg-warning bg-gradient navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand">
            <Link to="/">
              <img src={logo} alt="logo" width="200" href="/Home" />
            </Link>
          </span>
          <div class="d-grid gap-2 d-md-block d-md-flex">
            {!!usuario && <Link className="btn btn-primary bg-gradient" data-bs-toggle="button" to="/usuarios" exact >Maestro usuarios</Link>}
            {!!usuario && <Link className="btn btn-primary bg-gradient" data-bs-toggle="button" to="/productos" exact >Lista de Cursos</Link>}
            {!!usuario && <Link className="btn btn-primary bg-gradient" data-bs-toggle="button" to="/ventas" exact >Registro de Ventas</Link>}
            <div class="vr"></div>
            {!usuario && <Link className="btn btn-primary" to="/login" exact >Iniciar Sesion</Link>}
            {!!usuario && <Link
              className="btn btn-danger bg-gradient"
              to="/Home" exact
              onClick={handleLogOut}
            >Cerrar Sesion</Link>}
          </div>
        </div>
      </nav>
    </>
  )
}
