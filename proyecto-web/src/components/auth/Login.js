import React, { useState, useContext, useEffect } from "react";
import Footer from "../layout/Footer";
import { Link, useNavigate } from "react-router-dom";
//dependencias
import Swal from "sweetalert2";
//context
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentificacion/authContext";
import ConfigDesingContext from "../../context/configDesing/configDesingContext";

function Login() {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //importar los valores del context de autentificacion
  const authContext = useContext(AuthContext);
  const { autenticado, iniciarSesion, usuario } = authContext;

  //recuperar datos de configuracion
  const configDesingContext = useContext(ConfigDesingContext);
  const { getConfigDesingUsuario } = configDesingContext;

  //redireccionar
  const navigate = useNavigate();

  //en caso que el password o el usuario no existan
  useEffect(() => {
    if (autenticado) {
      navigate("/inicio");
    }

    if (alerta) {
      Swal.fire({
        position: "center",
        icon: alerta.categoria,
        title: alerta.mensaje,
        showConfirmButton: false,
        timer: 1000,
      });
    }

    // eslint-disable-next-line
  }, [autenticado, alerta]);

  //datos de inicio de sesion
  const [login, setLogin] = useState({
    dni_usuario: "",
    clave_usuario: "",
  });

  //extrayendo datos
  const { dni_usuario, clave_usuario } = login;

  const obtenerDatos = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const onSumitLogin = (e) => {
    e.preventDefault();

    //validacion
    if (!dni_usuario.trim()) {
      mostrarAlerta("Debe ingresar un usuario", "error");
      return;
    }

    if (!clave_usuario.trim()) {
      mostrarAlerta("Debe ingresar una contraseña", "error");
      return;
    }

    //cargar datos a action
    iniciarSesion({ dni_usuario, clave_usuario }, mostrarAlerta);
    //reinicio de entradas
    setLogin({
      ...login,
      clave_usuario: "",
    });
  };

  useEffect(() => {
    //cargar configuracion
    if (autenticado && usuario) {
      getConfigDesingUsuario(usuario.id_usuario, mostrarAlerta);
    }
    // eslint-disable-next-line 
  }, [dni_usuario, autenticado, usuario]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                {/* <!-- Imagen lateral izquierda login --> */}
                <div className="col-lg-6 d-none d-lg-block bg-image-form"></div>

                {/* <!-- Form login --> */}
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <img
                        src="img/SIGEA-logo-1.png"
                        width="80px"
                        height="80px"
                        alt="logo sistema"
                        className="mb-2 animate_animated animate_flipInY"
                      />
                      <h1 className="h2 text-gray-900 mb-4">
                        Ingresar a &#160;
                        <span className="text-danger font-weight-bold">
                          SIGEA
                        </span>
                      </h1>
                    </div>

                    <form className="user" onSubmit={onSumitLogin}>
                      <div className="form-group position-relative">
                        <i className="fas fa-user input-icon"></i>

                        <input
                          type="text"
                          className="form-control form-control-user pl-5"
                          id="dni_usuario"
                          name="dni_usuario"
                          value={dni_usuario}
                          onChange={obtenerDatos}
                          placeholder="Nombre de usuario"
                        />
                      </div>

                      <div className="form-group position-relative">
                        <i className="fas fa-key input-icon"></i>

                        <input
                          type="password"
                          className="form-control form-control-user pl-5"
                          id="clave_usuario"
                          name="clave_usuario"
                          onChange={obtenerDatos}
                          value={clave_usuario}
                          placeholder="Contraseña"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-danger btn-user font-weight-bold btn-block"
                      >
                        Acceder
                      </button>
                    </form>
                    <hr />

                    <div className="text-center">
                      <Link
                        to={"/recovery-password"}
                        className="small text-black-50"
                      >
                        ¿Olvidó su nombre de usuario o contraseña?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <Footer styleFooter="footer" />
      </div>
    </div>
  );
}

export default Login;