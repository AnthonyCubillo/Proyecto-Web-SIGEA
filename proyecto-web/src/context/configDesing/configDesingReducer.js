import {
  UPDATE_FONT_FAMILY,
  UPDATE_FONT_SIZE,
  UPDATE_COLORS,
  OBTENER_CONFIG_USUARIO,
} from "../../types/index";

//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case UPDATE_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload,
      };

    case UPDATE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload,
      };

    case UPDATE_COLORS:
      return {
        ...state,
        colors: action.payload,
      };

    case OBTENER_CONFIG_USUARIO:
      return {
        ...state,
        id: action.payload.id_configuracion,
        fontFamily: action.payload.font_family,
        fontSize: action.payload.font_size,
        colors: action.payload.color,
      };

    default:
      return state;
  }
};