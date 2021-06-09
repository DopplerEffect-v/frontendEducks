import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Nivel from "./Nivel";
import NivelesArray from "./Nivel";
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

const IndicadorArray = ({ control, methods, indicadorVoid, niveles, numIndicadores, setNumIndicadores }) => {
    const classes1 = MantenimientoResultadoEstudianteStyles();
    const classes = useStyles();
    const {
        fields: indicadorFields,
        append: indicadorAppend,
        remove: indicadorRemove,
    } = useFieldArray(
        {
            control,
            name: `indicadores`
        }
    );
    useEffect(() => {
        indicadorAppend(indicadorVoid);
    }, []);

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
                <Button
                    id="buttonNuevo"
                    className={classes1.btn}
                    variant="contained"
                    size="small"
                    color="secondary"
                    endIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                        //console.log(indicadorFields, "IndicadoresFields")
                        indicadorAppend(indicadorVoid);
                        setNumIndicadores(numIndicadores + 1);
                        //console.log(numIndicadores,"numIndicadores");
                    }}
                >
                    Agregar
            </Button>
            </div>
            {indicadorFields.map((item, index) => {
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
                        <span>
                            <Typography variant="body2" color="error" id="errorSumilla" >
                                {methods.errors?.indicadores?.[index]?.codigo?.message || methods.errors?.indicadores?.[index]?.nombre?.message}
                            </Typography>
                        </span>
                        <div className="d-flex pb-1 align-items-center justify-content-between">


                            <TextField
                                id={"codIndicador_" + index}
                                className={`${classes.titulo}`}
                                defaultValue={item.codigo}
                                //Añadirle nestnestIndex
                                name={`indicadores[${index}].codigo`}
                                style={{ width: "110px", textAlign: "center" }}
                                placeholder="REXX_INXX"
                                inputRef={methods.register({
                                    required: {
                                        value: true,
                                        message: "Complete el código del indicador",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "El código de un indicador no puede superar 10 caracteres"
                                    },

                                })}
                            />


                            <div className="mx-2">-</div>

                            <TextField
                                id={"tituloIndicador_" + index}
                                className={`mx-2 ${classes.titulo}`}
                                defaultValue={item.nombre}
                                style={{ width: "80%" }}
                                name={`indicadores[${index}].nombre`}
                                placeholder="Nombre Indicador"
                                inputRef={methods.register({
                                    required: {
                                        value: true,
                                        message: "Complete el nombre del indicador",
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "El nombre de un indicador no puede superar 60 caracteres"
                                    },

                                })}
                                multiline
                            />

                            <div className="mx-2">-</div>
                            <div className="d-none">
                                <TextField
                                    /* className={`${classes.titulo}`}
                                    style={{ width: "110px" }} */
                                    value={"monito"}
                                    //id={"P_N_" + nestIndex + "_" + k}
                                    name={`indicadores[${index}].descripcion`}
                                    inputRef={methods.register()}
                                />
                            </div>
                            <TextField
                                id={"nivelLogro_" + index}
                                className={`mx-2 ${classes.titulo}`}
                                style={{ width: "110px" }}
                                type="number"
                                name={`indicadores[${index}].nivelLogro`}
                                placeholder="Logro"
                                inputRef={methods.register()}
                            />
                            

                            <div className="col-1 d-flex justify-content-end">
                                <DeleteForeverIcon
                                    id={"eliminar_"+index}
                                    className={classes.deleteBtn}
                                    onClick={() => {
                                        indicadorRemove(index)
                                        setNumIndicadores(numIndicadores - 1);
                                        //console.log(numIndicadores,"numIndicadores"); 
                                    }}
                                />
                            </div>
                        </div>

                        <NivelesArray nestIndex={index} {...{ control, methods, niveles }} />
                    </div>
                )
            })}
        </div>
    )
};
export default IndicadorArray;
