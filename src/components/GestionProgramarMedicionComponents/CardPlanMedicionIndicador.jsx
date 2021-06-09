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
import GestionarResultadosEstudianteStyles from "../../pages/GestionResultadoEstudiante/GestionarResultadosEstudianteStyles";
import MenuFiltrosPlanesMedicionIndicadores from "../../components/GestionProgramarMedicionComponents/MenuFiltrosPlanesMedicionIndicadores";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./styles.css";
import EventIcon from '@material-ui/icons/Event';
import Button from "@material-ui/core/Button";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

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
    accordionContent: {
        backgroundColor: "#C4C4C4",
        marginBottom: "10px",
        paddingRight: "5px",
        borderRadius: "3px",
    }


}));

const CardPlanMedicionIndicador = ({ indicador, idPrograma,cicloSeleccionado}) => {
    const classes = useStyle();
    const classes2 = GestionarResultadosEstudianteStyles();

    return (

        <div className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`}>
            <div className="col-lg-2 col-md-2 col-sm-4 col-4 " id="codigo">
                {indicador.codigo}
            </div>
            <div className="col-lg-6 col-md-6 d-none d-sm-none d-md-block d-lg-block">
                {indicador.nombre}
            </div>
            <div className="col-lg-2 col-md-2 col-sm-5 col-5 text-center">
                {indicador.programado ?
                    <div className="row d-flex align-items-center"><div className="offset-2 col-3">Si</div><div className="col-3" style={{ color: "#2F9E07" }}><DoneIcon /></div></div> :
                    <div className="row d-flex align-items-center"><div className="offset-2 col-3">No</div><div className="col-3" style={{ color: "#D80A0A" }}><CloseIcon /></div></div>}
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-2 text-end align-items-center">
                <Link
                    to={
                        {
                            pathname: "/gestionarPlanesMedicion/programarMedicion",
                            state: {
                                indicador: indicador,
                                cicloSeleccionado: cicloSeleccionado
                            },
                        }
                    }
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        className={classes.btn}
                        variant="contained"
                        size="small"
                        color="secondary"
                        endIcon={<EventIcon />}
                    /* onClick={() => {
                }} */
                    >
                        Programar
                    </Button>
                </Link>
            </div>
        </div>


    );
};

export default CardPlanMedicionIndicador;