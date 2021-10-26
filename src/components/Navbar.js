import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logOutUsuario } from '../config/firebase.js'
import logo from './Logo.png'
import { useHistory } from 'react-router'
import { Usuarios } from './Usuarios'

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
            <img src={logo} alt="logo" width="200" />
          </span>
          {!!usuario && <Link className="btn btn-primary bg-gradient" to="/usuarios" exact >Maestro usuarios</Link>}
          {!!usuario && <Link className="btn btn-primary bg-gradient" to="/productos" >Lista de Cursos</Link>}
          {!!usuario && <Link className="btn btn-primary bg-gradient" to="/ventas" >Registro de Ventas</Link>}
          {!usuario && <Link className="btn btn-primary" to="/admin" >Iniciar Sesion</Link>}
          {!!usuario && <Link
            className="btn btn-danger bg-gradient"
            to="/login"
            onClick={handleLogOut}
          >Cerrar Sesion</Link>}
        </div>
      </nav>
    </>
  )
}
