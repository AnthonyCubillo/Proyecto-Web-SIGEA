import React, { useState, useContext, useEffect } from "react";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
//dependencias
import Swal from "sweetalert2";
//context
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentificacion/authContext";

function RecoveryPassword() {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //importar los valores del context de autentificacion
  const authContext = useContext(AuthContext);
  const { recuperarClave } = authContext;

  //en caso que el password o el usuario no existan
  useEffect(() => {
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
  }, [alerta]);

  //datos de inicio de sesion
  const [recuperar, setRecuperar] = useState({
    email_usuario: "",
  });

  //extrayendo datos
  const { email_usuario } = recuperar;

  const obtenerDatos = (e) => {
    setRecuperar({
      ...recuperar,
      [e.target.name]: e.target.value,
    });
  };

  
  const onSumitLogin = (e) => {
    e.preventDefault();

    //validacion
    if (!email_usuario.trim()) {
      mostrarAlerta("Debe ingresar el correo asociado a su cuenta!", "error");
      return;
    }

    //realizar consulta
    recuperarClave({ email_usuario }, mostrarAlerta);

    //reinicio de entradas
    setRecuperar({
      email_usuario: "",
    });
  };

  return (
    <div className="container">
      {/*  <!-- Outer Row --> */}
      <div className="row justify-content-center mt-5">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                {/* <!-- Imagen lateral izquierda login --> */}
                <div className="col-lg-6 d-none d-lg-block bg-image-form"></div>

                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <img
                        src="img/SIGEA-logo-1.png"
                        width="80px"
                        height="80px"
                        alt="logo sistema"
                        className="mb-2 animate__animated animate__flipInY"
                      />
                      <h1 className="h4 text-gray-900 mb-2">
                        ¿Olvidaste tu contraseña?
                      </h1>
                      <p className="mb-4 text-justify">
                        Ingrese su dirección de correo electrónico asociado a su
                        cuenta y le enviaremos un enlace para restablecer su
                        contraseña!
                      </p>
                    </div>
                    <form className="user" onSubmit={onSumitLogin}>
                      <div className="form-group position-relative">
                        <i className="far fa-envelope input-icon"></i>
                        <input
                          type="email"
                          className="form-control form-control-user pl-5"
                          id="email_usuario"
                          name="email_usuario"
                          aria-describedby="emailHelp"
                          placeholder="Ingrese su correo..."
                          onChange={obtenerDatos}
                          value={email_usuario}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-danger font-weight-bold btn-user btn-block"
                      >
                        Restablecer Contraseña
                      </button>
                    </form>
                    <hr />

                    <div className="text-center">
                      <Link to={"/"} className="small text-black-50">
                        ¿Ya tienes una cuenta? Acceder!
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

export default RecoveryPassword;
