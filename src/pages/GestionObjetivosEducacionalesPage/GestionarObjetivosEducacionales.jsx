import React, { useEffect, useState } from "react";
import CardObjetivosEducacionales from "../../components/GestionObjetivosEducacionalesComponents/CardObjetivosEducacionales";
import MenuFiltrosObjetivosEducacionales from "../../components/GestionObjetivosEducacionalesComponents/MenuFiltrosObjetivosEducacionales";
import Input_Busquedas from "../../components/ComunesComponents/InputBusquedas";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AuthContext from "../../context/AuthContext/AuthContext";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarObjetivosEducacionalesStyles from "./GestionarObjetivosEducacionalesStyles";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ObjetivoEducacionalContext from "../../context/ObjetivoEducacionalContext/ObjetivoEducacionalContext";
import Footer from "../../components/PaginaComponents/Footer";
import instance from "../../instance";

const GestionarObjetivosEducacionales = () => {
    
    let current = instance.getItem("sasaGurudumu");
    let idPrograma = current.idPrograma;
    let nombrePrograma = current.nombrePrograma;
    const classes = GestionarObjetivosEducacionalesStyles();
    const [loading, setLoading] = useState(true);
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
    //context
    const { objetivosEducacionales, fetchObjetivosEducacionales } = useContext(
        ObjetivoEducacionalContext
    );
    const [searchTerm, setSearchTerm] = useState("");

    /*const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchObjetivosEducacionales(idPrograma, e.target.value);
        }
    };*/

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        fetchObjetivosEducacionales(idPrograma);
        setLoading(false);
    }, []);
    if (loading) {
        return <Loading />;
    }
    const onChange=(criterio)=>{
        fetchObjetivosEducacionales(idPrograma,criterio)
    }
    return (

        <div className="container-lg " style={{ minHeight: "1000px" }}>
            <Header rol={rol} setRol={setRol} />
            <div className="row">
                <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                    <div className=" h-100" style={{ padding: "0%" }}>
                        <Navbar rol={rol} setRol={setRol} />
                    </div>
                </div>

                <div className={`col ${classes.contenedor}`}>
                    <h3
                        id="title"
                        style={{
                            fontWeight: "bold",
                            marginBottom: "1%",
                        }}
                    >
                        Objetivos Educacionales
                            </h3>
                    <h4 style={{ marginBottom: "2.5%" }}>
                        {nombrePrograma}
                    </h4>

                    <div className={`${classes.listado}`}>
                        <div
                            className="row d-flex align-items-center mb-3"
                            style={{ width: "100%", margin: "0%" }}
                        >
                            <div className="col-8 p-0">
                                <Input_Busquedas
                                    placeHolder_Default="Buscar por Codigo o Sumilla"
                                    //handleKeyPress={handleKeyPress}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="col-2 offset-2 d-flex justify-content-end p-0">
                                <Link
                                    to={{
                                        pathname:
                                            "/gestionarObjetivosEducacionales/AgregarObjetivoEducacional",
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        className={classes.btn}
                                        id="botonNuevo"
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

                        <MenuFiltrosObjetivosEducacionales />
                        <div className="h-100">
                            <div
                                className="p-0 overflow-auto"
                                style={{ height: "480px" }}
                            >
                                {objetivosEducacionales
                                    .filter((val) => {
                                        if (searchTerm === "") {
                                            return val;
                                        } else if (
                                            val.codigo
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            val.sumilla
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                )
                                        ) {
                                            return val;
                                        }
                                    })
                                    .map((objetivo) => {
                                        return (
                                            <CardObjetivosEducacionales
                                                key={
                                                    objetivo.idObjetivoEducacional
                                                }
                                                objetivo={objetivo}
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

export default GestionarObjetivosEducacionales;
