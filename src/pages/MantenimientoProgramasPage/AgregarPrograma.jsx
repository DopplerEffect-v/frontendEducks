import React, { useEffect, useState } from "react";
import ProgramaForm from "../../components/GestionProgramasComponents/ProgramaForm";
import ProgramaResponsable from "../../components/GestionProgramasComponents/ProgramaResponsable";
import {
    makeStyles,
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import Hidden from "@material-ui/core/Hidden";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalConfirmacionRegistroPrograma from "./ModalConfirmacionRegistroPrograma";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import ProgramaContext from "../../context/ProgramaContext/ProgramaContext";
import Loading from "../Loading/Loading";
import AuthContext from "../../context/AuthContext/AuthContext";
import Footer from "../../components/PaginaComponents/Footer"
import { useForm, FormProvider } from "react-hook-form";
import MantenimientoProgramaStyles from "./MantenimientoProgramaStyles";

import instance from "../../instance";

const temaBoton = createMuiTheme({
    //SOBRE ESCRIBIR
    palette: {
        primary: {
            main: "#970000",
        },
        secondary: {
            main: "#928D8D",
        },
    },
    typography: {
        button: {
            textTransform: "none",
        },
    },
});

function AgregarPrograma() {
    
    const classes = MantenimientoProgramaStyles();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem('sasaGurudumu'));
    let current = instance.getItem('sasaGurudumu')
    let idFacultad = current.idFacultad;
    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { programa, addPrograma, cleanPrograma, fetchProgramas } =
        useContext(ProgramaContext);

    const methods = useForm(
        { mode: "onChange" }
    );
    const { isDirty } = methods.formState;

    const onSubmit = (data) => {
        console.log(data);
        addPrograma(data).then(() => {
            fetchProgramas(idFacultad);
            history.push("/");
            history.push("/gestionarProgramas");
        });
    };
    useEffect(() => {
        cleanPrograma();
        loadUser();
        setRol(instance.getItem('sasaGurudumu'));
        methods.register("fidFacultad");
        methods.setValue("fidFacultad", idFacultad);
        methods.register("fidResponsablePrograma");
        methods.setValue("fidResponsablePrograma", true);
        methods.register("nombreResponsable");
        methods.setValue("nombreResponsable", " ");
        methods.register("siglas");
        methods.setValue("siglas", "");
        methods.register("nombre");
        methods.setValue("nombre", "");
        methods.register("correoElectronico");
        methods.setValue("correoElectronico", "");

        console.log(methods.getValues());
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (

        <div className="container-lg">
            <Header rol={rol} setRol={setRol} />
            <div
                className="row"
            >
                <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                    <div
                        className=" h-100"
                        style={{ padding: "0%" }}
                    >
                        <Navbar rol={rol} setRol={setRol} />
                    </div>
                </div>

                <div className={`col ${classes.contenedor}`} style={{ minHeight: "800px" }}>
                    <div className="row align-items-start">
                        <div className="col-4">
                            <Link
                                to="/gestionarProgramas"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <IconButton aria-label="ArrowBackIcon">
                                            <ArrowBackIcon
                                                style={{
                                                    color: "#00477F",
                                                }}
                                            />
                                        </IconButton>
                                    </div>
                                    <label
                                        className="col"
                                        style={{
                                            paddingLeft: "2%",
                                            color: "#00477F",
                                        }}
                                    >
                                        Regresar
                                            </label>
                                </div>
                            </Link>
                        </div>
                        <div className="col"></div>
                    </div>

                    <h3 style={{ fontWeight: "bold" }}>
                        Nuevo Programa
                            </h3>
                    <FormProvider {...methods}>
                        <form
                            className="container  h-50 p-0 mt-4"

                        >
                            <div className="row">
                                <div className="col-7">
                                    <ProgramaForm
                                        programa={programa}

                                    />
                                </div>

                                <div className="col-5">
                                    <ProgramaResponsable
                                        programa={programa}
                                    />
                                </div>
                            </div>

                            <div className="row justify-content-center mt-5">
                                <div className="col-sm-4 col-md-3 col-lg-2">
                                    <Link
                                        to="/gestionarProgramas"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <ThemeProvider theme={temaBoton}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="secondary"
                                                endIcon={<ClearIcon />}
                                            >
                                                Cancelar
                                                </Button>
                                        </ThemeProvider>
                                    </Link>
                                </div>
                                <div className="col-sm-4 col-md-3 col-lg-2">
                                    <ThemeProvider theme={temaBoton}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            endIcon={<CheckIcon />}
                                            id="buttonGuardar"
                                            disabled={!isDirty}
                                            onClick={() => {

                                                methods.trigger().then(() => {

                                                    if (Object.keys(methods.formState.errors).length == 0) {
                                                        console.log(methods.formState.errors)
                                                        handleOpen()
                                                    }
                                                });

                                            }}
                                        >
                                            Guardar
                                            </Button>
                                    </ThemeProvider>
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
                                                <div
                                                    className={`h-auto pb-5 ${classes.popup}`}
                                                >
                                                    <ModalConfirmacionRegistroPrograma
                                                        handleClose={
                                                            handleClose
                                                        }
                                                        onSubmit={onSubmit}
                                                    />
                                                </div>
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
            <Footer />
        </div>

    );
}
export default AgregarPrograma;
