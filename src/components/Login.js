import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { loginUsuario } from '../config/firebase.js'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Estados Error
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)

  // Redireccion programatica
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e);

    let mensajeError = '';

    // Validaciones input
    if (!email.trim()) {
      console.error('Ingresa un email')
      setErrorEmail('Ingresa un email')
      return
    }

    if (!password.trim()) {
      console.error('Ingresa un password')
      setErrorPassword('Ingresa un password')
      return
    }

    // Validaciones Firebase
    if (password.length < 6) {
      console.error('Ingresa un password mayor a 6 caracteres')
      setErrorPassword('Ingresa un password mayor a 6 caracteres')
      return
    }

    try {
      const user = await loginUsuario(email, password)
      console.log(user);
    } catch (error) {
      // console.log(error);
      mensajeError = error.message
      console.log(mensajeError);
    }

    if (mensajeError.includes('auth/user-not-found')) {
      console.error('Email no corresponde')
      setErrorEmail('Email no corresponde')
      return
    }

    if (mensajeError.includes('auth/invalid-email')) {
      console.error('Email invalido')
      setErrorEmail('Email no corresponde')
      return
    }

    if (mensajeError.includes('auth/wrong-password')) {
      console.error('Password Incorrecto')
      setErrorPassword('Password Incorrecto')
      return
    }

    setEmail('')
    setPassword('')
    setErrorEmail(null)
    setErrorPassword(null)

    history.push('/')

  }

  // google login
  const provider = new GoogleAuthProvider();
  function signInWithGooglePopUp() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        history.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          `Errors during sign in: " ${errorCode}, ${errorMessage}, ${email}, ${credential}`
        );
      });
  }


  return (
    <div>
      <h3 className="text-center text-decoration-underline p-4">Acceso Usuarios</h3>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Ingresa tu email"
              className={`form-control mb-2 ` + (errorEmail ? 'is-invalid' : '')}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            {
              errorEmail ?
                (
                  <div className="invalid-feedback mb-2">
                    {errorEmail}
                  </div>
                )
                : null
            }

            <input
              type="password"
              placeholder="Ingresa tu password"
              className={`form-control mb-2 ` + (errorPassword ? 'is-invalid' : '')}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {
              errorPassword ?
                (
                  <div className="invalid-feedback mb-2">
                    {errorPassword}
                  </div>
                )
                : null
            }

            <div className="d-grid gap-2">
              <button
                className="btn btn-outline-primary mb-1">Ingresar</button>
              <button
                className="btn btn-primary mb-3"
                onClick={signInWithGooglePopUp}>Ingresar con google</button>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="dropdownCheck2" />
                <label className="form-check-label" for="dropdownCheck">
                  Remember me
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
