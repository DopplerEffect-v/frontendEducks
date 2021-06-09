import React, { useEffect, useState } from "react";
import CardResultadoEstudiante from "../../components/GestionResultadoEstudianteComponents/CardResultadoEstudiante";
import MenuFiltrosResultadosEstudiante from "../../components/GestionResultadoEstudianteComponents/MenuFiltrosResultadosEstudiante";
import Input_Busquedas from "../../components/ComunesComponents/InputBusquedas";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarResultadosEstudianteStyles from "./GestionarResultadosEstudianteStyles";
import Loading from "../Loading/Loading";
import Footer from "../../components/PaginaComponents/Footer"
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import resultado from "../../mockObjects/ResultadoEstudiante/mockResultado";
import ResultadoEstudianteContext from "../../context/ResultadoEstudianteContext/ResultadoEstudianteContext";

import instance from "../../instance";

const GestionarResultadosEstudiante = () => {
    const classes = GestionarResultadosEstudianteStyles();
    const [loading, setLoading] = useState(true);
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
    const { resultadosEstudiante, fetchResultadosEstudiante } = useContext(
        ResultadoEstudianteContext
    );
    let current = instance.getItem("sasaGurudumu");
    let idPrograma = current.idPrograma;
    let nombrePrograma = current.nombrePrograma;

    const onChange = (criterio) => {
        fetchResultadosEstudiante(idPrograma, criterio);
    };

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        fetchResultadosEstudiante(idPrograma);
        setLoading(false);
    }, []);

    return (

        <div className="container-lg">
            <Header rol={rol} setRol={setRol} />
            <div
                className="row"
            >
                <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                    <div className=" h-100" style={{ padding: "0%" }}>
                        <Navbar rol={rol} setRol={setRol} />
                    </div>
                </div>

                <div className={`col ${classes.contenedor}`} style={{ minHeight: "800px" }}>
                    <h3
                        id="tituloResultadosEstudiante"
                        style={{
                            fontWeight: "bold",
                            marginBottom: "2%",
                        }}
                    >
                        Resultados del Estudiante
                    </h3>
                    <h4 style={{ marginBottom: "2.5%" }}>
                        {nombrePrograma}
                    </h4>

                    <div className={`${classes.listado}`}>
                        <div
                            className="row d-flex align-items-center mb-3"
                            style={{ maxWidth: "100%", margin: "0%" }}
                        >
                            <div className="col-8 p-0">
                                <Input_Busquedas
                                    placeHolder_Default="Buscar por Codigo o Sumilla"
                                    onChange={onChange}
                                />
                            </div>
                            <div className="col-2 offset-2 d-flex justify-content-end p-0">
                                <Link
                                    to={
                                        {
                                            pathname: "/gestionarResultadoEstudiante/agregarResultadoEstudiante"
                                        }
                                    }
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        id="buttonNuevo"
                                        className={classes.btn}
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        endIcon={<AddIcon />}
                                    /* onClick={() => {
                                }} */
                                    >
                                        Nuevo
                                            </Button>
                                </Link>
                            </div>
                        </div>

                        <MenuFiltrosResultadosEstudiante />

                        <div className="h-100" >
                            <div className="p-0 overflow-auto" style={{ height: "500px" }}>
                                {resultadosEstudiante.map(
                                    (resultado) => {
                                        return (
                                            <CardResultadoEstudiante                                                
                                                key={
                                                    resultado.idResultadoEstudiante
                                                }
                                                resultado={resultado}
                                                idPrograma={idPrograma}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default GestionarResultadosEstudiante;
