import React, { useReducer } from "react";
import AsistentesReducer from "./AsistentesReducer";
import AsistentesContext from "./AsistentesContext";
import axios from "axios";
import url from "../../config";
import { useToasts } from "react-toast-notifications";
import instance from "../../instance";

const AsistentesState = (props) => {
    
    const initialState = {
        asistentes: [],
        Noasistentes: [],
        asistente: null,
    };
    const [state, dispatch] = useReducer(AsistentesReducer, initialState);

    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchAsistentes = async (idPrograma) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/usuario/listarAsistentePrograma`,
                    {
                        //objeto
                        idPrograma: idPrograma,
                        criterio: "",
                    },
                    secureConfig
                )
                .then(function (res) {
                    dispatch({
                        type: "FETCH_ASISTENTES",
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
    const fetchNoAsistentes = async (idPrograma, cadena = "") => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/usuario/buscarUsuariosAsistente`,
                    {
                        //objeto
                        idPrograma: idPrograma,
                        criterio: cadena,
                    },
                    secureConfig
                )
                .then(function (res) {
                    dispatch({
                        type: "FETCH_NOASISTENTES",
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
    const addAsistentes = async (asistente, idPrograma) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios.post(
                `${url}/usuario/crearAsistente`,
                {
                    //objeto
                    idUsuario: asistente.idUsuario,
                    idPersona: asistente.fidPersona,
                    idPrograma: idPrograma,
                },
                secureConfig
            );
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            /* console.log(asistente);
            console.log(error); */
        }
    };
    const deleteAsistentes = async (asistente, idPrograma) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/usuario/eliminarAsistente`,
                    {
                        //objeto
                        idUsuario: asistente.idUsuario,
                        idPrograma: idPrograma,
                    },
                    secureConfig
                )
                .then(function (res) {
                    //console.log(res.data);
                });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };
    const buscarAsistentes = async (idPrograma, cadena) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/usuario/listarAsistentePrograma`,
                    {
                        //objeto
                        idPrograma: idPrograma,
                        criterio: cadena,
                    },
                    secureConfig
                )
                .then(function (res) {
                    dispatch({
                        type: "BUSCAR_ASISTENTES",
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

    return (
        <AsistentesContext.Provider
            value={{
                asistentes: state.asistentes,
                asistente: state.asistente,
                Noasistentes: state.Noasistentes,
                fetchAsistentes,
                buscarAsistentes,
                fetchNoAsistentes,
                addAsistentes,
                deleteAsistentes,
            }}
        >
            {props.children}
        </AsistentesContext.Provider>
    );
};

export default AsistentesState;
