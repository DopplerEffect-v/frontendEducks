import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
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

const NivelesArray = ({ nestIndex, control, methods, niveles, resultado }) => {
    const classes = useStyles();
    const lNiveles = parseInt(niveles) - 1;
    const { fields, append, remove } = useFieldArray({
        control,
        name: `Indicadores[${nestIndex}].niveles`
    });
    useEffect(() => {

        var i = 0;
        var j = 0;
        if (resultado && nestIndex < resultado.numIndicadores) {
            for (j = 0; j < resultado.niveles; j++) {
                console.log(resultado)
                append(resultado.indicadores[nestIndex].niveles[j]);
            }
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
                                <TextField
                                    disabled
                                    className={`${classes.titulo}`}
                                    style={{ width: "110px" }}
                                    defaultValue={item.nombre}
                                    placeholder="En progreso"
                                    id={"P_N_" + nestIndex + "_" + k}
                                    name={`Indicadores[${nestIndex}].niveles[${k}].nombre`}
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
                            {/* <div>
                            <span >
                                <Typography variant="body2" color="error" id="errorSumilla" >
                                    {methods.errors?.indicadores?.[nestIndex]?.niveles?.[k]?.progreso?.message || methods.errors?.indicadores?.[nestIndex]?.niveles?.[k]?.descripcion?.message}
                                </Typography>
                            </span>
                        </div> */}
                            <TextField
                                disabled
                                id={"N_" + nestIndex + "_" + k}
                                className={`${classes.titulo}`}
                                style={{ width: "90%" }}
                                defaultValue={item.descripcion}
                                multiline
                                placeholder="Descripción"
                                name={`Indicadores[${nestIndex}].niveles[${k}].descripcion`}
                                inputRef={methods.register({
                                    required: {
                                        value: true,
                                        message: "Complete la descripción del nivel",
                                    },
                                    maxLenght: {
                                        value: 200,
                                        message: "La descripción de un nivel no puede superar 200 caracteres"
                                    },

                                })}
                            />
                            <button
                                type="button"
                                id={"Del" + nestIndex + "_" + k}
                                //id="botonDelete"
                                name={`Indicadores[${nestIndex}].niveles[${k}].remove`}
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
