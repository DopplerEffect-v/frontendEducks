import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    container: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        //fontSize: '100%',
        fontFamily: "Roboto",
        fontWeight: "bold",
        backgroundColor: "#F3EEEE",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
    },
});

const MenuFiltrosFacultades = () => {
    const classes = useStyle();

    return (
        <div
            className={`container-fluid my-2 row py-2 px-0 mx-auto align-items-center ${classes.container}`}
        >
            <div className=" col-lg-1 col-md-2 col-sm-2 col-xs-2 ps-1">
                Siglas
            </div>
            <div className=" col-lg-3 col-md-4 col-sm-8 col-xs-8 ps-3 pe-1">
                Nombre
            </div>
            <div className=" d-none d-sm-none d-md-none d-lg-block col-lg-4">
                Coordinador
            </div>
            <div className=" d-sm-none d-none d-md-block d-lg-block col-lg-3 col-md-4">
                Correo
            </div>
            <div className="d-flex justify-content-end col-lg-1 col-md-2 col-sm-2 col-xs-2 mx-auto">
                Accion
            </div>
        </div>
    );
};

export default MenuFiltrosFacultades;
