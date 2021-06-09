import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NivelesArray from "./NivelVer";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TextField from "@material-ui/core/TextField";
import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MantenimientoResultadoEstudianteStyles from "../../pages/MantenimientoResultadoEstudiantePage/MantenimientoResultadoEstudianteStyles";
const useStyles = makeStyles({
    contenedor: {
        width: "72px",
        height: "auto",
        borderRadius: "10px",
        backgroundColor: "#5DC982",
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
    titulo: { fontFamily: "Roboto", fontSize: "15px", fontWeight: "bold" },
    deleteBtn: { cursor: "pointer" },
});

const IndicadorArray = ({ control, methods, indicadorVoid, niveles, numIndicadores, setNumIndicadores, resultado }) => {
    const classes1 = MantenimientoResultadoEstudianteStyles();
    const classes = useStyles();
    const {
        fields: indicadorFields,
        append: indicadorAppend,
        remove: indicadorRemove,
    } = useFieldArray(
        {
            control,
            name: `Indicadores`
        }
    );
    useEffect(() => {
        var i = 0;
        if (resultado) {
            //console.log(resultado.numIndicadores, "numIndicadores");
            for (i = 0; i < resultado.numIndicadores; i++) {
                indicadorAppend(resultado.indicadores[i]);
            }
            //cont++;
        }
        else {
            for (i = 0; i < 1; i++) {
                indicadorAppend(indicadorVoid);
            }
        }

    }, []);
    //indicadorAppend(indicadorVoid);
    return (
        <div div className="container px-0 mx-0 row justify-content-center">
            <div className="d-flex px-0 justify-content-between" style={{ paddingBottom: "5px" }}>
                <label
                    className="mb-2 me-auto"
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    Indicadores:
            </label>
            </div>
            {indicadorFields.map((item, index) => {
                console.log(indicadorFields);
                return (
                    <div
                        key={item.id}
                        className="container px-1 py-2 mb-3"
                        style={{
                            backgroundColor: "#EEEEEE",
                            color: "black",
                            resize: "none",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            border: "1px solid #CCCCCC"
                        }}
                    >
                        <div className="d-flex pb-1 align-items-center justify-content-between">
                            <TextField
                                className={`${classes.titulo}`}
                                defaultValue={item.codigo}
                                //Añadirle nestnestIndex
                                name={`Indicadores[${index}].codigo`}
                                style={{ width: "110px", textAlign: "center" }}
                                placeholder="RE01_INXX"
                                disabled
                                inputRef={methods.register({
                                    required: {
                                        value: true,
                                        message: "Complete el código del indicador",
                                    },
                                    maxLenght: {
                                        value: 10,
                                        message: "El código de un indicador no puede superar 10 caracteres"
                                    },

                                })}
                            />
                            <span>
                                <Typography variant="body2" color="error" id="errorSumilla" >
                                    {methods.errors?.indicadores?.[index]?.codigo?.message || methods.errors?.indicadores?.[index]?.nombre?.message}
                                </Typography>
                            </span>
                            <div className="mx-2">-</div>
                            <TextField
                                className={`mx-2 ${classes.titulo}`}
                                defaultValue={item.nombre}
                                style={{ width: "80%" }}
                                name={`Indicadores[${index}].nombre`}
                                placeholder="Nombre Indicador"
                                inputRef={methods.register({
                                    required: {
                                        value: true,
                                        message: "Complete el nombre del indicador",
                                    },
                                    maxLenght: {
                                        value: 50,
                                        message: "El nombre de un indicador no puede superar 50 caracteres"
                                    },

                                })}
                                disabled
                                multiline
                            />

                            <div className="mx-2">-</div>

                            <TextField
                                disabled
                                className={`mx-2 ${classes.titulo}`}
                                defaultValue={item.nivelLogro}
                                style={{ width: "110px" }}
                                type="number"
                                name={`Indicadores[${index}].nivelLogro`}
                                placeholder="Logro"
                                inputRef={methods.register()}
                            />
                        </div>
                        <NivelesArray nestIndex={index} {...{ control, methods, niveles, resultado }} />
                    </div>
                )
            })}
        </div>
    )
};
export default IndicadorArray;
