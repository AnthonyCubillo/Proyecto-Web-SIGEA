import {
  REGISTRO_ACTIVO,
  EDITAR_ACTIVO,
  OBTENER_ACTIVOS,
  ELIMINAR_ACTIVO,
  ACTIVO_ACTUAL,
  CARGANDO_ACTIVOS,
} from "../../types/index";

//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case ACTIVO_ACTUAL:
      return {
        ...state,
        activoActual: {...action.payload},
      };
    case OBTENER_ACTIVOS:
      return {
        ...state,
        activos: action.payload,
      };
    case CARGANDO_ACTIVOS:
      return {
        ...state,
        cargando: action.payload,
      };

    case REGISTRO_ACTIVO:
      return {
        ...state,
        activoActual: null,
      };

    case ELIMINAR_ACTIVO:
      return {
        ...state,
        activos: state.activos.filter(
          (activo) => activo.n_etiqueta !== action.n_etiqueta
        ),
        activoActual: null,
      };

    case EDITAR_ACTIVO:
      return {
        ...state,
        activos: state.activos.map((activo) =>
          activo.n_etiqueta === action.payload.n_etiqueta
            ? action.payload
            : activo
        ),
        activoActual: null,
      };

    default:
      return state;
  }
};
