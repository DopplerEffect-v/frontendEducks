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
import GestionarObjetivosEducacionalesStyles from "../../pages/GestionObjetivosEducacionalesPage/GestionarObjetivosEducacionalesStyles";

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
}));

const CardObjetivosEducacionales = ({ objetivo, idPrograma }) => {
    const classes = useStyle();
    const classes2 = GestionarObjetivosEducacionalesStyles();
    const [open, setOpen] = React.useState(false);

    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
                <div className="row justify-content-center">
                    <div className="col p-0"></div>
                    <div className="col-3 p-0 justify-content-center">
                        <Link
                            to={{
                                pathname:
                                    "/gestionarObjetivosEducacionales/VerObjetivoEducacional",
                                state: {
                                    idObjetivo: objetivo.idObjetivoEducacional,
                                },
                            }}
                        >
                            <IconButton
                                aria-label="VisibilityIcon"
                                disableFocusRipple
                                disableRipple
                                style={{ padding: "0px", margin: "0px" }}
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <div className="col-3 p-0 justify-content-center">
                        <Link
                            to={{
                                pathname:
                                    "/gestionarObjetivosEducacionales/EditarObjetivoEducacional",
                                state: {
                                    idObjetivo: objetivo.idObjetivoEducacional,
                                },
                            }}
                        >
                            <IconButton
                                id="btnEditar"
                                aria-label="EditIcon"
                                disableFocusRipple
                                disableRipple
                                style={{ padding: "0px", margin: "0px" }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <div className="col-3 p-0 justify-content-center">
                        <IconButton
                            id="btnEliminar"
                            aria-label="DeleteIcon"
                            disableFocusRipple
                            disableRipple
                            style={{ padding: "0px", margin: "0px" }}
                            onClick={() => {
                                handleOpen();
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <div className="col-1 p-0"></div>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes2.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade timeout={5} in={open}>
                        <div className="container h-100 d-flex align-items-center justify-content-center">
                            <div className={`h-auto pb-5 ${classes2.popup}`}>
                                <ModalConfirmacionEliminacion
                                    handleClose={handleClose}
                                    idObjetivo={objetivo.idObjetivoEducacional}
                                    idPrograma={idPrograma}
                                />
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
};

export default CardObjetivosEducacionales;
