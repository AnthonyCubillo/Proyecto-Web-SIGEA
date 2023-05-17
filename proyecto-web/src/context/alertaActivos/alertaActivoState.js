import React,{useReducer} from "react";
import alertaActivoContext from "./alertaActivoContext";
import alertaActivoReducer from "./alertaActivoReducer";
import {
  REGISTRAR_ALERTA,
  DESACTIVAR_ALERTA,
  OBTENER_ALERTAS,
  ALERTA_ACTUAL,
} from "../../types/index";

import clienteAxios from "../../config/axios";

const AlertaActivoState = (props) => {
 
  const initialState = {
    alertas:  [],
    alertaActual: {},
  };

  const [state, dispatch] = useReducer(alertaActivoReducer, initialState);

   //funciones
   const obtenerAlertas = async ( mostrarAlerta ) => {
    try {
      const resultado = await clienteAxios.get(
        "/controller_alerta.php?consulta=1"
      );

      if (resultado.data.alertas) {

        dispatch({
          type: OBTENER_ALERTAS,
          payload:resultado.data.alertas
        });

      } else {
        mostrarAlerta("Error al listar alertas!", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  const registrarAlerta = async (alerta, mostrarAlerta) => {
    try {
     
      const resultado = await clienteAxios.post(
        "/controller_alerta.php?consulta=2",
        alerta
      );
      //console.log(resultado);

      //inserta el alerta en el state
      if (resultado.data.success) {
        mostrarAlerta(resultado.data.mensaje, "success");

        dispatch({
          type: REGISTRAR_ALERTA,
          payload: {id_alerta:resultado.data.id_alerta ,...alerta},
        });

      } else {
        mostrarAlerta("Ocurrio un error al registrar alerta", "error");
      }
    } catch (error) {
      console.log(error);

      mostrarAlerta(error, "error");
    }
  };

  const eliminarAlerta = async (id_alerta, mostrarAlerta) => {
    
    try {
      const resultado = await clienteAxios.post(
        "/controller_alerta.php?consulta=3",
        { id_alerta}
      );
      console.log(resultado);

      if (resultado.data.success) {

        dispatch({
          type: DESACTIVAR_ALERTA,
          payload: id_alerta,
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
  const setAlertaActual = (alerta) => {
    //console.log(alerta);
    dispatch({
      type: ALERTA_ACTUAL,
      payload: alerta,
    });
  };

  return (
    <alertaActivoContext.Provider
      value = { 
        {
          alertas: state.alertas,
          alertaActual: state.alertaActual,
          obtenerAlertas,
          registrarAlerta,
          setAlertaActual,
          eliminarAlerta,
        }
      }
    >
      {props.children}
    </alertaActivoContext.Provider>
  );
  
}

export default AlertaActivoState;