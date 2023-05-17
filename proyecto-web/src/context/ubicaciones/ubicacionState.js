import React, { useReducer } from "react";
import ubicacionContext from "./ubicacionContext";
import ubicacionReducer from "./ubicacionReducer";
import {
  REGISTRO_UBICACION,
  EDITAR_UBICACION,
  ELIMINAR_UBICACION,
  OBTENER_UBICACIONES,
  UBICACION_ACTUAL
} from "../../types/index";

import clienteAxios from "../../config/axios";

const UbicacionState = (props) => {
  const inicialState = {
    ubicaciones: [],
    ubicacionActual: null,
    cargando: true,
  };

  //Dispach para ejecutar las acciones
  const [state, dispatch] = useReducer(ubicacionReducer, inicialState);

  //obtener las ubicaciones
  const obtenerUbicaciones = async (mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.get(
        "/controller_ubicacion.php?consulta=1"
      );
      
      //console.log(resultado);

      if (resultado.data.ubicaciones) {

        dispatch({
          type: OBTENER_UBICACIONES,
          payload:resultado.data.ubicaciones
        });

      } else {
        mostrarAlerta("Error al listar ubicaciones!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  // agregar nueva ubicacion
  const registrarUbicacion = async (ubicacion, mostrarAlerta) => {
    try {
     
      const resultado = await clienteAxios.post(
        "/controller_ubicacion.php?consulta=2",
        ubicacion
      );
      //console.log(resultado);

      //inserta la ubicacion en el state
      if (resultado.data.success) {
        mostrarAlerta(resultado.data.mensaje, "success");

        dispatch({
          type: REGISTRO_UBICACION,
          payload: {id_ubicacion:resultado.data.id_ubicacion ,...ubicacion},
        });

      } else {
        mostrarAlerta("Ocurrio un error al registrar ubicacion", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //editar un ubicacion
  const editarUbicacion = async (ubicacion, mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.post(
        "/controller_ubicacion.php?consulta=3",
        ubicacion
      );
      //console.log(resultado);

      if (resultado.data.success) {
        mostrarAlerta(resultado.data.mensaje, "success");

        dispatch({
          type: EDITAR_UBICACION,
          payload: ubicacion,
        });
      } else {
        mostrarAlerta("Ocurrio un error al eliminar ubicacion", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //eliminar una ubicacion
  const eliminarUbicacion = async (id_ubicacion, mostrarAlerta) => {
    
    try {
      const resultado = await clienteAxios.post(
        "/controller_ubicacion.php?consulta=4",
        { id_ubicacion}
      );
      //console.log(resultado);

      if (resultado.data.success) {

        dispatch({
          type: ELIMINAR_UBICACION,
          payload: id_ubicacion,
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

  //selecciona la ubicacion que el usuario indica
  const setUbicacionActual = (ubicacion) => {
    dispatch({
      type: UBICACION_ACTUAL,
      payload: ubicacion,
    });
  };

  return (
    <ubicacionContext.Provider
      value={{
        ubicaciones: state.ubicaciones,
        ubicacionActual: state.ubicacionActual,
        obtenerUbicaciones,
        registrarUbicacion,
        editarUbicacion,
        eliminarUbicacion,
        setUbicacionActual
      }}
    >
      {props.children}
    </ubicacionContext.Provider>
  );
};

export default UbicacionState;
