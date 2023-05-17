import React,{useReducer} from "react";

import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from "../../types/index";

import alertaContext from "./alertaContext";
import alertaReducer from "./alertaReducer";

const AlertaState = (props) => {
  const initialState = {
    alerta:  null
  }

  const [state, dispatch] = useReducer(alertaReducer, initialState);

   //funciones

   //mostrar alerta
  const mostrarAlerta =  (mensaje, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        mensaje: mensaje,
        categoria: categoria
      }
    });

    //ocultar alerta
    setTimeout( () => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 1100);
  }


  return (
    <alertaContext.Provider
      value = { 
        {
          alerta: state.alerta,
          mostrarAlerta
        }
      }
    >
      {props.children}
    </alertaContext.Provider>
  );
  
}

export default AlertaState;