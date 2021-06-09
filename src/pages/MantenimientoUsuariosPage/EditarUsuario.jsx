import React, { useEffect, useState } from "react";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import MantenimientoUsuarioStyles from "./MantenimientoUsuarioStyles";
import Loading from "../Loading/Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputIcon from "@material-ui/icons/Input";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import perfilVacio from "../../assets/images/perfil-vacio.jpg";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ModalConfirmacionEditar from "./ModalConfirmacionEditar";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import UsuarioContext from "../../context/UsuarioContext/UsuarioContext";
import { useForm, FormProvider } from "react-hook-form";
import Footer from "../../components/PaginaComponents/Footer";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Typography } from "@material-ui/core";

import instance from "../../instance";

const EditarUsuario = (usuario) => {
    const { loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
    const history = useHistory();
    const classes = MantenimientoUsuarioStyles();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { fetchUsuarios, updateUsuario } = useContext(UsuarioContext);

    const methods = useForm({ mode: "onChange" });
    const { isDirty } = methods.formState;

    const onSubmit = (data) => {
        //console.log(data);
        updateUsuario(data).then(() => {
            fetchUsuarios();
            history.push("/");
            history.push("/gestionarUsuarios");
        });
    };

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        //console.log(usuario.usuario);
        methods.register("idUsuario");
        methods.setValue("idUsuario", usuario.usuario.idUsuario);
        methods.register("idPersona");
        methods.setValue("idPersona", usuario.usuario.idPersona);
        methods.register("correoElectronico");
        methods.setValue("correoElectronico", usuario.usuario.email);
        methods.register("codigo");
        methods.setValue("codigo", usuario.usuario.codigo);
        methods.register("nombres");
        methods.setValue("nombres", usuario.usuario.nombres);
        methods.register("apellidoPaterno");
        methods.setValue("apellidoPaterno", usuario.usuario.apellidoPaterno);
        methods.register("apellidoMaterno");
        methods.setValue("apellidoMaterno", usuario.usuario.apellidoMaterno);

        setLoading(false);
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

                <div className={`col ${classes.contenedor}`}>
                    <div className="row align-items-start">
                        <div className="col-4">
                            <Link
                                to="/gestionarUsuarios"
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

                    <h3 id="title" className="fw-bold mb-4">
                        Editar Usuario
                    </h3>
                    <FormProvider {...methods}>
                        <form>
                            <div
                                className={`row align-items-center mx-auto ${classes.contenedorFormulario}`}
                            >
                                <div className="col-md-3">
                                    <div>
                                        <Avatar
                                            className={`mx-auto ${classes.medium} mb-3`}
                                            src={perfilVacio}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <IconButton
                                            aria-label="ArrowBackIcon"
                                            disableRipple="false"
                                            disableFocusRipple="false"
                                        >
                                            <AddAPhotoIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="container col-md-9">
                                    <div className="row align-items-center p-1 mt-2">
                                        <div className="col-1">
                                            <AccountCircleIcon />
                                        </div>
                                        <div className="col-3">
                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Nombres
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            id="nombres"
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese Nombres"
                                            name="nombres"
                                            defaultValue={
                                                usuario.usuario.nombres
                                            }
                                            ref={methods.register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Por favor complete el nombre",
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message:
                                                        "Los nombres no pueden superar los 100 caracteres",
                                                },
                                                pattern: {
                                                    value: /^[\D]+[\D]+([\D]{0,})$/,
                                                    message:
                                                        "Ingrese solo letras, no números",
                                                },
                                            })}
                                            required
                                        />
                                        <span>
                                            {" "}
                                            <Typography
                                                variant="body2"
                                                color="error"
                                            >
                                                {
                                                    methods.errors?.nombres
                                                        ?.message
                                                }{" "}
                                            </Typography>
                                        </span>
                                    </div>

                                    <div className="row align-items-center p-1 mt-3">
                                        <div className="col-1">
                                            <AccountCircleIcon />
                                        </div>
                                        <div className="col-3">
                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Apellido Paterno
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            id="apellidoPaterno"
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese Apellido Paterno"
                                            name="apellidoPaterno"
                                            defaultValue={
                                                usuario.usuario.apellidoPaterno
                                            }
                                            ref={methods.register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Por favor complete el apellido paterno",
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message:
                                                        "El apellido paterno no puede superar los 100 caracteres.",
                                                },
                                                pattern: {
                                                    value: /^[\D]+[\D]+([\D]{0,})$/,
                                                    message:
                                                        "Ingrese solo letras, no números",
                                                },
                                            })}
                                            required
                                        />
                                        <span>
                                            {" "}
                                            <Typography
                                                variant="body2"
                                                color="error"
                                            >
                                                {
                                                    methods.errors
                                                        ?.apellidoPaterno
                                                        ?.message
                                                }{" "}
                                            </Typography>
                                        </span>
                                    </div>

                                    <div className="row align-items-center p-1 mt-3">
                                        <div className="col-1">
                                            <AccountCircleIcon />
                                        </div>
                                        <div className="col-6">
                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Apellido Materno
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            id="apellidoMaterno"
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese Apellidos"
                                            name="apellidoMaterno"
                                            defaultValue={
                                                usuario.usuario.apellidoMaterno
                                            }
                                            ref={methods.register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Por favor complete el apellido materno",
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message:
                                                        "El apellido materno no puede superar los 100 caracteres.",
                                                },
                                                pattern: {
                                                    value: /^[\D]+[\D]+([\D]{0,})$/,
                                                    message:
                                                        "Ingrese solo letras, no números",
                                                },
                                            })}
                                            name="apellidoMaterno"
                                            required
                                        />
                                        <span>
                                            {" "}
                                            <Typography
                                                variant="body2"
                                                color="error"
                                            >
                                                {
                                                    methods.errors
                                                        ?.apellidoMaterno
                                                        ?.message
                                                }{" "}
                                            </Typography>
                                        </span>
                                    </div>

                                    <div className="row align-items-center p-1 mt-3">
                                        <div className="col-1">
                                            <InputIcon />
                                        </div>
                                        <div className="col-3">
                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Código
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            id="codigo"
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese Código"
                                            name="codigo"
                                            defaultValue={
                                                usuario.usuario.codigo
                                            }
                                            ref={methods.register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Por favor complete el código",
                                                },
                                                maxLength: {
                                                    value: 8,
                                                    message:
                                                        "El código no puede superar los 8 caracteres.",
                                                },
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "El código debe ser de 8 caracteres",
                                                },
                                                pattern: {
                                                    value: /(^[A-Z0-9Ñ]{0,})+[A-Z0-9Ñ]+([A-Z0-9Ñ]{0,})$/,
                                                    message:
                                                        "Ingrese solo números o letras mayúsculas",
                                                },
                                            })}
                                            name="codigo"
                                            required
                                        />
                                        <span>
                                            {" "}
                                            <Typography
                                                variant="body2"
                                                color="error"
                                            >
                                                {
                                                    methods.errors?.codigo
                                                        ?.message
                                                }{" "}
                                            </Typography>
                                        </span>
                                    </div>

                                    <div className="row align-items-center p-1 mt-3">
                                        <div className="col-1">
                                            <MailIcon />
                                        </div>
                                        <div className="col-3">
                                            <label
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Correo
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <input
                                            id="correoElectronico"
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese Correo"
                                            name="correoElectronico"
                                            defaultValue={usuario.usuario.email}
                                            ref={methods.register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Por favor complete el correo",
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message:
                                                        "El correo no puede superar los 50 caracteres",
                                                },
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message:
                                                        "Por favor ingrese un correo válido",
                                                },
                                            })}
                                            required
                                        />
                                        {console.log(methods.errors)}
                                        <span>
                                            {" "}
                                            <Typography
                                                variant="body2"
                                                color="error"
                                            >
                                                {
                                                    methods.errors
                                                        ?.correoElectronico
                                                        ?.message
                                                }{" "}
                                            </Typography>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row mx-auto align-items-center mt-3">
                                <div className="col"></div>
                                <div className="col-sm-3 col-md-2 text-center">
                                    <Link
                                        to="/gestionarUsuarios"
                                        style={{
                                            textDecoration: "none",
                                        }}
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
                                <div className="col-sm-3 col-md-2 text-center">
                                    <Button
                                        className={classes.btn}
                                        id="btnGuardar"
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
                                <div className="col"></div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditarUsuario;
