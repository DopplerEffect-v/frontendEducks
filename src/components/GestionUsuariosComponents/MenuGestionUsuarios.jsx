import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    prueba: {
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

const MenuGestionUsuarios = () => {
    const classes = useStyle();

    return (
        <div
            className={`container-fluid mx-auto row align-items-center mb-2 py-2 ${classes.prueba}`}>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-auto">
                <div className="col-10">Nombre</div>
            </div>
            <div className="col-lg-3 col-md-2 d-md-block d-lg-block d-none d-sm-none ">
                <div>Código PUCP</div>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 d-none d-sm-block ">
                <div>Correo</div>
            </div>
            <div className="col-md-1 col-sm-2 text-start ps-0">Accion</div>
        </div>

    );
};

export default MenuGestionUsuarios;
