import React, { useReducer } from "react";
import ResultadoEstudianteReducer from "./ResultadoEstudianteReducer";
import ResultadoEstudianteContext from "./ResultadoEstudianteContext";
import axios from "axios";
import url from "../../config";
import instance from "../../instance";
import { useToasts } from "react-toast-notifications";

const ResultadoEstudianteState = (props) => {
    
    const initialState = {
        resultadosEstudiante: [],
        resultadoEstudiante: null,
    };
    const [state, dispatch] = useReducer(
        ResultadoEstudianteReducer,
        initialState
    );

    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchResultadosEstudiante = async (id, criterio = "") => {
        
        if(instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/resultadoEstudiante/listarResultadoEstudiante`,
                {
                    idPrograma: id,
                    criterio: criterio,
                },
                secureConfig
            );

            dispatch({
                type: "FETCH_RESULTADOS_ESTUDIANTE",
                payload: res.data,
            });
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            console.log(error);
        }
    };

    const fetchResultadoEstudiante = async (id) => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/resultadoEstudiante/mostrarResultadoEstudiante`,
                    {
                        idResultadoEstudiante: id,
                    },
                    secureConfig
                )
                .then((res) => {
                    dispatch({
                        type: "FETCH_RESULTADO_ESTUDIANTE",
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

    const deleteResultadoEstudiante = async (
        idResultadoEstudiante,
        idPrograma
    ) => {
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/resultadoEstudiante/eliminarResultadoEstudiante`,
                    {
                        //objeto
                        idResultadoEstudiante: idResultadoEstudiante,
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

    const addResultadoEstudiante = async (resultado) => {
        console.log(JSON.stringify(resultado));
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/resultadoEstudiante/crearResultadoEstudiante`,
                    resultado,
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
            console.log(error);
        }
    };

    const editarResultadoEstudiante = async (resultado) => {
        //console.log(JSON.stringify(resultado));
        console.log(resultado);
        if(instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/resultadoEstudiante/editarResultadoEstudiante`,
                    resultado,
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
            console.log(error);
        }
    };

    return (
        <ResultadoEstudianteContext.Provider
            value={{
                resultadosEstudiante: state.resultadosEstudiante,
                resultadoEstudiante: state.resultadoEstudiante,
                addResultadoEstudiante,
                editarResultadoEstudiante,
                fetchResultadosEstudiante,
                deleteResultadoEstudiante,
            }}
        >
            {props.children}
        </ResultadoEstudianteContext.Provider>
    );
};

export default ResultadoEstudianteState;
