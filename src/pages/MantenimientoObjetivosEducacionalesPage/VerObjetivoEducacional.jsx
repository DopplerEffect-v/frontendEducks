import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import MantenimientoObjetivoEducacionalStyles from "./MantenimientoObjetivoEducacionalStyles";
import Loading from "../Loading/Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ObjetivoEducacionalContext from "../../context/ObjetivoEducacionalContext/ObjetivoEducacionalContext";
import axios from "axios";
import url from "../../config";
import Footer from "../../components/PaginaComponents/Footer"
import AuthContext from "../../context/AuthContext/AuthContext";

import instance from "../../instance";

const VerObjetivoEducacional = ({ idObjetivo }) => {
    
    let current = instance.getItem('sasaGurudumu');
    let idPrograma = current.idPrograma;
    let nombrePrograma = current.nombrePrograma;
    const classes = MantenimientoObjetivoEducacionalStyles();
    const [objetivo, setObjetivo] = useState({});
    const [loading, setLoading] = useState(true);
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem('sasaGurudumu'));

    
    /* var secureConfig = {
        headers: {
            Authorization: `Bearer ${instance.getItem("ishara")}`,
        },
    }; */

    useEffect(() => {
        loadUser();
        setRol(instance.getItem('sasaGurudumu'));
        const getObjetivo = async () => {
            var secureConfig = {
                headers: {
                    Authorization: `Bearer ${instance.getItem("ishara")}`,
                },
            };
            try {
                await axios
                    .post(
                        `${url}/objetivoEducacional/mostrarObjetivoEducacional`,
                        {
                            idObjetivoEducacional: idObjetivo,
                        },
                        secureConfig
                    )
                    .then((res) => {
                        setObjetivo(res.data);
                        setLoading(false);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        getObjetivo();
    }, []);
    if (loading) {
        return <Loading />;
    }
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

                <div className={`col ${classes.contenedor}`}>
                    <div className="row align-items-start">
                        <div className="col-4">
                            <Link
                                to="/gestionarObjetivosEducacionales"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <IconButton aria-label="ArrowBackIcon">
                                            <ArrowBackIcon
                                                style={{
                                                    color: "#00477F",
                                                }}
                                            />
                                        </IconButton>
                                    </div>
                                    <label
                                        className="col"
                                        style={{
                                            paddingLeft: "2%",
                                            color: "#00477F",
                                        }}
                                    >
                                        Regresar
                                            </label>
                                </div>
                            </Link>
                        </div>
                        <div className="col"></div>
                    </div>

                    <h3
                        style={{
                            fontWeight: "bold",
                            marginBottom: "1%",
                        }}
                    >
                        Ver {objetivo.codigo}
                    </h3>

                    <div className="row align-items-center pb-3">
                        <div className="col-6">
                            <h4 style={{ marginBottom: "2.5%" }}>
                                {nombrePrograma}
                            </h4>
                        </div>
                        <div className="col"></div>
                        <div className="col-2 text-end">
                            <Link
                                to={{
                                    pathname:
                                        "/gestionarObjetivosEducacionales/EditarObjetivoEducacional",
                                    state: {
                                        idObjetivo: idObjetivo,
                                    },
                                }}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    endIcon={<EditIcon />}
                                /* onClick={() => {
                            }} */
                                >
                                    Editar
                                        </Button>
                            </Link>
                        </div>
                    </div>

                    <div className={`${classes.contenedorFormulario}`}>
                        <div className="row align-items-center pb-3">
                            <div className="col">
                                <label
                                    className="p-1"
                                    style={{ fontWeight: "bold" }}
                                >
                                    {" "}
                                            Sumilla{" "}
                                </label>
                                <textarea
                                    name="sumilla"
                                    style={{
                                        backgroundColor: "white",
                                        width: "100%",
                                        maxHeight: "70px",
                                        color: "black",
                                        resize: "none",
                                        marginBottom: "10px",
                                    }}
                                    maxlength="100"
                                    disabled
                                    readonly
                                >
                                    {objetivo.sumilla}
                                </textarea>
                            </div>
                        </div>
                        <label
                            className="p-1"
                            style={{ fontWeight: "bold" }}
                        >
                            {" "}
                                    Descripcion{" "}
                        </label>
                        <textarea
                            name="descripcion"
                            style={{
                                backgroundColor: "white",
                                width: "100%",
                                minHeight: "150px",
                                maxHeight: "300px",
                                color: "black",
                                resize: "none",
                                marginBottom: "10px",
                            }}
                            disabled
                            readonly
                        >
                            {objetivo.descripcion}
                        </textarea>
                        <label
                            className="p-1"
                            style={{ fontWeight: "bold" }}
                        >
                            {" "}
                                    Comentarios Adicionales{" "}
                        </label>
                        <textarea
                            name="comentarios"
                            style={{
                                backgroundColor: "white",
                                width: "100%",
                                minHeight: "180px",
                                maxHeight: "300px",
                                color: "black",
                                resize: "none",
                            }}
                            disabled
                            readonly
                        >
                            {objetivo.comentarios}
                        </textarea>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default VerObjetivoEducacional;
