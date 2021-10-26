import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Ventas } from "./components/Ventas.jsx";
import { Venta } from "./components/Venta.jsx";
import { Login } from "./components/Login.js";
import { Navbar } from './components/Navbar';
import { auth } from "./config/firebase.js";
import { Loading } from './components/Loading';
import { Producto } from './components/Producto';
import { Productos } from './components/Productos';
import { Usuario } from './components/Usuario';
import { Usuarios } from './components/Usuarios';
import { Home } from './components/Home';
import { Admin } from './components/Admin'



function App() {


    const [firebaseUser, setFirebaseUser] = useState(false)

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {

            if (user) {
                const usuario = {
                    id: user.uid,
                    email: user.email
                }
                console.log(usuario);
                setFirebaseUser(usuario)
                console.log('usuario logueado');
            } else {
                console.log('El usuario ya no esta logueado');
                setFirebaseUser(null)
            }

        })


    }, [setFirebaseUser])


    return firebaseUser !== false ? (
        <Router>
            <Navbar usuario={firebaseUser} />
            <div className="container mt-3">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" component={Admin} />
                    <Route exact path="/lista-usuarios/:id" component={Usuario} />
                    <Route exact path="/usuarios" component={Usuarios} />
                    <Route exact path="/lista-productos/:id" component={Producto} />
                    <Route exact path="/productos" component={Productos} />
                    <Route exact path="/lista-ventas/:id" component={Venta} />
                    <Route exact path="/ventas" component={Ventas} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    )
        :
        <Router><div className="container mt-3">
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
            <Loading />
        </div>
        </Router>
}

export default App;
