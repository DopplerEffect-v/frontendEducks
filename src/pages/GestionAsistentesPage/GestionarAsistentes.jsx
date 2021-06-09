import React, { useEffect, useState } from "react";
import CardAsistentes from "../../components/GestionAsistentesComponents/CardAsistentes";
import MenuFiltrosAsistentes from "../../components/GestionAsistentesComponents/MenuFiltrosAsistentes";
import Input_Busquedas from "../../components/ComunesComponents/InputBusquedas";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarAsistentesStyles from "./GestionarAsistentesStyles";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import AsistentesContext from "../../context/AsistentesContext/AsistentesContext";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import BuscarAsistentes from "../../components/GestionUsuariosComponents/BuscarAsistentes";
import Loading from "../Loading/Loading";
import Footer from "../../components/PaginaComponents/Footer";
import { useHistory } from "react-router-dom";
import instance from "../../instance";

const GestionarAsistentes = () => {
    let current = instance.getItem("sasaGurudumu");
    let idPrograma = current.idPrograma;
    let nombrePrograma = current.nombrePrograma;
    const classes = GestionarAsistentesStyles();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const { currentRol, loadUser } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
    const { asistentes, fetchAsistentes, buscarAsistentes, deleteAsistentes } =
        useContext(AsistentesContext);

    const onChange = (criterio) => {
        buscarAsistentes(idPrograma, criterio);
    };
    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    /* const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log(idPrograma);
            buscarAsistentes(idPrograma, e.target.value);
        }
    }; */

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        fetchAsistentes(idPrograma);
        setLoading(false);
    }, []);
    if (loading) {
        console.log(asistentes);
        return <Loading />;
    }
    return (
        <div className="container-lg">
            <Header rol={rol} setRol={setRol} />
            <div className="row">
                <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                    <div className=" h-100">
                        <Navbar rol={rol} setRol={setRol} />
                    </div>
                </div>
                <div className={`col ${classes.contenedor}`}>
                    <h3
                        id="tituloPagina"
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Gestionar Asistentes
                            </h3>
                    <h4 style={{ marginBottom: "2.5%" }}>
                        {nombrePrograma}
                    </h4>

                    <div className={`${classes.listado}`}>
                        <div
                            className="row d-flex align-items-center mb-3"
                            style={{ maxWidth: "100%", margin: "0%" }}
                        >
                            <div
                                className="col-8"
                                style={{ padding: "0%" }}
                            >
                                <Input_Busquedas
                                    placeHolder_Default="Buscar por Codigo o Nombre"
                                    onChange={onChange}
                                />
                            </div>
                            <div className="col-2 offset-2 d-flex justify-content-end p-0">
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    id="buttonNuevo"
                                    endIcon={<AddIcon />}
                                    onClick={() => {
                                        handleOpen();
                                    }}
                                >
                                    Nuevo
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
                                                <BuscarAsistentes
                                                    handleClose={
                                                        handleClose
                                                    }
                                                    idPrograma={
                                                        idPrograma
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        </div>

                        <MenuFiltrosAsistentes />
                        <div className="h-100">
                            <div
                                className="p-0 overflow-auto"
                                style={{ height: "480px" }}
                            >

                                {asistentes.filter((val) => {
                                    if (searchTerm === '') {
                                        return val
                                    }
                                    else if (
                                        val.nombrePersona.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.apellidoPaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.apellidoMaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.codigo.toLowerCase().includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                }).map((asistente) => {
                                    return (
                                        <CardAsistentes
                                            key={asistente.idUsuario}
                                            asistente={asistente}
                                            deleteAsistentes={
                                                deleteAsistentes
                                            }
                                            fetchAsistentes={
                                                fetchAsistentes
                                            }
                                            idPrograma={idPrograma}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default GestionarAsistentes;
