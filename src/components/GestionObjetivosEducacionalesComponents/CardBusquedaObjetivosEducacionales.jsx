import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import Button from "@material-ui/core/Button";
import GestionarObjetivosEducacionalesStyles from "../../pages/GestionObjetivosEducacionalesPage/GestionarObjetivosEducacionalesStyles";
import { appendErrors } from "react-hook-form";

const useStyle = makeStyles((theme) => ({
    botonRemover: {
        background: "#00477F",
        "&:hover": {
            background: "#042E50",
        },
        color: "white",
    },
    card: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "90%",
        fontFamily: "Roboto",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        backgroundColor: "white",
    },
    botonSeleccionar: {
        background: "#00477F",
        "&:hover": {
            background: "#042E50",
        },
        color: "white",
    },
}));

const CardBusquedaObjetivosEducacionales = ({
    objetivo,
    handleClose,
    addObjetivo,
    append
}) => {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    return (
        <div
            className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`}
        >
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-11 " id="codigo">
                {objetivo.codigo}
            </div>
            <div className="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block">
                {objetivo.sumilla}
            </div>
            <div className="col-lg-2 col-md-2 col-sm-6 col-xs text-center p-0">
                <Button
                    variant="contained"
                    size="small"
                    id="buttonSeleccionarObjetivo"
                    className={classes.botonSeleccionar}
                    onClick={() => {
                        {/* addObjetivo({
                            idObjetivoEducacional: objetivo.idObjetivoEducacional,
                            codigo: objetivo.codigo,
                        }); */}
                        append(objetivo);
                        handleClose();
                    }}
                >
                    Seleccionar
                </Button>
            </div>
        </div>
    );
};

export default CardBusquedaObjetivosEducacionales;
