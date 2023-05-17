import React, { useState, useEffect, useContext } from "react";
import Layout from "../layout/Layout";
//context
import AuthContext from "../../context/autentificacion/authContext";
import AlertaContext from "../../context/alertas/alertaContext";
//dependencias
import Swal from "sweetalert2";

function Perfil() {
  //importar los valores del context de usuarios
  const authContext = useContext(AuthContext);
  const { usuario, cambiarClaveUsuario, actualizarUsuario } = authContext;

  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [cambiarClave, setCambiarClave] = useState(false);
  const [cambiarClaveAnimate, setCambiarClaveAnimate] = useState("");

  const [editarUsuario, setEditarUsuario] = useState({
    id_usuario: "",
    dni_usuario: "",
    nombre_usuario: "",
    email_usuario: "",
    clave_usuario: "",
    clave_usuario_cofirmar: "",
  });

  useEffect(() => {
    if (usuario) {
      setEditarUsuario({
        ...usuario,
        clave_usuario: "",
        clave_usuario_cofirmar: "",
      });
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
  }, [usuario, alerta]);

  const obtenerDatos = (e) => {
    setEditarUsuario({
      ...editarUsuario,
      [e.target.name]: e.target.value,
    });
  };

  //extrayendo datos
  const {
    id_usuario,
    dni_usuario,
    nombre_usuario,
    email_usuario,
    clave_usuario,
    clave_usuario_cofirmar,
  } = editarUsuario;

  const enviarFormulario = (e) => {
    e.preventDefault();

    //validacion
    if (!nombre_usuario.trim()) {
      mostrarAlerta("Debe ingresar un nombre", "error");
      return;
    }
    if (!email_usuario.trim()) {
      mostrarAlerta("Debe ingresar un email", "error");
      return;
    }

    if (cambiarClave) {
      if (!clave_usuario) {
        mostrarAlerta("Debe ingresar una contraseña", "error");
        return;
      }
      if (clave_usuario.length < 8) {
        mostrarAlerta(
          "La contraseña debe contener al menos 8 caracteres",
          "error"
        );
        return;
      }
      if (!clave_usuario_cofirmar) {
        mostrarAlerta("Debe confirmar la contraseña", "error");
        return;
      }

      if (clave_usuario !== clave_usuario_cofirmar) {
        mostrarAlerta("Las contraseñas no coinciden", "error");
        return;
      }
      //actualizar contraseña usuario, 2 parametros
      cambiarClaveUsuario({ id_usuario, clave_usuario }, mostrarAlerta);
    } else {
      //actualizar datos usuario, 4 parametros
      actualizarUsuario(
        { id_usuario, dni_usuario, nombre_usuario, email_usuario },
        mostrarAlerta
      );
    }

    //reinicio de entradas
    setEditarUsuario({
      ...editarUsuario,
      clave_usuario: "",
      clave_usuario_cofirmar: "",
    });
    setCambiarClave(false);
  };

  const cambiarPassword = () => {
    if (!cambiarClave) {
      setCambiarClave(true);
      setCambiarClaveAnimate("animate__fadeInDown");
    } else {
      setCambiarClaveAnimate("animate__fadeOutUp");
      setTimeout(() => {
        setCambiarClave(false);
      }, 700);
    }
  };

  return (
    <>
      <Layout pageName={"Perfil"}>
        {/* <!-- Formilario perfil --> */}
        <div className="row justify-content-center my-5 ">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 rounded-lg shadow-lg">
            <h2 className="text-center mt-3">Datos de Usuario</h2>
            <form
              className="user pt-3  pb-5 px-3 rounded-lg"
              onSubmit={enviarFormulario}
            >
              <div className="form-group position-relative">
                <i className="fas fa-id-card input-icon"></i>
                <input
                  type="text"
                  className="form-control form-control-user pl-5"
                  name="dni_usuario"
                  id="dni_usuario"
                  readOnly
                  placeholder="Número de identificación"
                  value={dni_usuario}
                />
              </div>

              <div className="form-group position-relative">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  className="form-control form-control-user pl-5"
                  name="nombre_usuario"
                  id="nombre_usuario"
                  onChange={obtenerDatos}
                  placeholder="Nombre de usuario"
                  value={nombre_usuario}
                />
              </div>

              <div className="form-group position-relative">
                <i className="far fa-envelope input-icon"></i>
                <input
                  type="email"
                  className="form-control form-control-user pl-5"
                  name="email_usuario"
                  id="email_usuario"
                  onChange={obtenerDatos}
                  placeholder="Ingrese su correo..."
                  value={email_usuario}
                />
              </div>

              <div className="form-group text-center">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={cambiarPassword}
                >
                  Cambiar Contraseña
                </button>
              </div>

              {cambiarClave && (
                <>
                  <div
                    className={`form-group position-relative animate__animated ${cambiarClaveAnimate}`}
                  >
                    <i className="fas fa-key input-icon"></i>
                    <input
                      type="password"
                      className="form-control form-control-user pl-5"
                      name="clave_usuario"
                      id="clave_usuario"
                      onChange={obtenerDatos}
                      placeholder="Nueva Contraseña"
                      value={clave_usuario}
                    />
                  </div>

                  <div
                    className={`form-group position-relative animate__animated ${cambiarClaveAnimate}`}
                  >
                    <i className="fas fa-redo-alt input-icon"></i>
                    <input
                      type="password"
                      className="form-control form-control-user pl-5"
                      name="clave_usuario_cofirmar"
                      id="clave_usuario_cofirmar"
                      onChange={obtenerDatos}
                      placeholder="Confirmar Contraseña"
                      value={clave_usuario_cofirmar}
                    />
                  </div>
                </>
              )}

              <div className="row align-items-center justify-content-center mt-4">
                <button
                  type="submit"
                  className="btn btn-success w-50 btn-user font-weight-bold btn-block"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Perfil;
