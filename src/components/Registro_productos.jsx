import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { datosUsuario } from '../config/firebase.js'

export const Admin = () => {


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



  return (
    <div>
      <h1>Admin Component</h1>
    </div>
  )
}
