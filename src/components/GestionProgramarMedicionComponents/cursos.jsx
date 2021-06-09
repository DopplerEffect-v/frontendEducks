import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Nivel from "./Nivel";
//import NivelesArray from "./Nivel";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
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

import HorariosArray from "./horarios"
const useStyles = makeStyles((theme)=>({
    contenedor: {
        width: "72px",
        height: "auto",
        borderRadius: "10px",
        backgroundColor: "#5DC982",
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
    contenedorFormulario: {
        backgroundColor: "#F9F6F6",
        maxWidth: "100%",
        minHeight: "145px",
        padding: theme.spacing(0, 2, 2, 2),
        marginBottom: "50px",
    },
    titulo: { fontFamily: "Roboto", fontSize: "15px", fontWeight: "bold" },
    deleteBtn: { cursor: "pointer" },
    card: {
        cursor: "pointer",

        //dimensiones del card
        minHeight: "80px",
        minWidth: "210px",
        "&:hover": {
            minHeight: "82px",
            minWidth: "213px",
        },
        //Border
        borderRadius: "10px",
        borderStyle: "solid",
        borderWidth: "1px",
        //margin y padding
        marginRight: "15px",
        paddingTop: "5px",
        //texto
        textAlign: "center",
        fontWeight: "500",
        color: "white",
    },
    deleteIcon: {
        textAlign: "end",
        color: "#970000",
        "&:hover": {
            color: "#C92727",
        },
    },
}));

const CursosArray = ({ control, methods, cursos}) => {
    //const classes1 = MantenimientoResultadoEstudianteStyles();
    const classes = useStyles();
    const [indice,setIndice]=useState(0);
    const {
        fields: cursosFields,
        append: cursosAppend,
        remove: cursosRemove,
    } = useFieldArray(
        {
            control,
            name: `cursos`
        }
    );
    useEffect(() => {
        console.log('entro')
        cursos.map((curso, i) => {
            cursosAppend(curso);
        })
        //cursosAppend(horarioVoid);
    }, [indice]);

    return (
        <div className={classes.contenedorFormulario}>
            <div className="d-flex overflow-auto pb-2 py-0">
                {cursosFields.map((curso, index) => {
                    return (
                        <div key={curso.id} className="py-0">
                            <div className={classes.deleteIcon}>
                                <HighlightOffTwoToneIcon
                                    onClick={() => cursosRemove(index)}
                                    style={{
                                        marginBottom: "-30px",
                                        marginRight: "5px",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                    }}
                                />
                            </div>
                            <div
                                className={classes.card}
                                onClick={() => {
                                    if(index===indice){
                                        console.log('Nice logic bro')
                                    }
                                    else{
                                        //handleCursoSeleccionado(index);
                                        setIndice(index)
                                        /* methods.reset({
                                            curso: `ga`,
                                        });  */
                                    }
                                }}
                                style={{
                                    backgroundColor: indice === index ? "#00477F" : "#909090",
                                    transition: "0.2s",
                                }}
                            >
                                <div>
                                    <div className="col" 
                                    name={`cursos[${index}].codigo`}
                                    //name="codigo"
                                    ref={methods.register()}
                                    >{curso.codigo}</div>
                
                                    <div
                                    name={`cursos[${index}].nombre`}
                                    //name="nombre"
                                    ref={methods.register()}
                                    >{curso.nombre}</div>
                                </div>
                            </div>
                            <HorariosArray {...{ control, methods,cursos,indice,index}} />
                        </div>
                    );
                })}
            </div>
        </div> 
    )
};
export default CursosArray;
