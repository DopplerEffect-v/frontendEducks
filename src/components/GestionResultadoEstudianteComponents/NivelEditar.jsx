import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { StepContent, Typography } from "@material-ui/core";
import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import NivelVacio from "../../mockObjects/ResultadoEstudiante/mockNivel";

const useStyles = makeStyles({
    contenedor: {
        width: "72px",
        height: "auto",
        borderRadius: "10px",
        backgroundColor: "#5DC982",
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
    titulo: {
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#00477F",
    },
});

const NivelesArray = ({ nestIndex, control, methods, niveles, resultado, cont, setCont }) => {
    const classes = useStyles();
    const lNiveles = parseInt(niveles) - 1;
    const { fields, append, remove } = useFieldArray({
        control,
        name: `indicadores[${nestIndex}].niveles`
    });
    useEffect(() => {
        var i = 0;
        var j = 0;
        console.log(cont);
        if (resultado && cont < resultado.numIndicadores) {
            for (j = 0; j < resultado.niveles; j++) {
                try { append(resultado.indicadores[nestIndex].niveles[j]); }
                catch (error) {
                    append(NivelVacio)
                }
            }
            const a = setCont(cont + 1)
        }
        else {
            for (i = 0; i < niveles; i++) {
                //console.log("EntroAqui")
                append(NivelVacio);
            }
        }
    }, []);
    return (
        <div>
            {fields.map((item, k) => {
                return (
                    <div key={item.id}>
                        <div className="list-item my-1">
                            <div className="d-flex align-items-center">
                                <label
                                    className={`${classes.titulo}`}
                                    style={{ width: "55px", textAlign: "center" }}
                                >
                                    Nivel {k + 1}
                                </label>
                                <div className="mx-1">-</div>
                                <div className="d-none">
                                    <TextField
                                        /* className={`${classes.titulo}`}
                                        style={{ width: "110px" }} */
                                        value={k + 1}
                                        //id={"P_N_" + nestIndex + "_" + k}
                                        name={`indicadores[${nestIndex}].niveles[${k}].escala`}
                                        inputRef={methods.register()}
                                    />
                                </div>
                                <TextField
                                    className={`${classes.titulo}`}
                                    style={{ width: "110px" }}
                                    defaultValue={item.nombre}
                                    placeholder="En progreso"
                                    id={"P_N_" + nestIndex + "_" + k}
                                    name={`indicadores[${nestIndex}].niveles[${k}].nombre`}
                                    inputRef={methods.register({
                                        required: {
                                            value: true,
                                            message: "Complete el nombre del nivel",
                                        },
                                        maxLenght: {
                                            value: 50,
                                            message: "El nombre de un nivel no puede superar 50 caracteres"
                                        },
                                    })}
                                />
                            </div>
                            
                            <TextField
                                id={"N_" + nestIndex + "_" + k}
                                className={`${classes.titulo}`}
                                style={{ width: "90%" }}
                                defaultValue={item.descripcion}
                                multiline
                                placeholder="Descripción"
                                name={`indicadores[${nestIndex}].niveles[${k}].descripcion`}
                                inputRef={methods.register({
                                    required: {
                                        value: true,
                                        message: "Complete la descripción del nivel",
                                    },
                                    maxLenght: {
                                        value: 300,
                                        message: "La descripción de un nivel no puede superar 300 caracteres"
                                    },

                                })}
                            />
                            <div>
                                <span >
                                    <Typography variant="body2" color="error" id="errorSumilla" >
                                        {methods.errors?.indicadores?.[nestIndex]?.niveles?.[k]?.nombre?.message || methods.errors?.indicadores?.[nestIndex]?.niveles?.[k]?.descripcion?.message}
                                    </Typography>
                                </span>
                            </div>
                            <button
                                type="button"
                                id={"Del" + nestIndex + "_" + k}
                                //id="botonDelete"
                                name={`indicadores[${nestIndex}].niveles[${k}].remove`}
                                className="d-none"
                                onClick={() => {
                                    remove(k)
                                    console.log(fields);
                                }
                                }
                            >
                                QuitarNivel
                        </button>
                        </div>
                    </div>
                )
            })}
            <button
                type="button"
                id="botonAgregar"
                name="botonAgregar"
                className="d-none"
                onClick={() =>
                    append({
                        NivelVacio
                    })
                }
            >
                BotonNiveles
    </button>
        </div>
    )
};

export default NivelesArray;
