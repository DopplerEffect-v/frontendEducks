import React, { useReducer } from "react";
import ObjetivoEducacionalReducer from "./ObjetivoEducacionalReducer";
import ObjetivoEducacionalContext from "./ObjetivoEducacionalContext";
import axios from "axios";
import url from "../../config";
import instance from "../../instance";
import { useToasts } from "react-toast-notifications";

const ObjetivoEducacionalState = (props) => {
    
    const initialState = {
        objetivosEducacionales: [],
        objetivoEducacional: null,
    };

    const [state, dispatch] = useReducer(
        ObjetivoEducacionalReducer,
        initialState
    );

    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchObjetivosEducacionales = async (id, criterio = "") => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/objetivoEducacional/listarObjetivosEducacionales`,
                {
                    idPrograma: id,
                    criterio: criterio,
                },
                secureConfig
            );

            dispatch({
                type: "FETCH_OBJETIVOS_EDUCACIONALES",
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

    const fetchObjetivoEducacional = async (id) => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/objetivoEducacional/mostrarObjetivoEducacional`,
                    {
                        idObjetivoEducacional: id,
                    },
                    secureConfig
                )
                .then((res) => {
                    dispatch({
                        type: "FETCH_OBJETIVO_EDUCACIONAL",
                        payload: res.data,
                    });
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

    const cleanObjetivoEducacional = async () => {
        dispatch({
            type: "CLEAN_OBJETIVO_EDUCACIONAL",
            payload: null,
        });
    };

    const addObjetivoEducacional = async (objetivoEducacional) => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/objetivoEducacional/crearObjetivoEducacional`,
                    {
                        fidPrograma: objetivoEducacional.fidPrograma,
                        codigo: objetivoEducacional.codigo,
                        sumilla: objetivoEducacional.sumilla,
                        descripcion: objetivoEducacional.descripcion,
                        comentarios: objetivoEducacional.comentarios,
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
    const updateObjetivoEducacional = async (objetivoEducacional) => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(`${url}/objetivoEducacional/editarObjetivoEducacional`, {
                    idObjetivoEducacional:
                        objetivoEducacional.idObjetivoEducacional,
                    codigo: objetivoEducacional.codigo,
                    sumilla: objetivoEducacional.sumilla,
                    descripcion: objetivoEducacional.descripcion,
                    comentarios: objetivoEducacional.comentarios,
                })
                .then(function (response) {
                    console.log(response);
                }, secureConfig);
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const deleteObjetivoEducacional = async (idObjetivo) => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/objetivoEducacional/eliminarObjetivoEducacional`,
                    {
                        //objeto
                        idObjetivoEducacional: idObjetivo,
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

    return (
        <ObjetivoEducacionalContext.Provider
            value={{
                objetivosEducacionales: state.objetivosEducacionales,
                objetivoEducacional: state.objetivoEducacional,
                fetchObjetivosEducacionales,
                fetchObjetivoEducacional,
                cleanObjetivoEducacional,
                addObjetivoEducacional,
                updateObjetivoEducacional,
                deleteObjetivoEducacional,
            }}
        >
            {props.children}
        </ObjetivoEducacionalContext.Provider>
    );
};

export default ObjetivoEducacionalState;
