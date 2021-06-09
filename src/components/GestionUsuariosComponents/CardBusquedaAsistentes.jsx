import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Perfil_Vacio from "../../assets/images/perfil-vacio.jpg";
import Button from "@material-ui/core/Button";
import { FETCH_ADDASISTENTES, FETCH_ASISTENTES } from "../../context/AsistentesContext/AsistentesTypes";

const useStyle = makeStyles((theme) => ({
    prueba: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "90%",
        fontFamily: "Roboto",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
    },
    botonSeleccionar: {
        background: "#00477F",
        "&:hover": {
            background: "#042E50",
        },
        color: "white",
    },
}));

const CardBusquedaAsistentes = ({ idCodigo,asistente, handleClose,fetchAsistentes,addAsistentes,idPrograma }) => {
    //const [image, setImage] = useState(`data:image/;base64,${Img}`);

    const classes = useStyle();

    return (
        <div
            className={`container-sm justify-content-start py-3 ${classes.prueba}`}
        >
            <div className="container row align-items-center px-4">
                <div className=" col-lg-4 col-md-4 col-sm-3 col-xs-3">
                    <div className="row d-flex align-items-center">
                        <div className="d-none d-md-none d-lg-block col-lg-3 p-0">
                            <Avatar
                                alt=""
                                src={asistente ? Perfil_Vacio : Perfil_Vacio}
                                className="p-0 m-0"
                            />
                        </div>
                        <div className="col-lg-9 col-md-6  col-sm-6 col-xs-6 p-0">
                            {asistente.nombrePersona +
                                " " +
                                asistente.apellidoPaterno +
                                " " +
                                asistente.apellidoMaterno}
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 d-none d-sm-none d-md-none d-lg-block d-sm-block">
                    <div>{asistente.codigo}</div>
                </div>
                <div className=" col-lg-4 col-md-6 col-sm-7 d-none d-sm-block">
                    <div>{asistente.email}</div>
                </div>

                <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2">
                    <Button
                        id={idCodigo}
                        variant="contained"
                        size="small"
                        className={classes.botonSeleccionar}
                        onClick={() => {
                            addAsistentes(asistente,idPrograma).then(()=>
                                {fetchAsistentes(idPrograma);}
                            )
                            handleClose();
                        }}
                    >
                        Seleccionar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CardBusquedaAsistentes;
