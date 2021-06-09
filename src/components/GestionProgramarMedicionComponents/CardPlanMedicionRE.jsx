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
import CardPlanMedicionIndicador from "../../components/GestionProgramarMedicionComponents/CardPlanMedicionIndicador";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./styles.css";

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

const CardPlanMedicionRE = ({ resultado, idPrograma, index, toggle, clicked,cicloSeleccionado }) => {
    const classes = useStyle();
    const classes2 = GestionarResultadosEstudianteStyles();
    const [open, setOpen] = React.useState(false);


    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function AccordionBody() {
        return (
            <div className={classes.accordionContent}>
                <div className="row " >
                    <div className="offset-1 col-11" style={{ marginTop: "7px" }}>
                        <MenuFiltrosPlanesMedicionIndicadores />
                    </div>
                </div>
                <div className="row">
                    {resultado.indicadores.map(
                        (indicador, index) => {
                            return (
                                <div className="offset-1 col-11" >
                                    <CardPlanMedicionIndicador
                                        key={
                                            indicador.idIndicador
                                        }
                                        indicador={indicador}
                                        idPrograma={idPrograma}
                                        cicloSeleccionado= {cicloSeleccionado}
                                    />
                                </div>
                            );
                        }
                    )
                    }
                </div>
            </div>
        )
    }


    return (
        <>
            <div className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`}>

                <div className="col-lg-2 col-md-2 col-sm-3 col-3 " id="codigo">
                    {resultado.codigo}
                </div>
                <div className="col-lg-5 col-md-5 d-none d-sm-none d-md-block d-lg-block">
                    {resultado.sumilla}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-3 text-center">
                    {resultado.ultimaMedicion}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-3 text-center p-0">
                    <div className="row justify-content-end">
                        <div className="col-3 p-0 justify-content-center">
                            <Link
                                to={{
                                    pathname:
                                        "/gestionarResultadoEstudiante/verResultadoEstudiante",
                                    state: {
                                        idResultado: resultado.idResultado,
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
                                        idResultado={resultado.idResultado}
                                        idPrograma={idPrograma}
                                    />
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </div>
                <div className="d-flex col-lg-1 col-md-1 col-sm-3 col-3 justify-content-end">
                    <IconButton
                        id="btnExpand"
                        aria-label="ExpandIcon"
                        disableFocusRipple
                        disableRipple
                        style={{ padding: "0px", margin: "0px" }}
                        onClick={() => {
                            toggle(index)
                        }}
                    >
                        {clicked === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </div>

            </div>
            {clicked === index ? <AccordionBody /> : null}

        </>


    );
};

export default CardPlanMedicionRE;
