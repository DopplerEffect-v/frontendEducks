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

const MenuFiltrosResultadosEstudiante = () => {
    const classes = useStyle();

    return (
        <div className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`}>

            <div className="col-lg-3 col-md-3 col-sm-4 col-4">Codigo</div>
            <div className="col-lg-5 col-md-5 d-none d-sm-none d-md-block d-lg-block">Sumilla</div>
            <div className="col-lg-2 col-md-2 col-sm-4 col-4 text-center">Ultima Medicion</div>
            <div className="col-lg-2 col-md-2 col-sm-4 col-4 text-center p-0">Accion</div>

        </div>
    );
};

export default MenuFiltrosResultadosEstudiante;