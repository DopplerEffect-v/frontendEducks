import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import perfilVacio from "../../assets/images/perfil-vacio.jpg";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputIcon from "@material-ui/icons/Input";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useForm, FormProvider } from "react-hook-form";
import UsuarioContext from "../../context/UsuarioContext/UsuarioContext";
import { TrendingUpTwoTone } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    medium: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
    btnCancelar: {
        background: "#928D8D",
        "&:hover": {
            background: "#686565",
        },
        color: "white",
    },
    btnRegistrar: {
        background: "#970000",
        "&:hover": {
            background: "#760303",
        },
        color: "white",
    },
}));

const RegistrarUsuarioSinRegister = ({ handleClose, setToggleFetch,cursos,setCursos,indexCurso,indexHorario}) => {
    const classes = useStyle();
    const { handleSubmit, register, errors } = useForm();
    const { addUsuario, fetchUsuarios } = useContext(UsuarioContext);
    const methods = useForm();

    const onSubmit = (data) => {
        console.log(data);
        addUsuario(data).then(() => {
            fetchUsuarios();
            setToggleFetch(true);
        });
    };

    return (
        <div>
           
            <form
                className="container-fluid form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="row align-items-center mb-5 pb-2">
                    <div className=" col-xs-12 col-sm-2">
                        <IconButton
                            aria-label="ArrowBackIcon"
                            onClick={() => {
                                setToggleFetch(true);
                            }}
                        >
                            <ArrowBackIcon
                                style={{
                                    color: "#00477F",
                                }}
                            />
                            <div style={{ fontSize: "20px" }}>Regresar</div>
                        </IconButton>
                    </div>
                    <div className=" col-xs-12 col-sm-8">
                        <h2
                            className="text-center col-lg-8 offset-lg-2 col-sm-8 offset-sm-2 col-xs-4"
                            style={{ fontWeight: "bold" }}
                        >
                            Registrar Usuario
                        </h2>
                    </div>
                </div>
                <div className="container row align-items-center">
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
                        {/* Primera Fila de  Inputs*/}
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="row align-items-center p-1">
                                    <div className="col-1">
                                        <AccountCircleIcon />
                                    </div>
                                    <div className="col-3">
                                        <label style={{ fontWeight: "bold" }}>
                                            Nombres
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese Nombres"
                                        name="nombres"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor complete el nombre"
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "Los nombres no pueden superar los 100 caracteres"
                                            },
                                            pattern: {
                                                value: /^([\D]{0,})+[\D]+([\D]{0,})$/,
                                                message: "Ingrese solo letras, no números"
                                            }
                                        })}
                                        /* required */
                                    />
                                    <span> <Typography variant='body2' color='error'>{errors?.nombres?.message} </Typography></span>
                                </div>
                            </div>
                        </div>
                        {/* Segunda fila de  Inputs*/}
                        <div className="row align-items-center mt-3">
                            <div className="col-md-6">
                                <div className="row align-items-center p-1">
                                    <div className="col-1">
                                        <AccountCircleIcon />
                                    </div>
                                    <div className="col-6">
                                        <label style={{ fontWeight: "bold" }}>
                                            Apellido Paterno
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese Apellido Paterno"
                                        name="apellidoPaterno"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor complete el apellido paterno"
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "El apellido paterno no puede superar los 100 caracteres."
                                            },
                                            pattern: {
                                                value: /^([\D]{0,})+[\D]+([\D]{0,})$/,
                                                message: "Ingrese solo letras, no números"
                                            }
                                        })}
                                        /* required */
                                    />
                                    <span> <Typography variant='body2' color='error'>{errors?.apellidoPaterno?.message} </Typography></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row align-items-center p-1">
                                    <div className="col-1">
                                        <AccountCircleIcon />
                                    </div>
                                    <div className="col-6">
                                        <label style={{ fontWeight: "bold" }}>
                                            Apellido Materno
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese Apellido Materno"
                                        name="apellidoMaterno"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor complete el apellido materno"
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "El apellido materno no puede superar los 100 caracteres."
                                            },
                                            pattern: {
                                                value: /^([\D]{0,})+[\D]+([\D]{0,})$/,
                                                message: "Ingrese solo letras, no números"
                                            }
                                        })}
                                        name="apellidoMaterno"
                                        /* required */
                                    />
                                    <span> <Typography variant='body2' color='error'>{errors?.apellidoMaterno?.message} </Typography></span>
                                </div>
                            </div>
                        </div>
                        {/* Tercera fila de  Inputs*/}
                        <div className="row align-items-center mt-3">
                            <div className="col-md-6">
                                <div className="row align-items-center p-1">
                                    <div className="col-1">
                                        <InputIcon />
                                    </div>
                                    <div className="col-3">
                                        <label style={{ fontWeight: "bold" }}>
                                            Código
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese Código"
                                        name="codigo"
                                        ref={register({
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
                                        /* required */
                                    />
                                    {console.log(methods, "modal")}
                                    <span> <Typography variant='body2' color='error'>{errors?.codigo?.message} </Typography></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row align-items-center p-1">
                                    <div className="col-1">
                                        <MailIcon />
                                    </div>
                                    <div className="col-3">
                                        <label style={{ fontWeight: "bold" }}>
                                            Correo
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese Correo"
                                        name="correoElectronico"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor complete el correo"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "El correo no puede superar los 50 caracteres"
                                            },
                                            pattern: {
                                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Por favor ingrese un correo válido"
                                            }
                                        })}
                                        /* required */
                                    />
                                    {console.log(errors, "errors")}
                                    <span> <Typography variant='body2' color='error'>{errors?.correoElectronico?.message} </Typography></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <Button
                        variant="contained"
                        size="small"
                        className={`${classes.btnCancelar} mx-3`}
                        endIcon={<CloseIcon />}
                        onClick={() => {
                            setToggleFetch(true);
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        className={`${classes.btnRegistrar} mx-3`}
                        endIcon={<CheckIcon />}
                        type="submit"
                    >
                        Registrar
                    </Button>
                </div>
            </form>
           
        </div>
    );
};

export default RegistrarUsuarioSinRegister;
