import React, { useEffect, useState } from "react";
import CardFacultades from "../../components/GestionFacultadesComponents/CardFacultades";
import MenuFiltrosFacultades from "../../components/GestionFacultadesComponents/MenuFiltrosFacultades";
import InputBusquedas from "../../components/ComunesComponents/InputBusquedas";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Footer from "../../components/PaginaComponents/Footer"
import { Link } from "react-router-dom";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarFacultadesStyles from "./GestionarFacultadesStyles";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import FacultadContext from "../../context/FacultadContext/FacultadContext";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import instance from "../../instance";

const GestionarFacultades = () => {
    
    const classes = GestionarFacultadesStyles();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem('sasaGurudumu'));
    const { facultades, fetchFacultades, buscarFacultades } =
        useContext(FacultadContext);
    const [searchTerm, setSearchTerm] = useState("");
    /*const handleKeyPress = (e) => {
        if (e.onChange()) {
            buscarFacultades(e.target.value);
        }
    };*/
    
    useEffect(() => {
        loadUser();
        setRol(instance.getItem('sasaGurudumu'));
        fetchFacultades();
        setLoading(false);
    }, []);

    if (loading) {
        console.log(facultades);
        return <Loading />;
    }
    const onChange = (criterio) => {
        buscarFacultades(criterio);
    };

    return (

        <div className="container-lg">
            <Header rol={rol} setRol={setRol} />
            <div
                className="row"
            >
                <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                    <div
                        className=" h-100"
                        style={{ padding: "0%" }}
                    >
                        <Navbar rol={rol} setRol={setRol} />
                    </div>
                </div>

                <div className={`col ${classes.contenedor}`} style={{ minHeight: "800px" }}>
                    <h3
                        style={{
                            fontWeight: "bold",
                            marginBottom: "2.5%",
                        }}
                    >
                        Facultades PUCP
                            </h3>

                    <div className={`${classes.listado}`}>
                        <div
                            className="row d-flex align-items-center mb-3"
                            style={{
                                maxWidth: "100%",
                                margin: "0%",
                            }}
                        >
                            <div
                                className="col-8"
                                style={{ padding: "0%" }}
                            >
                                <InputBusquedas
                                    placeHolder_Default="Buscar por Siglas o Nombre de Facultad"
                                    //handleKeyPress={handleKeyPress} 
                                    onChange={onChange}
                                />
                            </div>
                            <div
                                className="col-2 offset-2 d-flex justify-content-end"
                                style={{ padding: "0%" }}
                            >
                                <Link
                                    to={{
                                        pathname:
                                            "/gestionarFacultades/nuevaFacultad",
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        id="buttonNuevo"
                                        className={classes.btn}
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        endIcon={<AddIcon />}
                                    //onClick={}
                                    >
                                        Nuevo
                                            </Button>
                                </Link>
                            </div>
                        </div>

                        <MenuFiltrosFacultades />
                        <div className="h-100">
                            <div
                                className="p-0 overflow-auto" style={{ height: "500px" }}
                            >
                                {facultades.filter((val) => {
                                    if (searchTerm === '') {
                                        return val
                                    }
                                    else if (
                                        val.nombreFacultad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.nombrePersona.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.apellidoPaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.apellidoMaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.siglas.toLowerCase().includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                }).map((facultad) => {
                                    return (
                                        <CardFacultades
                                            key={facultad.idFacultad}
                                            facultad={facultad}
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

export default GestionarFacultades;
