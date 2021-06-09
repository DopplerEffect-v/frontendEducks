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
    },
});

const MenuFiltrosUsuarios = () => {
    const classes = useStyle();

    return (
        <div className={`container-fluid my-2 row py-2 px-0 mx-auto justify-content-between align-items-center ${classes.card}`}>

            <div className=" col-lg-5 col-md-5 col-sm-5 col-xs-11">
                <div className="row d-flex align-items-center">
                    <div className="col-lg-3 d-md-none d-sm-none d-none d-lg-block"></div>
                    <div className="col-lg-9 col-xs">Nombre</div>
                </div>
            </div>
            <div className="col-lg-2 d-none d-sm-none d-md-none d-lg-block">Codigo</div>
            <div className=" col-lg-4 col-md-5 col-sm-5 col-xs-4 d-none d-sm-block">Correo</div>
            <div className="col-lg-1 col-md-2 col-sm-2 col-xs align-items-center p-0">Accion</div>

        </div>
    );
};

export default MenuFiltrosUsuarios;