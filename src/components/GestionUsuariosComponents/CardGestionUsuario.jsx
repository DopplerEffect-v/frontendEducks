import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Perfil_Vacio from "../../assets/images/perfil-vacio.jpg";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalConfirmacionDesactivar from "../../pages/GestionUsuariosPage/ModalConfirmacionDesactivar";
import { useContext } from "react";
import UsuarioContext from "../../context/UsuarioContext/UsuarioContext";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    prueba: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "90%",
        fontFamily: "Roboto",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        backgroundColor: "white",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    popup: {
        width: "60%",
        maxWidth: "700px",
        backgroundColor: "#f3f3f3",
        border: "1px  #000",
        borderRadius: "15px",
    },
    btn: {
        height: "100%",
        width: "auto",
        fontWeight: "bolder",
        fontFamily: theme.typography.fontFamily.roboto,
    },
}));

const CardGestionUsuario = ({ usuario }) => {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const methods = useForm();

    const { fetchUsuarios, cambiarEstadoUsuario } = useContext(UsuarioContext);

    const onSubmit = (data) => {
        //console.log(data);
        cambiarEstadoUsuario(data).then(() => {
            fetchUsuarios();
            /* history.push("/");
            history.push("/gestionarUsuarios"); */
        });
    };

    useEffect(() => {
        methods.register("idUsuario");
        methods.setValue("idUsuario", usuario.idUsuario);
        //console.log(methods.getValues().bloqueado);
    }, []);

    return (
        <div
            className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.prueba}`}
        >
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-auto">
                <div className="row align-items-center">
                    <div className="d-none d-md-none d-lg-block col-lg-4 pl-1">
                        <Avatar
                            alt=""
                            src={usuario ? Perfil_Vacio : Perfil_Vacio}
                            className="p-0 m-0"
                        />
                    </div>
                    <div className="col-lg-8 col-md pl-1">
                        {usuario.nombres +
                            " " +
                            usuario.apellidoPaterno +
                            " " +
                            usuario.apellidoMaterno}
                    </div>
                </div>
            </div>
            <div
                id="codigo"
                className="col-lg-3 col-md-2 d-md-block d-lg-block d-none d-sm-none "
            >
                {usuario.codigo}
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 d-none d-sm-block text-truncate">
                {usuario.email}
            </div>
            <div className="col-md-1 col-sm-2 ">
                <div className="row justify-content-center text-center">
                    <div className="col-6 p-0 justify-content-center">
                        <Link
                            to={{
                                pathname: "/gestionarUsuarios/EditarUsuario",
                                state: {
                                    usuario: usuario,
                                },
                            }}
                        >
                            <IconButton
                                id="btnEditar"
                                aria-label="EditIcon"
                                disableFocusRipple
                                disableRipple
                                style={{ padding: "0px", margin: "0px" }}
                                /* onClick={() => {
                                
                                });
                            }} */
                            >
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <div className="col-6 p-0 justify-content-center">
                        {!usuario.bloqueado ? (
                            <IconButton
                                aria-label="LockIcon"
                                disableFocusRipple
                                disableRipple
                                style={{ padding: "0px", margin: "0px" }}
                                onClick={() => {
                                    handleOpen();
                                }}
                            >
                                <LockIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                aria-label="LockOpenIcon"
                                disableFocusRipple
                                disableRipple
                                style={{ padding: "0px", margin: "0px" }}
                                onClick={() => {
                                    handleOpen();
                                }}
                            >
                                <LockOpenIcon />
                            </IconButton>
                        )}
                    </div>
                </div>
                <FormProvider {...methods}>
                    <form>
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
                                        <ModalConfirmacionDesactivar
                                            handleClose={handleClose}
                                            onSubmit={onSubmit}
                                            bloqueado={usuario.bloqueado}
                                        />
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default CardGestionUsuario;
