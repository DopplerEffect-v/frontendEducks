import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import Button from "@material-ui/core/Button";
import { useFormContext } from "react-hook-form";

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

const ModalConfirmacionRegistro = ({
    handleClose,
    onSubmit
}) => {
    const classes = useStyles();
    const methods = useFormContext();
    const {errors} = useFormContext();
    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                        ¿Desea registrar este Usuario?
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
                        id="buttonAceptar"
                        variant="contained"
                        size="medium"
                        className={classes.buttonAceptar}
                        endIcon={<CheckIcon />}
                        type="submit"
                    >
                        Aceptar
                    </Button>
                    {/* {errors?.nombres? handleClose():<h1></h1> }
                    {errors?.apellidoPaterno? handleClose():<h1></h1> }
                    {errors?.apellidoMaterno? handleClose():<h1></h1> }
                    {errors?.codigo? handleClose():<h1></h1>}
                    {errors?.correoElectronico? handleClose():<h1></h1>} */}
                </div>
            </div>
        </form>
    );
};

export default ModalConfirmacionRegistro;
