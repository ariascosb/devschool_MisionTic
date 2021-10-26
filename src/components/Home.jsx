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
    </div>
  )
}
