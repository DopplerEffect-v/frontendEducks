import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import MantenimientoObjetivoEducacionalStyles from "./MantenimientoObjetivoEducacionalStyles";
import Loading from "../Loading/Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalConfirmacionEditar from "./ModalConfirmacionEditar";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import ObjetivoEducacionalContext from "../../context/ObjetivoEducacionalContext/ObjetivoEducacionalContext";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import url from "../../config";
import Footer from "../../components/PaginaComponents/Footer";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Typography } from "@material-ui/core";

import instance from "../../instance";

const EditarObjetivoEducacional = ({ idObjetivo }) => {
    /*     let current=ls.get('sasaGurudumu');
        let idPrograma = current.idPrograma;
        let nombrePrograma = current.nombrePrograma; */
    const classes = MantenimientoObjetivoEducacionalStyles();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [objetivo, setObjetivo] = useState({});
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));

    const { updateObjetivoEducacional, fetchObjetivosEducacionales } =
        useContext(ObjetivoEducacionalContext);

    //context
    const methods = useForm({ mode: "onChange" });
    const { isDirty } = methods.formState;

    const onSubmit = (data) => {
        console.log(data);
        updateObjetivoEducacional(data).then(() => {
            fetchObjetivosEducacionales(objetivo.fidPrograma);
            history.push("/");
            history.push("/gestionarObjetivosEducacionales");
        });
    };

    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    var secureConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        const getObjetivo = async () => {
            try {
                await axios
                    .post(
                        `${url}/objetivoEducacional/mostrarObjetivoEducacional`,
                        {
                            idObjetivoEducacional: idObjetivo,
                        },
                        secureConfig
                    )
                    .then((res) => {
                        setObjetivo(res.data);
                        methods.register("idObjetivoEducacional");
                        methods.setValue("idObjetivoEducacional", idObjetivo);
                        setLoading(false);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        getObjetivo();
    }, []);

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="container-lg">
            <Header rol={rol} setRol={setRol} />
            <div className="row">
                <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                    <div className=" h-100" style={{ padding: "0%" }}>
                        <Navbar rol={rol} setRol={setRol} />
                    </div>
                </div>
                <FormProvider {...methods}>
                    <div
                        className={`col ${classes.contenedor}`}
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="row align-items-start">
                            <div className="col-4">
                                <Link
                                    to="/gestionarObjetivosEducacionales"
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

                        <h3
                            id="title"
                            style={{
                                fontWeight: "bold",
                                marginBottom: "1%",
                            }}
                        >
                            Editar {objetivo.codigo}
                        </h3>

                        <h4 style={{ marginBottom: "2.5%" }}>
                            {objetivo.programa}
                        </h4>

                        <div className={`${classes.contenedorFormulario}`}>
                            <div className="row align-items-center px-1">
                                <label
                                    className="col-1 me-2"
                                    style={{ fontWeight: "bold" }}
                                >
                                    {" "}
                                    Código{" "}
                                </label>
                                <input
                                    id="codigo"
                                    name="codigo"
                                    className="col-4 m-0"
                                    placeholder=" Ingrese Código"
                                    ref={methods.register({
                                        required: {
                                            value: true,
                                            message:
                                                "Por favor complete el código",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message:
                                                "El código no puede superar los 10 caracteres",
                                        },
                                    })}
                                    style={{
                                        backgroundColor: "white",
                                        width: "15%",
                                        color: "black",
                                        resize: "none",
                                        marginBottom: "10px",
                                    }}
                                    defaultValue={objetivo.codigo}
                                    maxLength="100"
                                ></input>
                            </div>
                            <div className="mt-2">
                                <span>
                                    {" "}
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        id="errorCodigo"
                                    >
                                        {methods.errors?.codigo?.message}{" "}
                                    </Typography>
                                </span>
                            </div>
                            <div className="row align-items-center pb-3">
                                <div className="col">
                                    <label
                                        className="p-1"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {" "}
                                        Sumilla{" "}
                                    </label>
                                    <textarea
                                        id="sumilla"
                                        name="sumilla"
                                        ref={methods.register({
                                            required: {
                                                value: true,
                                                message:
                                                    "Por favor complete la sumilla",
                                            },
                                            maxLength: {
                                                value: 100,
                                                message:
                                                    "La sumilla no puede superar los 100 caracteres",
                                            },
                                        })}
                                        style={{
                                            backgroundColor: "white",
                                            width: "100%",
                                            maxHeight: "70px",
                                            color: "black",
                                            resize: "none",
                                            marginBottom: "10px",
                                        }}
                                        maxlength="50"
                                    >
                                        {objetivo.sumilla}
                                    </textarea>
                                    <span>
                                        {" "}
                                        <Typography
                                            variant="body2"
                                            color="error"
                                        >
                                            {methods.errors?.sumilla?.message}{" "}
                                        </Typography>
                                    </span>
                                </div>
                            </div>
                            <label
                                className="p-1"
                                style={{ fontWeight: "bold" }}
                            >
                                {" "}
                                Descripción{" "}
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                ref={methods.register({
                                    required: {
                                        value: true,
                                        message:
                                            "Por favor complete la descripción",
                                    },
                                    maxLength: {
                                        value: 1000,
                                        message:
                                            "La descripción no puede superar los 1000 caracteres",
                                    },
                                })}
                                style={{
                                    backgroundColor: "white",
                                    width: "100%",
                                    minHeight: "150px",
                                    maxHeight: "300px",
                                    color: "black",
                                    resize: "none",
                                    marginBottom: "10px",
                                }}
                            >
                                {objetivo.descripcion}
                            </textarea>
                            <span>
                                {" "}
                                <Typography variant="body2" color="error">
                                    {methods.errors?.descripcion?.message}{" "}
                                </Typography>
                            </span>
                            <label
                                className="p-1"
                                style={{ fontWeight: "bold" }}
                            >
                                {" "}
                                Comentarios Adicionales{" "}
                            </label>
                            <textarea
                                name="comentarios"
                                ref={methods.register({
                                    maxLength: {
                                        value: 500,
                                        message:
                                            "Los comentarios no pueden superar los 500 caracteres",
                                    },
                                })}
                                style={{
                                    backgroundColor: "white",
                                    width: "100%",
                                    minHeight: "100px",
                                    maxHeight: "300px",
                                    color: "black",
                                    resize: "none",
                                }}
                            >
                                {objetivo.comentarios}
                            </textarea>
                            <span>
                                {" "}
                                <Typography variant="body2" color="error">
                                    {methods.errors?.comentarios?.message}{" "}
                                </Typography>
                            </span>
                        </div>

                        <div className="row justify-content-center mt-5">
                            <div className="col-sm-4 col-md-3 col-lg-2">
                                <Link
                                    to="/gestionarObjetivosEducacionales"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        size="small"
                                        color="info"
                                        endIcon={<ClearIcon />}
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
                            </div>
                            <div className="col-sm-4 col-md-3 col-lg-2">
                                <Button
                                    id="btnGuardar"
                                    className={classes.btn}
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    endIcon={<CheckIcon />}
                                    disabled={!isDirty}
                                    onClick={() => {
                                        methods.trigger().then(() => {
                                            if (
                                                Object.keys(
                                                    methods.formState.errors
                                                ).length == 0
                                            ) {
                                                console.log(
                                                    methods.formState.errors
                                                );
                                                handleOpen();
                                            }
                                        });
                                    }}
                                >
                                    Guardar
                                </Button>

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
                                                <ModalConfirmacionEditar
                                                    handleClose={handleClose}
                                                />
                                            </div>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </FormProvider>
            </div>
            <Footer />
        </div>
    );
};

export default EditarObjetivoEducacional;
