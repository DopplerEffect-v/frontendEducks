import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, USER_LOADED_FAIL, USER_LOADED_SUCCESS, AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL, UPDATE } from "./AuthTypes";
import instance from "../../instance";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuth: true,
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuth: false,
      }
    case LOGIN_SUCCESS:
      //localStorage.setItem("token",payload.token);
      instance.setItem("ishara", {"token": payload.token});
      return {
        ...state,
        token: payload.token,
        isAuth: true,
      };

    case LOGIN_ERROR:
    case LOGOUT:
      localStorage.clear();
      //debería ser clear de las llaves de nuestro programa
      console.log("CLEAR DE LOGOUT");
      return {
        ...state,
        isAuth: false,
        currentRol: null, //Será objeto que contendrá {idRol, nombreRol}
        roles: null,
        nombre: null,
        email: null,
        token: null,      
        errorMessage: payload.errorMessage,    
      };
    case UPDATE:
      console.log("updateCurrentRol");
      return {
        ...state,
        isAuth: false,
        currentRol: payload.currentRol, 
      };

    case USER_LOADED_SUCCESS:
      //localStorage.setItem("currentRol",JSON.stringify(payload.currentRol));
      instance.setItem("sasaGurudumu", payload.currentRol)
      return {
        ...state,
        currentRol: payload.currentRol, //Será objeto que contendrá {idRol, nombreRol}
        roles: payload.roles,
        nombre: payload.nombre,
        email: payload.email,
        token: payload.token,
        isAuth: true,
        
      };
    
    case USER_LOADED_FAIL:
      localStorage.clear();
      console.log("CLEAR DE USER_LOADED_FAIL");
      return {
        ...state
      };

    default:
      return state;
  }
};

/* isAuth: false,
    currentRol: null, //Será objeto que contendrá {idRol, nombreRol}
    roles: null,
    nombre: "",
    email: "",
    token: "",
    loading: false,
    errorMessage: null */
