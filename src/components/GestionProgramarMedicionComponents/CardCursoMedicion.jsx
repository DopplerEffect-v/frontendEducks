import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import { useFormContext } from "react-hook-form";

const useStlyes = makeStyles((theme) => ({
    card: {
        cursor: "pointer",

        //dimensiones del card
        minHeight: "80px",
        minWidth: "210px",
        /* "&:hover": {
            minHeight: "82px",
            minWidth: "213px",
        }, */
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

const CardCursoMedicion = ({
    index,
    clicked,
    curso,
    handleCursoSeleccionado,
    handleRemoveCurso,
}) => {
    
    const classes = useStlyes();

    return (
        <div className="py-0">
            <div className={classes.deleteIcon}>
                <HighlightOffTwoToneIcon
                    onClick={() => handleRemoveCurso(index)}
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
                    if(clicked===index){
                        console.log('Nice logic bro')
                    }
                    else{
                        handleCursoSeleccionado(index);
                    }
                }}
                style={{
                    backgroundColor: clicked === index ? "#00477F" : "#909090"
                }}
            >
                <div>
                    <div className="col" >{curso.codigo}</div>

                    <div>{curso.nombre}</div>
                </div>
            </div>
        </div>
    );
};

export default CardCursoMedicion;
