import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import Perfil_Vacio from "../../assets/images/perfil-vacio.jpg";

const useStyle = makeStyles((theme) => ({
    container: {
        fontFamily: "Roboto",
        backgroundColor: "white",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
    },

    medium: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

const CardFacultades = ({ facultad }) => {
    const classes = useStyle();
    return (
        <div
            className={`container-fluid my-2 row py-2 px-0 mx-auto align-items-center ${classes.container}`}
        >
            <div className=" col-lg-1 col-md-2 col-sm-2 col-xs-2 ps-1">
                {facultad.siglas}
            </div>
            <div className=" col-lg-3 col-md-4 col-sm-8 col-xs-8 ps-3 pe-1">
                {facultad.nombreFacultad}
            </div>
            <div className=" d-none d-sm-none d-md-none d-lg-block col-lg-4">
                <div className=" row align-items-center p-1">
                    <div className="col-lg-3 ps-0">
                        <Avatar
                            alt=""
                            src={facultad.img ? Perfil_Vacio : Perfil_Vacio}
                            className={classes.medium}
                        />
                    </div>
                    <div className="col-lg-9">
                        {facultad.nombrePersona +
                            " " +
                            facultad.apellidoPaterno +
                            " " +
                            facultad.apellidoMaterno}
                    </div>
                </div>
            </div>
            <div className=" d-sm-none d-none d-md-block d-lg-block col-lg-3 col-md-4 text-truncate pe-0">
                {facultad.correoElectronico}
            </div>

            <div className="d-flex justify-content-end col-lg-1 col-md-2 col-sm-2 col-xs-2">
                <Link
                    to={{
                        pathname: "/gestionarFacultades/editarFacultad",
                        state: {
                            idFacultad: facultad.idFacultad,
                            idCd: facultad.fidCoordinadorAcredFacultad,
                            facultad: facultad,
                        },
                    }}
                >
                    <IconButton
                        id="buttonEditar"
                        aria-label="EditIcon"
                        disableFocusRipple
                        disableRipple
                        style={{ padding: "0px" }}
                    >
                        <EditIcon />
                    </IconButton>
                </Link>
            </div>
        </div>
    );
};

export default CardFacultades;
