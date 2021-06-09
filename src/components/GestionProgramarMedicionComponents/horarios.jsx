import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Nivel from "./Nivel";
//import NivelesArray from "./Nivel";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TextField from "@material-ui/core/TextField";
import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import mockMedicion from "../../mockObjects/ProgramarMedicion/mockMedicion";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuFiltroMediciones from "./MenuFiltroMediciones";
import CardHorarioMedicion from "./CardHorarioMedicion";
import mockCursos from "../../mockObjects/ProgramarMedicion/mockCursosMedicion";
import horarioVoid from "../../mockObjects/ProgramarMedicion/horarioVacio";
import MantenimientoResultadoEstudianteStyles from "../../pages/MantenimientoResultadoEstudiantePage/MantenimientoResultadoEstudianteStyles";
const useStyles = makeStyles((theme)=>({
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
    botonRemover: {
        background: "#00477F",
        "&:hover": {
            background: "#042E50",
        },
        color: "white",
    },
    card: {
        fontSize: "90%",
        fontFamily: "Roboto",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        backgroundColor: "white",
    },
    contenedorFormulario: {
        backgroundColor: "#F9F6F6",
        maxWidth: "100%",
        height: "300px",
        padding: theme.spacing(2, 3, 2, 3),
        overflow: "auto",
    },
}));

//this could be HorarriosArray
const HorariosArray = ({ control, methods, cursos, indice,index}) => {
    //const classes1 = MantenimientoResultadoEstudianteStyles();
    const classes = useStyles();
    const {
        fields: horariosFields,
        append: horariosAppend,
        remove: horariosRemove,
    } = useFieldArray(
        {
            control,
            name: `cursos[${indice}].horarios`
        }
    );
    useEffect(() => {
        //console.log('entro')
        if(cursos && (indice===index)){
            cursos[indice].horarios.map((horario) => {
                horariosAppend(horario);    
        })
        }
        //horariosAppend(horarioVoid);
    }, []);
    if(indice===index){
        return (
            <div>
                <div className="d-flex align-items-center mb-4">
                    <label className={classes.datosResultado}>
                        Tipo de Evidencias:
                    </label>
                    <div className="me-1"></div>
                    <input
                        id="inputCodigo"
                        type="text"
                        name="codigo"
                        className="form-control me-auto"
                        style={{
                            backgroundColor: "white",
                            width: "300px",
                        }}
                        maxLength="200"
                        defaultValue={mockMedicion.tipoEvidencias}
                    ></input>
                    <Button
                        id="buttonAgregar"
                        className={classes.btn}
                        variant="contained"
                        size="small"
                        color="secondary"
                        endIcon={<AddCircleOutlineIcon />}
                        onClick={() => horariosAppend(horarioVoid)}
                    >
                        Insertar
                    </Button>
                </div>
            <div className={classes.contenedorFormulario}>
            <MenuFiltroMediciones />
            {horariosFields.map((horario, index) => {
                return (
                    <div
                        key={horario.id}
                        className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`}
                    >
                        <div className="col-lg-3 col-md-3 col-sm-3 col-3" id="codigo">
                            <TextField
                                className={`${classes.titulo}`}
                                fullWidth
                                //id={}
                                defaultValue={horario.horario}
                                name={`cursos[${indice}].horarios[${index}].horario`}
                                style={{ textAlign: "center" }}
                                placeholder="Horario"
                                inputRef={methods.register()}
                            />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-6 col-6 d-flex">
                            <TextField
                                className={`${classes.titulo}`}
                                fullWidth
                                value={horario.nombreProfesor}
                                disabled
                                name={`cursos[${indice}].horarios[${index}].nombreProfesor`}
                                style={{ textAlign: "center" }}
                                placeholder="Buscar Profesor"
                                inputRef={methods.register()}
                            />
                            <SearchIcon style={{ cursor: "pointer" }} />
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-3 col-3 text-center p-0">
                            <div className="row justify-content-center">
                                <div className="col-12 p-0 justify-content-center">
                                    <Link to={{}}>
                                        <IconButton
                                            id="btnEditar"
                                            aria-label="EditIcon"
                                            disableFocusRipple
                                            disableRipple
                                            style={{ padding: "0px", margin: "0px" }}
                                            onClick={() => horariosRemove(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Link>
                                </div>
            
                                <div className="col-1 p-0"></div>
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
        )
    }
    else{
        return(
            <div>
            </div>
        )
    }
};
export default HorariosArray;
