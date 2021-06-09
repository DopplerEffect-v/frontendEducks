import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import axios from "axios";
import url from "../../config";
import instance from "../../instance";

const AuthState = (props) => {
    
    const initialState = {
        isAuth: false,
        currentRol: null, //{idRol: 2, nombre: "Administrador"}
        roles: [], // {{idRol: 2, nombre: "Administrador"}, {idRol: 2, nombre: "Administrador"}, {idRol: 2, nombre: "Administrador"}}
        nombre: null,
        email: null,
        //token: localStorage.getItem("token"),
        token: instance.getItem("ishara").token,
        errorMessage: null,
        //imagen del usuario
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    /* Permite recibir un token enviando usuario y contraseña */

    //SOLO ENTRA CUANDO ES CORRECTO PERO NO FUNCIONA CUANDO LOS DATOS SON INCORRECTOS
    const loginUser = async (data) => {
        var flag = false;
        await axios
            .post(`${url}/login`, data)
            .then((res) => {
                console.log(res);
                //       localStorage.setItem("token", res.data.token);
                //Token es suajili
                instance.setItem("ishara", { token: res.data.token });
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        token: res.data.token,
                    },
                });
                //console.log("RETORNARÁ TRUE");
                flag = true;
            })
            .catch((err) => {
                //console.log(err);
                //console.log("RETORNARÁ FALSE");
                dispatch({ type: "USER_LOADED_FAIL" });
            });
        return flag;
    };

    /* 
    Permite recibir un token personal por parte del backend, enviando un correo de gmail 
    Tanto el token como el refresh Token se almacenarán en el localStorage
  */
    /*  const loginGmailUser = async (resGoogle) => {
    console.log(resGoogle);
    //Datos de usuario de google
    let userGoogle = resGoogle.profileObj;
    try {
      const response = await axios.post(`${url}/usuario/existeUsuario`, {
        correoElectronico: "emilio@pucp.edu.pe", //resGoogle.email
      });

      const data = response.data;

      if (data.existe) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            currentRol: data.roles[0],
            roles: data.roles,
            nombre: userGoogle.name,
            email: userGoogle.email,
            token: "",
          },
        });

        //dispatch(loadUser());

        return true;
      }
      dispatch({
        type: "LOGIN_ERROR",
        errorMessage: "Usuario no existe en el sistema",
      });
      console.log("no existe en el sistema");
      return false;
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        errorMessage: "Problema con el backend :P",
      });
      console.log(error);
      return false;
    }
  }; */

    /* Permite recibir los datos del usuario solo enviando el token personal */
    const loadUser = async () => {
        let flag = true;
        //console.log("LOAD_USER");
        //localStorage.getItem("token")
        if (instance.getItem("ishara") !== "") {
            let secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            //console.log(localStorage);
            try {
                //ES UN POST CON UN CAMPO EN EL HEADERS DONDE LE MANDA EL TOKEN
                await axios
                    .post(`${url}/usuario/loadUser`, null, secureConfig)
                    .then(function (res) {
                        console.log(res);
                        if (res.status === 200) {
                            //let current= JSON.parse(localStorage.getItem('currentRol'));
                            let current = instance.getItem("sasaGurudumu");
                            //console.log("Es correcto");
                            //console.log(current);
                            if (current <= 0) {
                                current = res.data.roles[0];
                            }
                            dispatch({
                                type: "USER_LOADED_SUCCESS",
                                payload: {
                                    currentRol: current,
                                    roles: res.data.roles,
                                    nombre: "",
                                    email: res.data.email,
                                    token: instance.getItem("ishara").token,
                                },
                            });
                        } else {
                            dispatch({ type: "USER_LOADED_FAIL" });
                        }
                    });
            } catch (err) {
                //LA UNICA MANERA DE QUE ENTRE AQUÍ ES QUE LE MANDE UN TOKEN INCORRECTO
                //console.log(err);
                //dispatch({ type: "USER_LOADED_FAIL" });
            }
        } else {
            flag = false;
            dispatch({ type: "USER_LOADED_FAIL" });
        }
        return flag;
    };

    /* Permite eliminar los datos del usuario de los estados y eliminar el token y el refresh token del localStorage */
    const logoutUser = async () => {
        dispatch({
            type: "LOGOUT",
            payload: { errorMessage: "sesión cerrada" },
        });
    };
    const updateCurrentRol = async (rol) => {
        dispatch({ type: "UPDATE", payload: { currentRol: rol } });
    };
    return (
        <AuthContext.Provider
            value={{
                isAuth: state.isAuth,
                currentRol: state.currentRol,
                roles: state.roles,
                nombre: state.nombre,
                email: state.email,
                token: state.token,
                errorMessage: state.errorMessage,
                //        loginGmailUser,
                logoutUser,
                loadUser,
                loginUser,
                updateCurrentRol,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
