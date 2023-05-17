import {
  LOGIN,
  CERRAR_SESION,
  AUTH_USUARIO,
  CAMBIAR_CLAVE,
  ACTUALIZAR_USUARIO,
  RECUPERAR_CLAVE,
} from "../../types/index";

// eslint-disable-next-line
export default (state, action ) => {

  switch (action.type) {

    case CAMBIAR_CLAVE: 
    case RECUPERAR_CLAVE:
       
      return{
        ...state
      }

    case LOGIN:
    case ACTUALIZAR_USUARIO:
      
      return{
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false
      }

    case AUTH_USUARIO:
    
      return{
        ...state,
        autenticado: action.payload.autenticado,
        usuario: action.payload.usuario,
        cargando: false
      }

    case CERRAR_SESION:

      return{
        ...state,
        autenticado: null,
        usuario: null,
        cargando: false
      }


    default: 
      return state;
  }

}