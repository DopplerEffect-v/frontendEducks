import React, { useState, useContext } from "react";
//MaterialUI core
import {
    Container,
    Typography,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormControl,
    IconButton,
    Button,
    Box,
    TextField,
    Input,
} from "@material-ui/core";
//MaterialUI icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
//React Buttons
import { GoogleLoginButton } from "react-social-login-buttons";

import { useToasts } from "react-toast-notifications";

import { useForm } from "react-hook-form";

import Logo from "../../assets/images/logo-pucp.png";

//Google login button
import { GoogleLogin } from "react-google-login";

//MaterialUI Styles
import LoginStyles from "./LoginStyles";

import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../context/AuthContext/AuthContext";
import instance from "../../instance";

function Login() {
    const classes = LoginStyles();
    const { addToast } = useToasts();
    const { roles, currentRol, loginUser, loadUser } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [showPassword, setshowPassword] = useState(false);
    const history = useHistory();
    const onSubmit = (data) => {
        console.log(data);
        localStorage.clear();
        loginUser(data).then((res) => {
            if (res) {
                addToast("Logueo Exitoso", {
                    appearance: "success",
                    autoDismiss: true,
                });
                loadUser().then((response) => {
                    let current = instance.getItem("sasaGurudumu");
                    console.log(current);
                    switch (current.idRol) {
                        case 1:
                            history.push("/gestionarProgramas");
                            break;
                        case 2:
                            history.push({
                                pathname: "/gestionarAsistentes",
                            });
                            break;
                        case 3:
                            history.push("/gestionarFacultades");
                            break;
                        case 4:
                            history.push("/");
                        case 5:
                            history.push("gestionarAsistentes");
                        default:
                            return history.push("/");
                    }
                });
            } else {
                addToast("El usuario no se encuentra en el sistema", {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        });
    };

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const responseSuccessGoogle = (response) => {
        console.log(response);

        //simulación de log-in
        if (response.profileObj.email === "renzo.bedrinana@pucp.edu.pe") {
            //Rol Administrador

            console.log("logueo exitoso");

            //history.push("/gestionarFacultades");

            //ask gerardo
        }
    };

    const responseErrorGoogle = (response) => {
        console.log(response);
    };

    return (
        <div className={classes.root}>
            <div className={classes.opacity}>
                <Container maxWidth="xs" className={classes.container}>
                    <div className={classes.card}>
                        <Typography
                            className={classes.typography}
                            style={{
                                fontSize: "23px",
                                color: "#07487D",
                                fontWeight: "500",
                            }}
                        >
                            Sistema de Acreditación
                        </Typography>
                        <div className={classes.logo}>
                            <img src={Logo} atl=" " style={{ width: "60%" }} />
                        </div>
                        <Typography
                            className={classes.typography}
                            style={{
                                fontSize: "23px",
                                color: "#474444",
                                fontWeight: "500",
                            }}
                        >
                            Inicio de Sesión
                        </Typography>
                        <Typography
                            className={classes.typography}
                            style={{
                                fontSize: "13px",
                                color: "#474444",
                                fontWeight: "500",
                            }}
                        >
                            ¡Bienvenido! Porfavor ingresa a tu cuenta.
                        </Typography>
                        <a href="http://54.162.5.155.nip.io:8000/login/google" style={{textDecoration:"none"}}> 
                        <GoogleLogin
                                style={{ height: "42px", marginTop: "15px" }}
                                clientId="140858909366-2jot89lmldqp03sg80tkg84q477mm54u.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <GoogleLoginButton
                                        style={{
                                            height: "42px",
                                            marginTop: "15px",
                                        }}
                                        disabled={renderProps.disabled}
                                    >
                                        <span
                                            style={{
                                                display: "flex",
                                                paddingLeft: "60px",
                                                fontFamily: "Roboto Slab",
                                                fontSize: 15,
                                                fontWeight: "400",
                                            }}
                                        >
                                            Iniciar Sesión con Google
                                        </span>
                                    </GoogleLoginButton>
                                )}
                                buttonText="Login"
                                onSuccess={responseSuccessGoogle}
                                onFailure={responseErrorGoogle}
                                cookiePolicy={"single_host_origin"}
                            />
                        </a>
                        <Typography
                            className={classes.typography}
                            style={{
                                fontSize: "13px",
                                color: "#474444",
                                fontWeight: "500",
                            }}
                        >
                            o ingresa con tu cuenta del sistema
                        </Typography>

                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                className={classes.form}
                            >
                                {/* <InputLabel>Correo Electrónico*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Correo Electrónico*"
                                    type="text"
                                    autoFocus
                                    inputRef={register}
                                />  */}
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Correo Electrónico*"
                                    type="text"
                                    inputRef={register}
                                 />
                            </FormControl>
                            <FormControl
                                className={classes.form}
                                style={{ marginTop: "15px" }}
                            >
                             {/*    <InputLabel>Contraseña*</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    fullWidth
                                    name="password"
                                    label="Contraseña*"
                                    type={showPassword ? "text" : "password"}
                                    inputRef={register}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                /> */}
                                <InputLabel htmlFor="standard-adornment-password">Contraseña*</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    inputRef={register}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Box className={classes.ref}>
                                <a style={{ color: "#474444" }} href="#">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </Box>

                            <Button
                                className={classes.btn}
                                style={{
                                    fontFamily: "Roboto Slab",
                                    fontWeight: "400",
                                }}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Iniciar Sesión
                            </Button>
                        </form>
                    </div>

                    <Box>
                        <div
                            className={classes.typography}
                            style={{
                                fontSize: "13px",
                                color: "#A1A1A1",
                                fontWeight: "300",
                            }}
                        >
                            Copyright &copy; Pontificia Universidad Católica del
                            Perú 2021.
                        </div>
                    </Box>
                </Container>
            </div>
        </div>
    );
}

export default Login;
