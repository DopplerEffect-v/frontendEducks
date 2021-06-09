import React, { useReducer } from "react";
import FacultadReducer from "./FacultadReducer";
import FacultadContext from "./FacultadContext";
import axios from "axios";
import url from "../../config";
import instance from "../../instance";

import { useToasts } from "react-toast-notifications";

const FacultadState = (props) => {
    
    const initialState = {
        facultades: [],
        facultad: null,
        flagSiglas: false,
    };
    const [state, dispatch] = useReducer(FacultadReducer, initialState);

    const { addToast } = useToasts();

    let secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchFacultades = async () => {
        
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/facultad/listarFacultades`,
                null,
                secureConfig
            );

            dispatch({
                type: "FETCH_FACULTADES",
                payload: res.data,
            });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log("error");
        }
    };

    const buscarFacultades = async (cadena) => {
        
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/facultad/buscarFacultades`,
                    { cadena: cadena },
                    secureConfig
                )
                .then(function (res) {
                    dispatch({
                        type: "BUSCAR_FACULTADES",
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
    const fetchFacultad = async (id) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(`${url}/facultad/getFacultad/` + id, null, secureConfig)
                .then((res) => {
                    dispatch({
                        type: "FETCH_FACULTAD",
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

    const cleanFacultad = async () => {
        dispatch({
            type: "CLEAN_FACULTAD",
            payload: null,
        });
    };

    const addFacultad = async (facultad) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios.post(
                `${url}/facultad/crearFacultad`,
                {
                    //objeto
                    siglas: facultad.siglas,
                    nombre: facultad.nombreFacultad,
                    correoElectronico: facultad.correoElectronico,
                    fidCoordinadorAcredFacultad: facultad.fidCoordinador,
                },
                secureConfig
            );
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };
    const updateFacultad = async (facultad) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios.post(
                `${url}/facultad/editarFacultad`,
                {
                    //objeto
                    idFacultad: facultad.idFacultad,
                    siglas: facultad.siglas,
                    nombre: facultad.nombreFacultad,
                    correoElectronico: facultad.correoElectronico,
                    fidCoordinadorAcredFacultad: facultad.fidCoordinador,
                },
                secureConfig
            );
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const verifySiglas = async (cadena) => {
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/facultad/checkSiglas`,
                { cadena: cadena },
                secureConfig
            );
            console.log(res.data);
            dispatch({
                type: "VERIFY_SIGLAS",
                payload: res.data,
            });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log("error");
        }
    };

    return (
        <FacultadContext.Provider
            value={{
                facultades: state.facultades,
                facultad: state.facultad,
                flagSiglas: state.flagSiglas,
                fetchFacultades,
                fetchFacultad,
                cleanFacultad,
                addFacultad,
                updateFacultad,
                buscarFacultades,
                verifySiglas,
            }}
        >
            {props.children}
        </FacultadContext.Provider>
    );
};

export default FacultadState;
