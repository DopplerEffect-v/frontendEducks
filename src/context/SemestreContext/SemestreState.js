import React, { useReducer } from "react";
import SemestreReducer from "./SemestreReducer";
import SemestreContext from "./SemestreContext";
import axios from "axios";
import url from "../../config";
import { useToasts } from "react-toast-notifications";

import instance from "../../instance";

const SemestreState = (props) => {
    const initialState = {
        detalleSemestres: [],
        semestres: [],
        cicloActual: null,
        ultimoProgramado: null,
        ultimoAgregado: null,
        primerAgregar: null,
    };

    const [state, dispatch] = useReducer(SemestreReducer, initialState);

    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchSemestres = async () => {
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/semestre/listarSemestresDesdeActual`,
                null,
                secureConfig
            );

            dispatch({
                type: "FETCH_SEMESTRES",
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDetalleSemestre = async () => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(`${url}/semestre/resumenSemestres`, null, secureConfig)
                .then((res) => {
                    //console.log(res.data);
                    dispatch({
                        type: "FETCH_DETALLE_SEMESTRE",
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

    const cleanDetalleSemestre = async () => {
        dispatch({
            type: "CLEAN_DETALLE_SEMESTRE",
            payload: null,
        });
    };

    const cleanSemestres = async () => {
        dispatch({
            type: "CLEAN_SEMESTRES",
            payload: null,
        });
    };

    const addSemestres = async (semestre) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/semestre/crearSemestres`,
                    {
                        agno: semestre.agno,
                        ciclo: semestre.ciclo,
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
    const deleteSemestres = async (semestre) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/semestre/eliminarSemestres`,
                    {
                        agno: semestre.agno2,
                        ciclo: semestre.ciclo2,
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

    return (
        <SemestreContext.Provider
            value={{
                detalleSemestres: state.detalleSemestres,
                semestres: state.semestres,
                cicloActual: state.cicloActual,
                ultimoProgramado: state.ultimoProgramado,
                ultimoAgregado: state.ultimoAgregado,
                primerAgregar: state.primerAgregar,
                fetchSemestres,
                fetchDetalleSemestre,
                cleanDetalleSemestre,
                cleanSemestres,
                addSemestres,
                deleteSemestres,
            }}
        >
            {props.children}
        </SemestreContext.Provider>
    );
};

export default SemestreState;
