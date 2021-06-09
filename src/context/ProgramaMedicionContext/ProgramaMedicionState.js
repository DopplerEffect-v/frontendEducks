import React, { useReducer } from "react";
import ProgramaMedicionReducer from "./ProgramaMedicionReducer";
import ProgramaMedicionContext from "./ProgramaMedicionContext";
import axios from "axios";
import url from "../../config";
import instance from "../../instance";
import { useToasts } from "react-toast-notifications";

const ProgramaMedicionState = (props) => {
    const initialState = {
        resultadosMedicion: [],
        resultadosNoMedicion: [],
        resultadoMedicion: null,
    };
    const [state, dispatch] = useReducer(ProgramaMedicionReducer, initialState);

    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchProgramasMedicion = async (
        idPrograma,
        idSemestre,
        criterio = ""
    ) => {
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/programacionPlanesMedicion/listarResultadoEstudianteXProgramacionPlanesMedicion`,
                {
                    idPrograma: idPrograma,
                    idSemestre: idSemestre,
                    //criterio: criterio,
                },
                secureConfig
            );

            dispatch({
                type: "FETCH_PROGRAMAS_MEDICION",
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

    const fetchNoResultadoEstudiante = async (
        idPrograma,
        idSemestre,
        criterio = ""
    ) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/programacionPlanesMedicion/listarResultadoEstudianteNoPlanMedicion`,
                    {
                        idPrograma: idPrograma,
                        idSemestre: idSemestre,
                        criterio: criterio,
                    },
                    secureConfig
                )
                .then((res) => {
                    dispatch({
                        type: "FETCH_NO_RESULTADO_ESTUDIANTE_MEDICION",
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

    const asignarResultadoMedicion = async (
        idPrograma,
        idSemestre,
        resultados
    ) => {
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/programacionPlanesMedicion/asignarResultadoEstudianteMedicion`,
                {
                    idPrograma: idPrograma,
                    idSemestre: idSemestre,
                    resultados: resultados,
                },
                secureConfig
            );
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            console.log(error);
        }
    };

    const deleteResultadoEstudiante = async (
        idResultadoEstudiante,
        idPrograma
    ) => {
        if (instance.getItem("ishara") === "") return;
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
        if (instance.getItem("ishara") === "") return;
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
        if (instance.getItem("ishara") === "") return;
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
        <ProgramaMedicionContext.Provider
            value={{
                resultadosMedicion: state.resultadosMedicion,
                resultadoMedicion: state.resultadoMedicion,
                resultadosNoMedicion: state.resultadosNoMedicion,
                fetchProgramasMedicion,
                fetchNoResultadoEstudiante,
                asignarResultadoMedicion,
            }}
        >
            {props.children}
        </ProgramaMedicionContext.Provider>
    );
};

export default ProgramaMedicionState;
