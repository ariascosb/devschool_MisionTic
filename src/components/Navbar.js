import React from 'react'
import { Link } from 'react-router-dom'
import { logOutUsuario } from '../config/firebase.js'
import logo from './Logo.png'

export const Navbar = ({ usuario }) => {

  console.log(usuario);

  const handleLogOut = () => {
    logOutUsuario()
  }


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
          {!!usuario && <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-secondary bg-gradient" type="submit">Buscar</button>
          </form>}
          {!usuario && <Link className="btn btn-success" to="/admin" >Iniciar Sesion</Link>}
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
