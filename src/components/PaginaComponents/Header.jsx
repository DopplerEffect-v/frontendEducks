import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import logoPucp from "../../assets/images/logo.png";
import { Icon } from "@iconify/react";
import logoutBoxLine from "@iconify/icons-ri/logout-box-line";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuIcon from "@material-ui/icons/Menu";
import NavbarHidden from "../PaginaComponents/NavBarHidden";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

import instance from "../../instance";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: "90%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        background: "#00477F",
        color: "white",
        fontFamily: "Roboto",
        minHeight: "125px",
    },
    combo: {
        color: "white",
    },
    root: {
        background: "#00477F",
        color: "white",
    },
    whiteColor: {
        color: "white",
    },
}));

const Header = ({ rol, setRol }) => {
    
    const classes = useStyles();
    const [abrirMenu, setAbrirMenu] = useState(false);
    var { roles, currentRol, loadUser, isAuth, updateCurrentRol } =
        useContext(AuthContext);
    const history = useHistory();
    const accionAbrirMenu = () => {
        setAbrirMenu(!abrirMenu);
    };

    return (
        <div className={`row align-items-center ${classes.container}`}>
            <div className="d-xxl-none d-xl-none d-lg-none">
                <NavbarHidden
                    rol={rol}
                    setRol={setRol}
                    variant="temporary"
                    open={abrirMenu}
                    onClose={accionAbrirMenu}
                />
            </div>

            <div className="d-xxl-none d-xl-none d-lg-none col-1 pe-0">
                <div className="">
                    <IconButton
                        aria-MenuIcon="MenuIcon"
                        disableFocusRipple
                        disableRipple
                        style={{ padding: "0px" }}
                    >
                        <MenuIcon
                            onClick={() => accionAbrirMenu()}
                            style={{ color: "white", fontSize: "150%" }}
                        />
                    </IconButton>
                </div>
            </div>
            <div className="col-8" style={{ paddingLeft: "2%" }}>
                <div className="col-9" style={{ marginBottom: "0px" }}>
                    <h2>Sistema de Acreditación PUCP</h2>
                </div>
                <div
                    className="row align-items-center"
                    style={{ paddingLeft: "0%", fontSize: "90%" }}
                >
                    {/* <div className='col-3' style={{ paddingRight: '0%' }}>
                        Juan Francisco Rosales Kam
                    </div> */}

                    <div className="col-6">
                        <FormControl
                            className={classes.formControl}
                            style={{ margin: "0%", color: "white" }}
                        >
                            <Select
                                classes={{
                                    root: classes.root,
                                    icon: classes.whiteColor,
                                }}
                                labelId=""
                                id="comboBoxRoles"
                                autoWidth
                                value={rol.nombre}
                            >
                                {roles.map((item) => {
                                    return (
                                        <MenuItem
                                            id={item.idRol}
                                            key={item.idRol}
                                            value={item.nombre}
                                            onClick={() => {
                                                instance.setItem("sasaGurudumu", item);
                                                console.log(
                                                    instance.getItem("sasaGurudumu")
                                                );
                                                setRol(item);
                                                switch (item.idRol) {
                                                    case 1:
                                                        history.push(
                                                            "/gestionarProgramas"
                                                        );
                                                        break;
                                                    case 2:
                                                        history.push(
                                                            "/gestionarObjetivosEducacionales"
                                                        );
                                                        break;
                                                    case 3:
                                                        history.push(
                                                            "/gestionarUsuarios"
                                                        );
                                                        break;
                                                    case 4:
                                                        history.push("/");
                                                        break;
                                                    case 5:
                                                        history.push(
                                                            "/gestionarAsistentes"
                                                        );
                                                        break;
                                                    default:
                                                        history.push("/");
                                                }
                                            }}
                                        >
                                            {item.nombre}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
            <div
                className="row d-flex flex-row align-items-center justify-content-end col"
                style={{ height: "100%" }}
            >
                <div className="col-auto" style={{ textAlign: "right" }}>
                    <Link
                        to="/"
                        style={{ textDecoration: "none" }}
                        onClick={() => window.localStorage.clear()}
                    >
                        <IconButton
                            aria-label="delete"
                            style={{ fontSize: "200%" }}
                        >
                            <Icon
                                icon={logoutBoxLine}
                                style={{ color: "#FFFFFF" }}
                            />
                        </IconButton>
                    </Link>
                </div>
                <div className="col-8 d-xxl-block d-xl-block d-lg-block d-sm-none d-none">
                    <img
                        className="img-fluid"
                        src={logoPucp}
                        width="95%"
                        height="95%"
                    ></img>
                </div>
            </div>
        </div>
    );
};

export default Header;
