import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import Button from "@material-ui/core/Button";
import { useContext } from "react";
import ResultadoEstudianteContext from "../../context/ResultadoEstudianteContext/ResultadoEstudianteContext";
import Question from "../../components/Animations/Question";

const useStyles = makeStyles({
    icon: {
        width: "100px",
        height: "100px",
    },
    exit: {
        width: "30px",
        height: "30px",
    },
    buttonAceptar: {
        background: "#970000",
        color: "white",
        "&:hover": {
            background: "#600101",
        },
    },
    buttonCancelar: {
        background: "#7E7A7A",
        color: "white",
        "&:hover": {
            background: "#505050",
        },
    },
});

const ModalConfirmacionEliminacion = ({
    handleClose,
    idResultado,
    idPrograma,
}) => {
    const classes = useStyles();
    const { fetchResultadosEstudiante,
        deleteResultadoEstudiante } =
        useContext(ResultadoEstudianteContext);
    return (
        <form /* onSubmit={handleSubmit(onSubmit)} */>
            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    onClick={handleClose}
                    className="btn "
                    aria-label="Close"
                >
                    <HighlightOffIcon className={classes.exit} />
                </button>
            </div>
            <div className="container pb-2 d-flex justify-content-center">
                <Question/>
            </div>
            <div className="container w-90  d-flex justify-content-center">
                <div className=" my-4">
                    <h3 style={{ fontWeight: "bold" }}>
                        ¿Desea eliminar el Resultado de Estudiante?
                    </h3>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 ">
                <div className="px-3">
                    <Button
                        variant="contained"
                        size="medium"
                        className={classes.buttonCancelar}
                        endIcon={<ClearIcon />}
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Cancelar
                    </Button>
                </div>

                <div className="px-3">
                    <Button
                        id="btnAceptar"
                        variant="contained"
                        size="medium"
                        className={classes.buttonAceptar}
                        endIcon={<CheckIcon />}
                        onClick={() => {
                            //handleClose();
                            deleteResultadoEstudiante(idResultado, idPrograma).then(() => {
                                fetchResultadosEstudiante(idPrograma);
                                handleClose();
                            });
                        }}
                    >
                        Aceptar
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ModalConfirmacionEliminacion;
