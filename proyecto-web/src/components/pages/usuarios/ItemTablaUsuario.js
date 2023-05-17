import React, { useContext } from "react";
import Swal from "sweetalert2";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UsuariosContext from "../../../context/usuarios/usuarioContext";

const ItemTablaUsuario = ({ usuario, setMostrarEditar }) => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de usuarios
  const usuarioContext = useContext(UsuariosContext);
  const { eliminarUsuario, setUsuarioActual } = usuarioContext;

  const mostrarEditar = (usuario) => {
    //cambiar el estado para mostror modal
    setMostrarEditar();
    //setear el usuario elejido
    setUsuarioActual(usuario);
  };

  //funcion alerta eliminar un usuario
  const mostrarEliminarUsuario = (id_usuario) => {

    Swal.fire({
      title: `¿Está seguro que desea eliminar al usuario n.° ${id_usuario}?`,
      text: "¡Los usuarios eliminados no se pueden revertir!",
      icon: "warning",
      iconColor: "#E74C3C",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //aqui codigo de peticion al backend ....
        const resultado = eliminarUsuario(id_usuario, mostrarAlerta);

        //si la respuesta del backend true
        if (resultado) {
          Swal.fire({
            position: "center",
            title: `Usuario n° ${id_usuario} Eliminado!`,
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            position: "center",
            title: "Ocurrio un error!",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <>
      <tr>
        <td className="text-center">{usuario.id_usuario}</td>
        <td className="text-center">{usuario.dni_usuario}</td>
        <td className="text-center">{usuario.nombre_usuario}</td>
        <td className="text-center">{usuario.email_usuario}</td>

        <td className="text-center">
          <button
            className="btn btn-danger mx-2"
            onClick={() => mostrarEliminarUsuario(usuario.id_usuario)}
          >
            <i className="fas fa-trash"></i>
          </button>

          <button
            className="btn btn-warning mx-2"
            data-toggle="modal"
            data-target="#editUserModal"
            onClick={() => mostrarEditar(usuario)}
          >
            <i className="fas fa-edit"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default ItemTablaUsuario;
