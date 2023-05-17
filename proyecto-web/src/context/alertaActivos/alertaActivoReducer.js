import {
  REGISTRAR_ALERTA,
  DESACTIVAR_ALERTA,
  OBTENER_ALERTAS,
  ALERTA_ACTUAL,
} from "../../types/index";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case ALERTA_ACTUAL:
      return {
        ...state,
        alertaActual:{...action.payload}
      };

    case OBTENER_ALERTAS:
      return {
        alertas: action.payload,
      };

    case REGISTRAR_ALERTA:
      return {
        alertas: [...state.alertas, action.payload],
      };

    case DESACTIVAR_ALERTA:
      return {
        alertas: state.alertas.filter(
          (alerta) => alerta.id_alerta !== action.payload
        ),
      };

    default:
      return state;
  }
};
