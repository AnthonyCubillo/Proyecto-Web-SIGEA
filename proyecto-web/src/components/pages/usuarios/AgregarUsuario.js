import React, { useState, useContext, useEffect } from "react";
//dependencias
import Swal from "sweetalert2";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UsuariosContext from "../../../context/usuarios/usuarioContext";

const AgregarUsuario = ({ setMostrarAgregar }) => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //importar los valores del context de usuario
  const usuarioContext = useContext(UsuariosContext);
  const { registrarUsuario } = usuarioContext;

  //state para el usuario nuevo
  const [usuarioInput, setUsuarioInput] = useState({
    dni_usuario: "",
    nombre_usuario: "",
    email_usuario: "",
    clave_usuario: "",
  });

  const obtenerDatos = (e) => {
    setUsuarioInput({
      ...usuarioInput,
      [e.target.name]: e.target.value,
    });
  };

  //extrayendo datos
  const { dni_usuario, nombre_usuario, email_usuario } = usuarioInput;

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
  }, [alerta]);

  //funcion para el onSubmit form
  const registrarUsuarioOnSubmit = (e) => {
    e.preventDefault();

    //validacion
    if (!dni_usuario.trim()) {
      mostrarAlerta("Debe ingresar el numero de identificación", "error");
      return;
    }

    if (!nombre_usuario.trim()) {
      mostrarAlerta("Debe ingresar un nombre", "error");
      return;
    }
    if (!email_usuario.trim()) {
      mostrarAlerta("Debe ingresar un email", "error");
      return;
    }

    //enviar a consulta bd
    registrarUsuario(
      { ...usuarioInput, clave_usuario: dni_usuario },
      mostrarAlerta
    );

    //cerrar el modal luego de insertar
    setTimeout(() => {
      document.getElementById("cerrarModalNuevoUsuario").click();
    }, 1000);

    //limipiar inputs
    setUsuarioInput({
      dni_usuario: "",
      nombre_usuario: "",
      email_usuario: "",
      clave_usuario: "",
    });
  };

  return (
    <>
      {/*  <!-- registrar usuario Modal --> */}
      <div
        className="modal fade"
        id="newUserModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel1"
        aria-hidden="true"
      >
        {" "}
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-gradient-success">
              <h5 className="modal-title text-white" id="ModalLabel1">
                Registra Nuevo Usuario
              </h5>
              <button
                id="cerrarModalNuevoUsuario"
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={setMostrarAgregar}
              >
                <span aria-hidden="true" className="text-white">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form className="user" onSubmit={registrarUsuarioOnSubmit}>
                <div className="form-group position-relative">
                  <i className="fas fa-id-card input-icon"></i>
                  <input
                    type="text"
                    className="form-control form-control-user pl-5"
                    name="dni_usuario"
                    id="dni_usuario"
                    placeholder="Número de identificación"
                    onChange={obtenerDatos}
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
                    placeholder="Nombre de usuario"
                    onChange={obtenerDatos}
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
                    placeholder="Ingrese su correo..."
                    onChange={obtenerDatos}
                    value={email_usuario}
                  />
                </div>

                <div className="form-group position-relative">
                  <i className="fas fa-key input-icon"></i>
                  <input
                    type="password"
                    className="form-control form-control-user pl-5"
                    name="clave_usuario"
                    id="clave_usuario"
                    placeholder="Contraseña"
                    readOnly
                    data-toggle="tooltip"
                    data-placement="top"
                    title="La contraseña temporal es el número de identificación"
                    value={dni_usuario}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-user font-weight-bold btn-block"
                >
                  Registrar
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                type="button"
                data-dismiss="modal"
                onClick={setMostrarAgregar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgregarUsuario;
