import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    card: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "100%",
        fontFamily: "Roboto",
        fontWeight: "bold",
        backgroundColor: "#F3EEEE",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        width: "100%"
    },
});

const MenuFiltrosPlanesMedicionIndicadores = () => {
    const classes = useStyle();

    return (
        <div className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`}>

            <div className="col-lg-2 col-md-2 col-sm-4 col-4">Codigo</div>
            <div className="col-lg-6 col-md-6 d-none d-sm-none d-md-block d-lg-block">Nombre</div>
            <div className="col-lg-2 col-md-2 col-sm-5 col-5 text-center">Programado</div>
        </div>
    );
};

export default MenuFiltrosPlanesMedicionIndicadores;