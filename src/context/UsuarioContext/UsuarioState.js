import React, { useReducer } from "react";
import UsuarioReducer from "./UsuarioReducer";
import UsuarioContext from "./UsuarioContext";
import axios from "axios";
import url from "../../config";
import { useToasts } from "react-toast-notifications";

import instance from "../../instance";
import { EnhancedEncryptionTwoTone } from "@material-ui/icons";

const UsuarioState = (props) => {
    const initialState = {
        usuarios: [],
        usuario: null,
        errores: [],
    };

    const [state, dispatch] = useReducer(UsuarioReducer, initialState);

    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchUsuario = async (id) => {
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/usuario/mostrarUsuario`,
                {
                    idUsuario: id,
                },
                secureConfig
            );
            dispatch({
                type: "FETCH_USUARIO",
                payload: res.data,
            });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const fetchUsuarios = async () => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/usuario/listarUsuarios`,
                null,
                secureConfig
            );
            dispatch({
                type: "FETCH_USUARIOS",
                payload: res.data,
            });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const buscarUsuarios = async (cadena) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/usuario/listarUsuarios`,
                    {
                        cadena: cadena,
                    },
                    secureConfig
                )
                .then(function (res) {
                    //console.log(cadena);
                    dispatch({
                        type: "BUSCAR_USUARIOS",
                        payload: res.data,
                    });
                });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const cleanUsuario = async () => {
        dispatch({
            type: "CLEAN_USUARIO",
            payload: null,
        });
    };

    const addUsuario = async (usuario) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/usuario/crearUsuario`,
                    {
                        email: usuario.correoElectronico,
                        codigo: usuario.codigo,
                        nombres: usuario.nombres,
                        apellidoPaterno: usuario.apellidoPaterno,
                        apellidoMaterno: usuario.apellidoMaterno,
                    },
                    secureConfig
                )
                .then(function (response) {
                    console.log(response);
                });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const updateUsuario = async (usuario) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/usuario/editarUsuario`,
                    {
                        idUsuario: parseInt(usuario.idUsuario),
                        idPersona: parseInt(usuario.idPersona),
                        email: usuario.correoElectronico,
                        codigo: usuario.codigo,
                        nombres: usuario.nombres,
                        apellidoPaterno: usuario.apellidoPaterno,
                        apellidoMaterno: usuario.apellidoMaterno,
                    },
                    secureConfig
                )
                .then(function (response) {
                    console.log(response);
                });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const cambiarEstadoUsuario = async (usuario) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            //console.log(facultad);
            await axios
                .post(
                    `${url}/usuario/cambiarEstadoUsuario`,
                    {
                        idUsuario: usuario.idUsuario,
                    },
                    secureConfig
                )
                .then(function (response) {
                    console.log(response);
                });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };
    /* State para enviar un archivo al endpoint. El parametro es un archivo que sale de e.target.result */
    const uploadFile = async (list) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            
            const res = await axios
                .post(`${url}/usuario/cargaMasiva`, list, secureConfig);
                dispatch({
                    type: "ERRORES_CARGA_MASIVA",
                    payload: res.data,
                });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    };

    /* const desbloquearUsuario = async (idUsuario) => {
        if (!ls.get('ishara').token) return;
        try {
            //console.log(facultad);
            await axios
                .post(`${url}/usuario/desbloquearUsuario`, {
                    idUsuario: usuario.idUsuario,
                })
                .then(function (response) {
                    console.log(response);
                }, secureConfig);
        } catch (error) {
            console.log(error);
        }
    };  */

    return (
        <UsuarioContext.Provider
            value={{
                usuarios: state.usuarios,
                usuario: state.usuario,
                errores: state.errores,
                fetchUsuarios,
                fetchUsuario,
                buscarUsuarios,
                addUsuario,
                updateUsuario,
                cleanUsuario,
                cambiarEstadoUsuario,
                uploadFile,
            }}
        >
            {props.children}
        </UsuarioContext.Provider>
    );
};

export default UsuarioState;
