import {
  REGISTRO_UBICACION,
  EDITAR_UBICACION,
  ELIMINAR_UBICACION,
  OBTENER_UBICACIONES,
  UBICACION_ACTUAL
} from "../../types/index";

//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {

    case UBICACION_ACTUAL:
      return{
        ...state, 
        ubicacionActual: action.payload
      }

    case OBTENER_UBICACIONES:
      return {
        ...state,
        ubicaciones: action.payload
      };

    case REGISTRO_UBICACION:
      return {
        ...state,
        ubicaciones: [...state.ubicaciones, action.payload],
        ubicacionActual: null
      };

    case  ELIMINAR_UBICACION:
      return {
        ...state,
        ubicaciones: state.ubicaciones.filter(
          (ubicacion) => ubicacion.id_ubicacion !== action.payload
        ),
        ubicacionActual: null,
      };

    case EDITAR_UBICACION:
      return {
        ...state,
        ubicaciones: state.ubicaciones.map(
          (ubicacion) => ubicacion.id_ubicacion  === action.payload.id_ubicacion ? action.payload : ubicacion      
        ),
        ubicacionActual: null,
      };

    default:
      return state;
  }
};
