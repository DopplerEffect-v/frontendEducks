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
    },
});

const MenuFiltrosUsuarios = () => {
    const classes = useStyle();

    return (
        <div
            className={`container row d-flex py-2 pr-0 mx-auto justify-content-between align-items-center ${classes.prueba}`}
            style={{
                marginTop: "2%",
                padding: ".5%",
                minWidth: "100%",
            }}
        >
            <div className="container row align-items-center px-4">
                <div className=" col-lg-4 col-md-4 col-sm-3 col-xs-auto">
                    <div className="col-10">Nombre</div>
                </div>
                <div className="col-lg-3 d-none d-sm-none d-md-none d-lg-block d-sm-block">
                    <div>Código PUCP</div>
                </div>
                <div className=" col-lg-4 col-md-6 col-sm-7  d-none d-sm-block">
                    <div>Correo</div>
                </div>

                <div className="col-sm-1 col-xs-auto pl-1">Accion</div>
            </div>
        </div>
    );
};

export default MenuFiltrosUsuarios;
