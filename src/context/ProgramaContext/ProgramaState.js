import React, { useReducer } from "react";
import ProgramaReducer from "./ProgramaReducer";
import ProgramaContext from "./ProgramaContext";
import axios from "axios";
import url from "../../config";
import { useToasts } from "react-toast-notifications";

import instance from "../../instance";

const ProgramaState = (props) => {
    
    const initialState = {
        programas: [],
        programa: null,
    };

    const [state, dispatch] = useReducer(ProgramaReducer, initialState);

    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchProgramas = async (id,criterio) => {
        //if (!ls.get("ishara").token) return;
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/programa/listarProgramaXFacultad`,
                {
                    idFacultad: id,
                    criterio: criterio,
                },
                secureConfig
            );

            dispatch({
                type: "FETCH_PROGRAMAS",
                payload: res.data,
            });
        } catch (error) {
            //console.log(error);
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    };
    const buscarProgramas = async (id, cadena) => {
        if(instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/programa/buscarProgramasXFacultad`,
                    {
                        idFacultad: id,
                        cadena: cadena,
                    },
                    secureConfig
                )
                .then(function (res) {
                    dispatch({
                        type: "BUSCAR_PROGRAMAS",
                        payload: res.data,
                    });
                });
        } catch (error) {
            //console.log(error);
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    };
    const fetchPrograma = async (id) => {
        
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(`${url}/programa/getPrograma/` + id, null, secureConfig)
                .then((res) => {
                    //console.log(res.data);
                    dispatch({
                        type: "FETCH_PROGRAMA",
                        payload: res.data,
                    });
                });
        } catch (error) {
            //console.log(error);
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    };

    const cleanPrograma = async () => {
        dispatch({
            type: "CLEAN_PROGRAMA",
            payload: null,
        });
    };

    const addPrograma = async (programa) => {
        if(instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/programa/crearPrograma`,
                    {
                        fidResponsablePrograma: programa.fidResponsablePrograma,
                        fidFacultad: programa.fidFacultad,
                        siglas: programa.siglas,
                        nombre: programa.nombre,
                        correoElectronico: programa.correoElectronico,
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
    const updatePrograma = async (programa) => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            //console.log(facultad);
            await axios
                .post(`${url}/programa/editarPrograma`, {
                    idPrograma: programa.idPrograma,
                    fidResponsablePrograma: programa.fidResponsablePrograma,
                    fidFacultad: programa.fidFacultad,
                    siglas: programa.siglas,
                    nombre: programa.nombre,
                    correoElectronico: programa.correoElectronico,
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

    return (
        <ProgramaContext.Provider
            value={{
                programas: state.programas,
                programa: state.programa,
                fetchProgramas,
                fetchPrograma,
                cleanPrograma,
                addPrograma,
                updatePrograma,
                buscarProgramas,
            }}
        >
            {props.children}
        </ProgramaContext.Provider>
    );
};

export default ProgramaState;
