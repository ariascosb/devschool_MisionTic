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
import { Loading } from './components/Loading.js';
import { Producto } from './components/Producto.jsx';
import { Productos } from './components/Productos.jsx';
import { Usuario } from './components/Usuario.jsx';
import { Usuarios } from './components/Usuarios.jsx';
import { Home } from './components/Home.jsx';
import { Admin } from './components/Admin.jsx'



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
                    <Route path="/lista-usuarios/:id" component={Usuario} />
                    <Route path="/usuarios" component={Usuarios} />
                    <Route path="/lista-productos/:id" component={Producto} />
                    <Route path="/productos" component={Productos} />
                    <Route path="/lista-ventas/:id" component={Venta} />
                    <Route path="/ventas" component={Ventas} />
                    <Route path="/home" component={Home} />
                    <Route exact path="/" component={Home} />
                    {/* <Route exact path="/" render={() => { return (!firebaseUser ? <Redirect to="/login" /> : <Redirect to="/Home" />) }} /> */}
                    <Route path="*" component={Login} />
                </Switch>
            </div>
        </Router>
    )
        :
        <Loading />


}

export default App;
