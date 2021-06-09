import React, { useReducer } from "react";
import CursoContext from "./CursoContext";
import CursoReducer from "./CursoReducer";
import axios from "axios";
import url from "../../config";
import instance from "../../instance";
import { useToasts } from "react-toast-notifications";

const CursoState = (props) => {
    const initialState = {
        cursos: [],
        curso: null,
    };
    const [state, dispatch] = useReducer(CursoReducer, initialState);
    const { addToast } = useToasts();

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara").token}`,
        },
    };

    const fetchCursos = async (id, cadena = "") => {
        if (instance.getItem("ishara") === "") return;

        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            const res = await axios.post(
                `${url}/curso/listarCursos`,
                {
                    fidPrograma: id,
                    cadena: cadena,
                },
                secureConfig
            );
            dispatch({
                type: "FETCH_CURSOS",
                payload: res.data,
            });
            //console.log(res.data)
        } catch (error) {
            addToast("Ups.. algo salió mal", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };

    const addCurso = async (fidPrograma, codigo, nombre) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            console.log(secureConfig);
            await axios
                .post(
                    `${url}/curso/crearCurso`,
                    {
                        fidPrograma: fidPrograma,
                        codigo: codigo,
                        nombre: nombre,
                    },
                    secureConfig
                )
                .then(function (response) {
                    addToast("Se ha registrado el curso correctamente!", {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    console.log(response);
                });
        } catch (error) {
            addToast("Ups.. algo salió mal al añadir Curso", {
                appearance: "error",
                autoDismiss: true,
            });
            //console.log(error);
        }
    };
    const updateCurso = async (idCurso, fidPrograma, codigo, nombre) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/curso/editarCurso`,
                    {
                        idCurso: idCurso,
                        fidPrograma: fidPrograma,
                        codigo: codigo,
                        nombre: nombre,
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

    const deleteCurso = async (id) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/curso/eliminarCurso`,
                    {
                        //objeto
                        idCurso: id,
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
    const existeCurso = async (id) => {
        if (instance.getItem("ishara") === "") return;
        try {
            secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara").token}`,
                },
            };
            await axios
                .post(
                    `${url}/curso/existeCursoGeneral`,
                    {
                        codigoCurso: id,
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
        <CursoContext.Provider
            value={{
                cursos: state.cursos,
                curso: state.curso,
                fetchCursos,
                addCurso,
                updateCurso,
                deleteCurso,
                existeCurso,
            }}
        >
            {props.children}
        </CursoContext.Provider>
    );
};

export default CursoState;
