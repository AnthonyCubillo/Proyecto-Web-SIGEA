import React, { useReducer } from "react";
import usuarioContext from "./usuarioContext";
import usuarioReducer from "./usuarioReducer";
import {
  REGISTRO_USUARIO,
  EDITAR_USUARIO,
  ELIMINAR_USUARIO,
  OBTENER_USUARIOS,
  USUARIO_ACTUAL,
} from "../../types/index";

import clienteAxios from "../../config/axios";

const UsuarioState = (props) => {
  const inicialState = {
    usuarios: [],
    usuarioActual: null,
    cargando: true,
  };

  //Dispach para ejecutar las acciones
  const [state, dispatch] = useReducer(usuarioReducer, inicialState);

  //obtener los usuarios
  const obtenerUsuarios = async (usuario, mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.get(
        "/controller_usuario.php?consulta=1"
      );
      //console.log(resultado);


      if (resultado.data.usuarios && usuario) {

        const usuarios = resultado.data.usuarios.filter( 
          (item) => item.id_usuario !== usuario.id_usuario
        );

        dispatch({
          type: OBTENER_USUARIOS,
          payload:usuarios
        });
      } else {
        mostrarAlerta("Error al listar usuarios!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  // agregar nuevo proyecto
  const registrarUsuario = async (usuario, mostrarAlerta) => {
    try {
     
      const resultado = await clienteAxios.post(
        "/controller_usuario.php?consulta=2",
        usuario
      );
      //console.log(resultado);

      //inserta el usuario en el state
      if (resultado.data.success) {
        mostrarAlerta(resultado.data.mensaje, "success");

        dispatch({
          type: REGISTRO_USUARIO,
          payload: {id_usuario:resultado.data.id_usuario ,...usuario},
        });

      } else {
        mostrarAlerta("Ocurrio un error al registrar usuario", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //editar un usuario
  const editarUsuario = async (usuario, mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.post(
        "/controller_usuario.php?consulta=3",
        usuario
      );
      //console.log(resultado);

      if (resultado.data.success) {
        mostrarAlerta(resultado.data.mensaje, "success");

        dispatch({
          type: EDITAR_USUARIO,
          payload: usuario,
        });
      } else {
        mostrarAlerta("Ocurrio un error al eliminar usuario", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //eliminar un usuario
  const eliminarUsuario = async (id_usuario, mostrarAlerta) => {
    
    try {
      const resultado = await clienteAxios.post(
        "/controller_usuario.php?consulta=4",
        { id_usuario}
      );
      console.log(resultado);

      if (resultado.data.success) {

        dispatch({
          type: ELIMINAR_USUARIO,
          payload: id_usuario,
        });

        return true;
      } else {

        return false;
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //selecciona el proyecto que el usuario indica
  const setUsuarioActual = (usuario) => {
    dispatch({
      type: USUARIO_ACTUAL,
      payload: usuario,
    });
  };

  return (
    <usuarioContext.Provider
      value={{
        usuarios: state.usuarios,
        usuarioActual: state.usuarioActual,
        obtenerUsuarios,
        registrarUsuario,
        editarUsuario,
        eliminarUsuario,
        setUsuarioActual
      }}
    >
      {props.children}
    </usuarioContext.Provider>
  );
};

export default UsuarioState;
