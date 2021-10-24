import React from 'react'
import { Link } from 'react-router-dom'
import { logOutUsuario } from '../config/firebase.js'

export const Navbar = ({ usuario }) => {

  console.log(usuario);

  const handleLogOut = () => {
    logOutUsuario()
  }


  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand">
          <h2>Devschool</h2>
        </span>
        {!!usuario && <Link className="btn btn-primary" to="/usuarios" exact >Maestro usuarios</Link>}
        {!!usuario && <Link className="btn btn-secondary" to="/productos" >Lista de Cursos</Link>}
        {!!usuario && <Link className="btn btn-success" to="/ventas" >Registro Ventas</Link>}
        {!usuario && <Link className="btn btn-success" to="/admin" >Iniciar Session</Link>}
        {!!usuario && <Link
          className="btn btn-danger"
          to="/login"
          onClick={handleLogOut}
        >Cerrar Session</Link>}
      </div>

    </nav>
  )
}
