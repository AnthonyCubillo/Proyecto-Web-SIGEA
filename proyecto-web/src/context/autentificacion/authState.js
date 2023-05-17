import React, { useReducer } from "react";

import {
  LOGIN,
  CERRAR_SESION,
  AUTH_USUARIO,
  CAMBIAR_CLAVE,
  ACTUALIZAR_USUARIO,
  RECUPERAR_CLAVE,
} from "../../types/index";

import authContext from "./authContext";
import authReducer from "./authReducer";

import clienteAxios from "../../config/axios";

const AuthState = (props) => {
  const initialState = {
    autenticado: null,
    usuario: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //funciones

  //logeo de usuario
  const iniciarSesion = async (datos, mostrarAlerta) => {
    try {
      const respuesta = await clienteAxios.post(
        "/controller_usuario.php?consulta=5",
        datos
      );
      //console.log(respuesta.data);

      if (respuesta.data.usuario) {
        //guardando variables en localStorage navegador
        localStorage.setItem("usuario", JSON.stringify(respuesta.data.usuario));
        localStorage.setItem("autenticado", true);

        dispatch({
          type: LOGIN,
          payload: respuesta.data.usuario,
        });
      } else {
        mostrarAlerta("Su contraseña o usuario es incorrecto!", "error");
      }
    } catch (error) {
      console.log(error);
      mostrarAlerta(error, "error");
    }
  };

  //cerrar la sesion del usuario
  const cerrarSesion = () => {
    //removiendo variables en localStorage navegador
    localStorage.removeItem("usuario");
    localStorage.removeItem("autenticado");

    dispatch({
      type: CERRAR_SESION,
    });
  };

  //retorna un usuario autenticado
  const usuarioAutenticado = async () => {
    //recuperando variables en localStorage navegador
    const autenticado = localStorage.getItem("autenticado");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    dispatch({
      type: AUTH_USUARIO,
      payload: { autenticado, usuario },
    });
  };

  //actualiza clave de usuario
  const cambiarClaveUsuario = async (datos, mostrarAlerta) => {
    //console.log(datos);

    try {
      const respuesta = await clienteAxios.post(
        "/controller_usuario.php?consulta=6",
        datos
      );
      //console.log(respuesta.data.mensaje);
      mostrarAlerta(respuesta.data.mensaje, "success");

      dispatch({
        type: CAMBIAR_CLAVE,
      });
    } catch (error) {
      console.log(error);
      mostrarAlerta(error, "error");
    }
  };

  //actualizar  usuario
  const actualizarUsuario = async (datos, mostrarAlerta) => {
    //console.log(datos);

    try {
      const respuesta = await clienteAxios.post(
        "/controller_usuario.php?consulta=3",
        datos
      );
      //console.log(respuesta.data.usuario);
      mostrarAlerta(respuesta.data.mensaje, "success");

      //guardando variables en localStorage navegador
      localStorage.setItem("usuario", JSON.stringify(respuesta.data.usuario));
      localStorage.setItem("autenticado", true);

      dispatch({
        type: ACTUALIZAR_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error);
      mostrarAlerta(error, "error");
    }
  };

  const recuperarClave = async (datos, mostrarAlerta) => {

    try {
      const respuesta = await clienteAxios.post(
        "/controller_usuario.php?consulta=7",
        datos
      );

      if (respuesta.data.success) {
        //si el correo esta registrado
        mostrarAlerta(respuesta.data.mensaje, "success");
        
      } else {
        //si el correo "NO" esta registrado
        mostrarAlerta(respuesta.data.mensaje, "error");
      }

      dispatch({
        type: RECUPERAR_CLAVE,
      });
    } catch (error) {
      console.log(error);
      mostrarAlerta(error, "error");
    }
  };

  return (
    <authContext.Provider
      value={{
        autenticado: state.autenticado,
        usuario: state.usuario,
        cargando: state.cargando,
        iniciarSesion,
        cerrarSesion,
        usuarioAutenticado,
        cambiarClaveUsuario,
        actualizarUsuario,
        recuperarClave,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
