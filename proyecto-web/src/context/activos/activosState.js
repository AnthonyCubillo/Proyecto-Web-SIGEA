import React, { useReducer } from "react";
import activosContext from "./activosContext";
import activosReducer from "./activosReducer";
import {
  REGISTRO_ACTIVO,
  EDITAR_ACTIVO,
  OBTENER_ACTIVOS,
  ELIMINAR_ACTIVO,
  ACTIVO_ACTUAL,
  CARGANDO_ACTIVOS,
} from "../../types/index";

import clienteAxios from "../../config/axios";

const ActivosState = (props) => {
  const inicialState = {
    activos: [],
    activosActual: {},
    cargando: false,
  };

  //Dispach para ejecutar las acciones
  const [state, dispatch] = useReducer(activosReducer, inicialState);

  //obtener los activos
  const obtenerActivos = async (mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.get(
        "/controller_activo.php?consulta=1"
      );

      //console.log(resultado);
      if (resultado.data.activos) {

        dispatch({
          type: OBTENER_ACTIVOS,
          payload: resultado.data.activos
        });

      } else {
        mostrarAlerta("Error al listar activos!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  const setCargando = () => {
    dispatch({
      type: CARGANDO_ACTIVOS,
      payload: true,
    });

    setTimeout(() => {
      dispatch({
        type: CARGANDO_ACTIVOS,
        payload: false,
      });
    }, 300);
  }

  // agregar nuevos activos
  const registrarActivo = async (lista_activos, mostrarAlerta) => {
    try {

      const resultado = await clienteAxios.post(
        "/controller_activo.php?consulta=2",
        lista_activos
      );

      //inserta la lista_activos en el state
      if (resultado.data.success) {
        mostrarAlerta(resultado.data.mensaje, "success");

        dispatch({
          type: REGISTRO_ACTIVO
        });

      } else {
        mostrarAlerta("Ocurrio un error al importar activos", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  //editar un activo
  const editarActivo = async (lista_activos, mostrarAlerta) => {
    try {
      const resultado = await clienteAxios.post(
        "/controller_activo.php?consulta=3",
        lista_activos
      );
      //console.log(resultado);

      if (resultado.data.success) {
        mostrarAlerta(resultado.data.mensaje, "success");

        dispatch({
          type: EDITAR_ACTIVO,
          payload: lista_activos,
        });
      } else {
        mostrarAlerta("Ocurrio un error al editar el activo", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };




  //eliminar un activo
  const eliminarActivo = async (id_activo, mostrarAlerta) => {

    try {
      const resultado = await clienteAxios.post(
        "/controller_activo.php?consulta=4",
        { id_activo }
      );
      //console.log(resultado);

      if (resultado.data.success) {

        dispatch({
          type: ELIMINAR_ACTIVO,
          payload: id_activo,
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

  //selecciona el activo que el usuario indica
  const setActivoActual = (activo) => {
    dispatch({
      type: ACTIVO_ACTUAL,
      payload: activo,
    });
  };


  //editar la ubicacion de un activo
  const editarUbicacionActivo = async (id_Ubicacion, mostrarAlerta) => {
    const activoSeleccionado = { ...state.activoActual, id_ubicacion: parseInt(id_Ubicacion) };
    try {
      const resultado = await clienteAxios.post(
        "/controller_activo.php?consulta=6",
        activoSeleccionado
      );
      //console.log(resultado);

      if (resultado.data.success) {
        mostrarAlerta("Activo actulizado correctamente", "success");

        dispatch({
          type: EDITAR_ACTIVO,
          payload: activoSeleccionado,
        });
      } else {
        mostrarAlerta("Ocurrio un error al editar el activo", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };


  return (
    <activosContext.Provider
      value={{
        activos: state.activos,
        activoActual: state.activoActual,
        cargando: state.cargando,
        setCargando,
        obtenerActivos,
        registrarActivo,
        editarActivo,
        eliminarActivo,
        setActivoActual,
        editarUbicacionActivo
      }}
    >
      {props.children}
    </activosContext.Provider>
  );
};

export default ActivosState;
