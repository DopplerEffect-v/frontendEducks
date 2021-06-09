import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Perfil_Vacio from "../../assets/images/perfil-vacio.jpg";

const useStyle = makeStyles((theme) => ({
    botonRemover: {
        background: "#00477F",
        "&:hover": {
            background: "#042E50",
        },
        color: "white",
    },

    medium: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    card: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "90%",
        fontFamily: "Roboto",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        backgroundColor: "white",
    },
}));

const CardAsistentes = ({
    asistente,
    Img,
    deleteAsistentes,
    fetchAsistentes,
    idPrograma,
}) => {
    const classes = useStyle();
    const [image, setImage] = useState(`data:image/;base64,${Img}`);

    return (
        <div
            className={`container-fluid my-2 row py-2 px-0 mx-auto align-items-center ${classes.card}`}
        >
            <div className=" col-lg-5 col-md-5 col-sm-5 col-xs-11">
                <div className="row d-flex align-items-center">
                    <div className="col-lg-3 d-md-none d-sm-none d-none d-lg-block">
                        <Avatar
                            alt=""
                            src={Img ? image : Perfil_Vacio}
                            className={`mx-auto ${classes.medium}`}
                        />
                    </div>
                    <div 
                        id="nombre"
                        className="col-lg-9 col-xs"
                    >
                        {asistente.nombrePersona +
                            " " +
                            asistente.apellidoPaterno +
                            " " +
                            asistente.apellidoMaterno}
                    </div>
                </div>
            </div>
            <div className="col-lg-2 d-none d-sm-none d-md-none d-lg-block">
                {asistente.codigo}
            </div>
            <div className=" col-lg-4 col-md-5 col-sm-5 col-xs-4 d-none d-sm-block">
                {asistente.email}
            </div>
            <div className="col-lg-1 col-md-2 col-sm-2 col-xs align-items-center">
                <IconButton
                    id="btnDelete"
                    aria-label="EditIcon"
                    disableFocusRipple
                    disableRipple
                    style={{ padding: "0px" }}
                    onClick={() => {
                        deleteAsistentes(asistente, idPrograma).then(() => {
                            fetchAsistentes(idPrograma);
                        });
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CardAsistentes;
