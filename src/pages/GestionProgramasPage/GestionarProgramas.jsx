import React, { useEffect, useState } from "react";

import InputBusquedas from "../../components/ComunesComponents/InputBusquedas";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { Link } from "react-router-dom";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import Hidden from "@material-ui/core/Hidden";
import GestionarProgramasStyles from "./GestionarProgramasStyles";
import CardProgramas from "../../components/GestionProgramasComponents/CardProgramas";
import MenuFiltrosProgramas from "../../components/GestionProgramasComponents/MenuFiltrosProgramas";

import { useContext } from "react";
import ProgramaContext from "../../context/ProgramaContext/ProgramaContext";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import Footer from "../../components/PaginaComponents/Footer"

import instance from "../../instance";

const GestionarProgramas = () => {
    const classes = GestionarProgramasStyles();
    const [loading, setLoading] = useState(true);
    let current = instance.getItem('sasaGurudumu');
    let idFacultad = current.idFacultad;
    const NombreFacultad = current.nombreFacultad;
    const history = useHistory();
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem('sasaGurudumu'));
    const { programas, fetchProgramas, buscarProgramas } =
        useContext(ProgramaContext);
    const [searchTerm, setSearchTerm] = useState("");
    /*const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            buscarProgramas(idFacultad, e.target.value);
        }
    };*/
    useEffect(() => {
        loadUser();
        setRol(instance.getItem('sasaGurudumu'));
        fetchProgramas(idFacultad);
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading />;
    }
    const onChange = (criterio) => {
        buscarProgramas(idFacultad, criterio);
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

                <div className={`col ${classes.contenedor}`}>
                    <h3
                        style={{
                            fontWeight: "bold",
                            marginBottom: "2.5%",
                        }}
                        id="tituloPrograma"
                    >
                        {"Programas en " + NombreFacultad}
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
                                    placeHolder_Default="Buscar por Siglas o Nombre de Programa"
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
                                            "/gestionarProgramas/nuevoPrograma",
                                        state: {
                                            fidFacultad: idFacultad,
                                        },
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        id="buttonNuevo"
                                        endIcon={<AddIcon />}
                                    //onClick={}
                                    >
                                        Nuevo
                                            </Button>
                                </Link>
                            </div>
                        </div>

                        <MenuFiltrosProgramas />
                        <div className="h-100">
                            <div
                                className="p-0 overflow-auto" style={{ height: "500px" }}
                            >
                                {programas.filter((val) => {
                                    if (searchTerm === '') {
                                        return val
                                    }
                                    else if (
                                        val.siglas.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.apellidoPaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.apellidoMaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                }).map((programa) => {
                                    return (
                                        <CardProgramas
                                            key={programa.idPrograma}
                                            programa={programa}
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

export default GestionarProgramas;
