import React, { useReducer } from "react";
import configDesingContext from "./configDesingContext";
import configDesingReducer from "./configDesingReducer";
import {
  UPDATE_FONT_FAMILY,
  UPDATE_FONT_SIZE,
  UPDATE_COLORS,
  OBTENER_CONFIG_USUARIO,
} from "../../types/index";

import clienteAxios from "../../config/axios";

const ConfigDesingState = (props) => {
  const inicialState = {
    id: 0,
    colors: "#F8F9F9",
    fontFamily: "Yantramanav",
    fontSize: "16px",
    updateConfig: false,
  };

  //Dispach para ejecutar las acciones
  const [state, dispatch] = useReducer(configDesingReducer, inicialState);

  //booleano de actualizacion de configuracion
  const updateConfig = () => {
    state.updateConfig = true;
    setTimeout(() => {
      state.updateConfig = false;
    }, 1000);
  };

  //actualizar tipo de fuente
  const updateFontFamily = async (fontFamily, mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.post(
        "/controller_configuracion.php?consulta=2",
        {
          id_configuracion: state.id,
          color: state.colors,
          font_family: fontFamily,
          font_size: state.fontSize,
        }
      );

      if (resultado.data.success) {
        dispatch({
          type: UPDATE_FONT_FAMILY,
          payload: fontFamily,
        });

        updateConfig();
      } else {
        mostrarAlerta("Error al modificar el tipo de fuente!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //actualizar tamaño de fuente
  const updateFontSize = async (fontSize, mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.post(
        "/controller_configuracion.php?consulta=2",
        {
          id_configuracion: state.id,
          color: state.colors,
          font_family: state.fontFamily,
          font_size: fontSize,
        }
      );

      if (resultado.data.success) {
        dispatch({
          type: UPDATE_FONT_SIZE,
          payload: fontSize,
        });

        updateConfig();
      } else {
        mostrarAlerta("Error al modificar el tamaño de fuente!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //actualizar color
  const updateColors = async (colors, mostrarAlerta) => {
    //console.log(colors);
    try {
      const resultado = await clienteAxios.post(
        "/controller_configuracion.php?consulta=2",
        {
          id_configuracion: state.id,
          color: colors,
          font_family: state.fontFamily,
          font_size: state.fontSize,
        }
      );
     // console.log(resultado.data);

      if (resultado.data.success) {
        dispatch({
          type: UPDATE_COLORS,
          payload: colors,
        });

        updateConfig();
      } else {
        mostrarAlerta("Error al modificar color de interfaz!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //obtener config de usuario
  const getConfigDesingUsuario = async (id_usuario, mostrarAlerta) => {

    //console.log(id_usuario);
    try {
      const resultado = await clienteAxios.post(
        "/controller_configuracion.php?consulta=1",
        { id_usuario }
      );

      //console.log(resultado.data.config);

      if (resultado.data.success) {
        dispatch({
          type: OBTENER_CONFIG_USUARIO,
          payload: resultado.data.config,
        });
      } else {
        mostrarAlerta("Error al obtener configuración de usuario!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  return (
    <configDesingContext.Provider
      value={{
        colors: state.colors,
        fontFamily: state.fontFamily,
        fontSize: state.fontSize,
        updateConfig: state.updateConfig,
        updateFontFamily,
        updateFontSize,
        updateColors,
        getConfigDesingUsuario,
      }}
    >
      {props.children}
    </configDesingContext.Provider>
  );
};

export default ConfigDesingState;