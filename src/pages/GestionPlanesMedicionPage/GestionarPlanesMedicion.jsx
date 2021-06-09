import React, { useEffect, useState } from "react";
import CardPlanMedicionRE from "../../components/GestionProgramarMedicionComponents/CardPlanMedicionRE";
import MenuFiltrosPlanesMedicionRE from "../../components/GestionProgramarMedicionComponents/MenuFiltrosPlanesMedicionRE";
import Input_Busquedas from "../../components/ComunesComponents/InputBusquedas";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarPlanesMedicionStyles from "./GestionarPlanesMedicionStyles";
import Loading from "../Loading/Loading";
import Footer from "../../components/PaginaComponents/Footer"
import { Link } from "react-router-dom";
import { useContext } from "react";
import SecureLS from "secure-ls";
import AuthContext from "../../context/AuthContext/AuthContext";
import mockResultado from "../../mockObjects/ResultadoEstudiante/mockResultado";
import mockCiclos from "../../mockObjects/Semestres/mockCiclos";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import BuscarRE from '../../components/GestionProgramarMedicionComponents/BuscarRE'
import instance from "../../instance";
import ProgramaMedicionContext from "../../context/ProgramaMedicionContext/ProgramaMedicionContext";
import SemestreContext from "../../context/SemestreContext/SemestreContext";

const GestionarPlanesMedicion = () => {
    const ls = new SecureLS({ encodingType: "aes" });
    const classes = GestionarPlanesMedicionStyles();
    const [loading, setLoading] = useState(true);
    let current = instance.getItem('sasaGurudumu');
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem('sasaGurudumu'));
    const [resultados, setResultados] = useState(null);
    const [cicloSeleccionado, setCicloSeleccionado] = useState();
    const [clicked, setClicked] = useState(false);
    const [ciclos, setCiclos] = useState(null)
    const [open, setOpen] = useState(false);
    const { resultadosMedicion, fetchProgramasMedicion } = useContext(
        ProgramaMedicionContext
    );
    const { semestres, fetchSemestres } = useContext(
        SemestreContext
    );
    let idPrograma = current.idPrograma;
    let nombrePrograma = current.nombrePrograma;

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            //fetchObjetivosEducacionales(idPrograma, e.target.value);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {


        setOpen(false);
    };

    const onChange = (criterio) => {
        fetchProgramasMedicion(idPrograma, cicloSeleccionado.idSemestre, criterio);
    }

    const methods = useForm(
        { mode: "onChange" }
    );
    const toggle = index => {
        if (clicked === index) {
            return setClicked(null);
        }
        setClicked(index)
    }

    useEffect(() => {
        loadUser();
        setRol(instance.getItem('sasaGurudumu'));
        //fetchResultados
        //fetchCiclos
        fetchSemestres();


        setLoading(false);
    }, []);



    useEffect(() => {
        if (semestres) {
            setCiclos(semestres);
        }
    }, [semestres]);

    useEffect(() => {
        if (ciclos) {
            setCicloSeleccionado(ciclos[0])

        }
    }, [ciclos]);

    useEffect(() => {
        if (cicloSeleccionado) {
            fetchProgramasMedicion(idPrograma, cicloSeleccionado.idSemestre);
            //setResultados(resultadosMedicion)
        }

    }, [cicloSeleccionado])

    useEffect(() => {
        if (resultadosMedicion) {
            //fetchProgramasMedicion(idPrograma, cicloSeleccionado.idSemestre);
            setResultados(resultadosMedicion)
            //console.log(resultados);
        }

    }, [resultadosMedicion])

    useEffect(() => {
        if (cicloSeleccionado) {
            fetchProgramasMedicion(idPrograma, cicloSeleccionado.idSemestre);
        }

    }, [open]);

    if (ciclos && resultados && cicloSeleccionado) {
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
                            style={{
                                fontWeight: "bold",
                                marginBottom: "1%",
                            }}
                        >
                            Planes de Medicion
                    </h3>
                        <h4 style={{ marginBottom: "2.5%" }}>
                            Resultados de Estudiantes
                    </h4>

                        <div className={`${classes.listado}`}>
                            <div
                                className="row d-flex align-items-center mb-3"
                                style={{ maxWidth: "100%", margin: "0%" }}
                            >
                                <div className="col-10 col-sm-3 col-md-2 p-0">
                                    <label style={{ fontWeight: "Bold", fontFamily: "Roboto", marginRight: "13px" }}>Ciclo: </label>
                                    <Select style={{ width: "75px", textAlign: "center" }} value={cicloSeleccionado ? cicloSeleccionado.Semestre : ""} >
                                        {

                                            ciclos.map((ciclo) => {
                                                return (
                                                    <MenuItem
                                                        id={ciclo.idSemestre}
                                                        key={ciclo.idSemestre}
                                                        value={ciclo.Semestre}
                                                        onClick={() => setCicloSeleccionado(ciclo)}
                                                    >
                                                        {ciclo.Semestre}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="d-none d-sm-block col-sm-7 col-md-8 p-0">
                                    <Input_Busquedas
                                        placeHolder_Default="Buscar por Codigo o Sumilla"
                                        handleKeyPress={handleKeyPress}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="col-2 col-sm-2 col-md-2 d-flex justify-content-end p-0">

                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        endIcon={<AddCircleOutlineIcon />}
                                        onClick={() => {
                                            handleOpen()
                                        }}
                                    >
                                        Añadir
                                    </Button>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={
                                            classes.modal
                                        }
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={
                                            Backdrop
                                        }
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade
                                            timeout={5}
                                            in={open}
                                        >
                                            <div className="container h-100 d-flex align-items-center justify-content-center">
                                                <div
                                                    className={
                                                        classes.popup
                                                    }
                                                >
                                                    <BuscarRE
                                                        handleClose={
                                                            handleClose
                                                        }
                                                        idSemestre={cicloSeleccionado.idSemestre}
                                                    />
                                                </div>
                                            </div>
                                        </Fade>
                                    </Modal>

                                </div>
                            </div>

                            <MenuFiltrosPlanesMedicionRE />

                            <div className="h-100" >
                                <div className="p-0 overflow-auto" style={{ height: "500px" }}>
                                    {resultados.map(
                                        (resultado, index) => {
                                            return (
                                                <CardPlanMedicionRE
                                                    key={
                                                        resultado.idResultado
                                                    }
                                                    resultado={resultado}
                                                    idPrograma={idPrograma}
                                                    index={index}
                                                    toggle={toggle}
                                                    clicked={clicked}
                                                    cicloSeleccionado={cicloSeleccionado}
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
    }
    else return <div></div>
};

export default GestionarPlanesMedicion;
