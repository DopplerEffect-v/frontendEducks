import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const VerNivel = ({ nivel, contador }) => {
    const classes = useStyles();
    return (
        <div className="list-item">
            <div className="d-flex align-items-center">
                <label className={classes.titulo}>Nivel {contador}</label>
                <div className="mx-1">-</div>
                <label className={classes.titulo}>{nivel.nombre}</label>
            </div>
            <p>{nivel.descripcion}</p>
        </div>
    );
};

export default VerNivel;