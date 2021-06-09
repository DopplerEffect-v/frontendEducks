import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import BuscarUsuariosSinRegister from "../GestionUsuariosComponents/BuscarUsuariosSinRegister";

const DarkerDisabledTextField = withStyles({
    root: {
        marginRight: 8,
        "& .MuiInputBase-root.Mui-disabled": {
            color: "black" // (default alpha is 0.38)
        }
    },
    
})(TextField);

const useStyle = makeStyles((theme) => ({
    underline: {
        /* "&&&:before": {
          borderBottom: "none"
        },
        "&&:after": {
          borderBottom: "none"
        } */
    },
    botonRemover: {
        background: "#00477F",
        "&:hover": {
            background: "#042E50",
        },
        color: "white",
    },
    card: {
        fontSize: "90%",
        fontFamily: "Roboto",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        backgroundColor: "white",
    },
    container: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "100%",
        fontFamily: "Roboto",
        fontWeight: "bold",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        backgroundColor: "#ECECEC",
    },

    input: {
        fontSize: "85%",
        fontFamily: "Roboto",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    popup: {
        height: "90%",
        width: "92%",
        backgroundColor: "#f3f3f3",
        border: "1px  #000",
        borderRadius: "15px",
    },
    medium: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
}));

const CardHorarioMedicion = ({ handleChangeHorario, cursos, setCursos, indexCurso, indexHorario, handleRemoveHorario }) => {
    const classes = useStyle();
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
            <div className="col-lg-3 col-md-3 col-sm-3 col-3" id="codigo">
                <TextField
                    className={`${classes.titulo}`}
                    fullWidth
                    value={cursos[indexCurso].horarios[indexHorario].horario}
                    /* name={`cursos[${indexCurso}].horarios[${indexHorario}].horario`} */
                    onChange={(e) => handleChangeHorario(e, indexCurso, indexHorario)}
                    style={{ textAlign: "center" }}
                    placeholder="Horario"
                />
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6 col-6 d-flex">
                <DarkerDisabledTextField
                    InputProps={{
                        className: classes.underline
                    }}  
                    fullWidth
                    value={cursos[indexCurso].horarios[indexHorario].profesor.nombreProfesor}
                    /* name={`cursos[${indexCurso}].horarios[${indexHorario}].profesor.nombreProfesor`} */
                    disabled={true}
                    style={{ textAlign: "center" }}
                    variant="standard"
                    placeholder="Buscar Profesor"
                />

                <IconButton
                    id="btnBuscar"
                    aria-label="SearchIcon"
                    disableFocusRipple
                    disableRipple
                    style={{ padding: "0px", margin: "0px" }}
                    onClick={handleOpen}
                >
                    <SearchIcon />
                </IconButton>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
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
                            <div className={classes.popup}>
                                <BuscarUsuariosSinRegister cursos={cursos} setCursos={setCursos} indexCurso={indexCurso} indexHorario={indexHorario} handleClose={handleClose} />
                            </div>
                        </div>
                    </Fade>
                </Modal>

            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3 text-center p-0">
                <div className="row justify-content-center">
                    <div className="col-12 p-0 justify-content-center">

                        <IconButton
                            id="btnRemover"
                            aria-label="RemoverIcon"
                            disableFocusRipple
                            disableRipple
                            style={{ padding: "0px", margin: "0px" }}
                            onClick={() => handleRemoveHorario(indexHorario)}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </div>

                    <div className="col-1 p-0"></div>
                </div>
            </div>
        </div>
    );
};

export default CardHorarioMedicion;
