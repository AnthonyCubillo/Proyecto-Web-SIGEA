import {
  REGISTRO_USUARIO,
  EDITAR_USUARIO,
  ELIMINAR_USUARIO,
  OBTENER_USUARIOS,
  USUARIO_ACTUAL
} from "../../types/index";

//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {

    case USUARIO_ACTUAL:
      return{
        ...state, 
        usuarioActual: action.payload
      }

    case OBTENER_USUARIOS:
      return {
        ...state,
        usuarios: action.payload
      };

    case REGISTRO_USUARIO:
      return {
        ...state,
        usuarios: [...state.usuarios, action.payload]
      };

    case  ELIMINAR_USUARIO:
      return {
        ...state,
        usuarios: state.usuarios.filter(
          (usuario) => usuario.id_usuario !== action.payload
        ),
        usuarioActual: null,
      };

    case EDITAR_USUARIO:
      return {
        ...state,
        usuarios: state.usuarios.map(
          (usuario) => usuario.id_usuario  === action.payload.id_usuario ? action.payload : usuario      
        ),
        usuarioActual: null,
      };

    default:
      return state;
  }
};
