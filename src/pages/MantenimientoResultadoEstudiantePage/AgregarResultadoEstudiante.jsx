import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import Loading from "../Loading/Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import MantenimientoResultadoEstudianteStyles from "./MantenimientoResultadoEstudianteStyles";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ObjetivoRelacionado from "../../components/GestionResultadoEstudianteComponents/ObjetivoRelacionado";
import Indicador from "../../components/GestionResultadoEstudianteComponents/Indicador";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EventIcon from "@material-ui/icons/Event";
import resultado from "../../mockObjects/ResultadoEstudiante/mockResultado";
import indicadorVacio from "../../mockObjects/ResultadoEstudiante/mockIndicador";
import BuscarObjetivos from "../../components/GestionResultadoEstudianteComponents/BuscarObjetivos";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import ModalConfirmacionRegistro from "./ModalConfirmacionRegistro";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Typography } from "@material-ui/core";
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import Footer from "../../components/PaginaComponents/Footer"
import ResultadoEstudianteContext from "../../context/ResultadoEstudianteContext/ResultadoEstudianteContext";
import NivelVacio from "../../mockObjects/ResultadoEstudiante/mockNivel";
import { useToasts } from "react-toast-notifications";
import IndicadoresArray from "../../components/GestionResultadoEstudianteComponents/Indicador"

import instance from "../../instance";

const AgregarResultadoEstudiante = () => {
    
    //Variables
    let current = instance.getItem("sasaGurudumu");
    let idPrograma = current.idPrograma;
    //Classes
    const classes = MantenimientoResultadoEstudianteStyles();
    //States
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSave, setOpenSave] = useState(false);
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
    const [niveles, setNiveles] = useState(1);
    const [numIndicadores, setNumIndicadores] = useState(1);
    const [indicadorVoid, setIndicadorVoid] = useState(indicadorVacio);
    //History
    const history = useHistory();
    //Context
    const { addResultadoEstudiante } = useContext(ResultadoEstudianteContext);
    const { loadUser } = useContext(AuthContext);
    //Form
    const methods = useForm(
        { mode: "onChange" }
    );
    const { isDirty } = methods.formState;
    const control = methods.control;
    const {
        fields: indicadorFields,
        append: indicadorAppend,
        remove: indicadorRemove,
    } = useFieldArray(
        {
            control,
            name: `indicadores`
        }
    );
    const {
        fields: objFields,
        append: objAppend,
        remove: objRemove,
    } = useFieldArray(
        {
            control,
            name: `Objetivos`
        }
    );
    //Alertas
    const { addToast } = useToasts();
    //Handlers
    const handleOpenSave = () => {
        setOpenSave(true);
    };

    const handleCloseSave = () => {
        setOpenSave(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        console.log(objFields);
        methods.setValue("objetivos", objFields);
        //const a = methods.getValues("objetivos");
        //console.log(a);
    }

    //onSubmit
    const onSubmit = (data) => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        addResultadoEstudiante(data).then(() => {
            history.push("/gestionarResultadoEstudiante");
        });
    };

    //Verificacion Niveles
    const verificarNiveles = () => {
        let bandera = 0
        var i
        if (parseInt(niveles) > parseInt(resultado.niveles)) {
            let botones = document.getElementsByName('botonAgregar');
            if (botones) {
                //console.log(botones, "Son los botones");
                for (i = 0; i < botones.length; i++) {
                    botones[i].click();
                }
            }
            resultado.niveles = niveles
        } else if (parseInt(niveles) < parseInt(resultado.niveles)) {
            let i = 0
            //console.log(numIndicadores, "numIndicadoresAlMomentoRemover");
            for (i = 0; i < numIndicadores; i++) {
                let idCod = "N_" + i + "_" + (resultado.niveles - 1)
                let descripcion = document.getElementById(idCod)
                let input = document.getElementById("inputNiveles")
                if (descripcion) {
                    if (descripcion.value !== "") {
                        addToast("El último nivel contiene información: No puede ser eliminado", {
                            appearance: "error",
                            autoDismiss: true,
                        });
                        input.value = parseInt(niveles) + 1;
                        setNiveles(parseInt(niveles) + 1);
                        bandera = 1
                        break;
                    }
                }
                let idProgreso = "P_N_" + i + "_" + (resultado.niveles - 1)
                let progreso = document.getElementById(idProgreso)
                if (progreso) {
                    if (progreso.value !== "") {
                        addToast("El último nivel contiene información: No puede ser eliminado", {
                            appearance: "error",
                            autoDismiss: true,
                        });
                        input.value = parseInt(niveles) + 1;
                        setNiveles(parseInt(niveles) + 1);
                        bandera = 1
                        break;
                    }
                }
            }
            if (bandera === 0) {
                for (i = 0; i < numIndicadores; i++) {
                    var k = parseInt(niveles)
                    let idBoton = "Del" + i + "_" + k
                    let botonDel = document.getElementById(idBoton)
                    if (botonDel) { botonDel.click(); }
                }
                resultado.niveles = niveles
            }
            const l = indicadorFields.length;
            indicadorAppend(indicadorVacio);
            indicadorRemove(l);
        }
    }

    const addNiveles = () => {
        setIndicadorVoid(indicadorVacio);
        var nivels = [];
        var i;
        for (i = 0; i < niveles; i++) {
            nivels.push(NivelVacio);
        }
        var tempIV = indicadorVoid;
        tempIV.niveles = nivels;
        setIndicadorVoid(tempIV);
    }

    //UseEffects
    useEffect(() => {
    }, [indicadorFields]);

    useEffect(() => {
        addNiveles();
        verificarNiveles();
    }, [niveles]);

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        methods.register("idPrograma");
        methods.setValue("idPrograma", idPrograma);
        methods.register("objetivos");
        resultado.niveles = 1;
        setLoading(false);
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

                <div className={`col ${classes.contenedor}`} style={{ minHeight: "800px" }}>
                    <div className="row align-items-start">
                        <div className="col-4">
                            <Link
                                to="/gestionarResultadoEstudiante"
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
                    <div className="d-flex justify-content-between mb-4">
                        <h3
                            style={{
                                fontWeight: "bold",
                                marginBottom: "1%",
                            }}
                        >
                            Agregar Resultado del Estudiante
                        </h3>
                    </div>

                    <FormProvider {...methods}>
                        <form
                            className={`${classes.contenedorFormulario}`}
                        /* onSubmit={methods.handleSubmit(onSubmit)} */
                        >
                            <div className="row align-items-center pb-1">
                                <div className="d-flex px-1 align-items-center ">
                                    <label
                                        className="me-2 px-2"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Código
                                        </label>
                                    <input
                                        id="inputCodigo"
                                        type="text"
                                        name="codigo"
                                        className="form-control mb-0 me-2"
                                        style={{
                                            backgroundColor: "white",
                                            width: "100px",
                                            textAlign: "center",
                                            color: "black",
                                            resize: "none",
                                            marginBottom: "10px",
                                            borderRadius: "5px",
                                            borderWidth: "thin",
                                        }}
                                        ref={methods.register({
                                            required: {
                                                value: true,
                                                message: "Por favor complete el código",
                                            },
                                            maxLength:{
                                                value:10,
                                                message:"El código no puede superar 10 caracteres"
                                            }, 
                                            pattern:{
                                                value: /(^[0-9A-ZÑ_]{1,})$/,
                                                message:"Ingrese solo letras mayúsculas, números o guiones bajos"
                                            },
                                          /*   minLength:{
                                                value:2,
                                                message:"El código debe ser de al menos 2 caracteres"
                                            } */
                                        })}
                                        maxLength="100"
                                    ></input>
                                    <span>
                                        <Typography variant="body2" color="error" id="errorSumilla"                                        >
                                            {methods.errors?.codigo?.message}
                                        </Typography>
                                    </span>
                                </div>
                                <div className="col">
                                    <label
                                        className="p-1"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {" "}
                                            Sumilla{" "}
                                    </label>
                                    <textarea
                                        id="txtSumilla"
                                        name="sumilla"
                                        className="form-control mb-1"
                                        style={{
                                            backgroundColor: "white",
                                            width: "100%",
                                            maxHeight: "70px",
                                            color: "black",
                                            resize: "none",
                                            marginBottom: "10px",
                                        }}
                                        ref={methods.register({
                                            required: {
                                                value: true,
                                                message: "Por favor complete la sumilla",
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "La sumilla no puede tener más de 100 caracteres"
                                            }
                                        })}
                                    ></textarea>
                                    <span>
                                        <Typography variant="body2" color="error" id="errorSumilla"                                        >
                                            {methods.errors?.sumilla?.message}
                                        </Typography>
                                    </span>
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
                                id="txtDescripcion"
                                className="form-control mb-1"
                                name="descripcion"
                                style={{
                                    backgroundColor: "white",
                                    width: "100%",
                                    minHeight: "100px",
                                    maxHeight: "300px",
                                    color: "black",
                                    resize: "none",
                                    marginBottom: "10px",
                                }}
                                ref={methods.register({
                                    required: {
                                        value: true,
                                        message: "Por favor complete la descripción",
                                    },
                                    maxLength: {
                                        value: 1000,
                                        message: "La descripción no puede tener más de 1000 caracteres"
                                    }
                                })
                                }
                            ></textarea>
                            <span>
                                <Typography variant="body2" color="error" id="errorSumilla"                                        >
                                    {methods.errors?.descripcion?.message}
                                </Typography>
                            </span>
                            {/* Objetivos del estudiante, N niveles, Ultima medicion */}
                            <div className="container px-1 row justify-content-center mb-3 mt-3">
                                <div className="col-md-6 col-sm-6 col-6">
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <label
                                                className="mb-1"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {" "}
                                                    Objetivos del Estudiante
                                                    Relacionados{" "}
                                            </label>
                                            <div>
                                                <AddCircleOutlineIcon
                                                    className={
                                                        classes.addBtn
                                                    }
                                                    id="buttonAddObjEd"
                                                    onClick={handleOpen}
                                                />
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
                                                                <BuscarObjetivos
                                                                    handleClose={
                                                                        handleClose
                                                                    }
                                                                    append={objAppend}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Fade>
                                                </Modal>
                                            </div>
                                        </div>
                                        <div
                                            className="container px-0 overflow-auto mt-1 "
                                            style={{
                                                backgroundColor: "white",
                                                minHeight: "60px",
                                                maxHeight: "100px",
                                                color: "black",
                                                resize: "none",
                                                marginBottom: "10px",
                                                border: "1px solid #CCCCCC",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {/* Lista de objetivos relacionados */}
                                            <div className="d-flex align-items-center">
                                                {objFields.map(
                                                    (objetivo, index) => {
                                                        return (
                                                            <ObjetivoRelacionado
                                                                key={
                                                                    objetivo.idObjetivoEducacional
                                                                }
                                                                objetivo={
                                                                    objetivo
                                                                }
                                                                btnState={
                                                                    true
                                                                }
                                                                index={index}
                                                                register={methods.register}
                                                                remove={objRemove}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-6 mb-3 ">
                                    <div className="d-flex row align-items-center">
                                        <div className="col-md-4 col-sm-4 col-4">
                                            <label
                                                className="mb-1"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {" "}
                                                    N° Niveles{" "}
                                            </label>
                                            <div
                                                className="d-flex align-items-center"
                                                style={{ height: "40px" }}
                                            >
                                                <div className="me-3">
                                                    <EqualizerIcon />
                                                </div>
                                                <div>
                                                    <input
                                                        id="inputNiveles"
                                                        type="number"
                                                        name="nroNivelesIndicador"
                                                        className="form-control"
                                                        style={{
                                                            width: "60px",
                                                            height: "30px",
                                                            textAlign:
                                                                "center",
                                                        }}
                                                        defaultValue={
                                                            niveles
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (e.code !=="ArrowUp" || e.code !=="ArrowDown"){
                                                                if (e.code !=="ArrowDown" && e.code!=="ArrowUp"){
                                                                    e.preventDefault();
                                                                }
                                                            } 
                                                                
                                                            else e.preventDefault(); }}
                                                        ref={methods.register}
                                                        min="1"
                                                        max="10"
                                                        onChange={(e) => setNiveles(e.target.value)}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-4">
                                            <label
                                                className="mb-1"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {" "}
                                                    Logro Esperado{" "}
                                            </label>
                                            <div
                                                className="d-flex align-items-center"
                                                style={{ height: "40px" }}
                                            >
                                                <div className="me-3">
                                                    <AccessibleForwardIcon />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <input
                                                        id="inputLogro"
                                                        className="form-control"
                                                        name="porcentajeLogro"
                                                        style={{
                                                            width: "55px",
                                                            height: "30px",
                                                            textAlign:
                                                                "center",
                                                        }}
                                                        defaultValue={
                                                            0
                                                        }
                                                        ref={methods.register({
                                                            required: {
                                                                value: true,
                                                                message: "Por favor complete el porcentaje de logro esperado",
                                                            },
                                                            maxLength: {
                                                                value: 3,
                                                                message: "Solo se acepta porcentajes enteros de hasta 100%"
                                                            },
                                                            minLength: {
                                                                value: 1,
                                                                message: "Por favor complete el porcentaje de logro esperado"
                                                            },
                                                            max: {
                                                                value: 100,
                                                                message: "Solo se acepta porcentaje de hasta 100%"
                                                            },
                                                            min: {
                                                                value: 1,
                                                                message: "El porcentaje debe ser mayor a 0%"
                                                            },
                                                            pattern: {
                                                                value: /(^[0-9]{1,})$/,
                                                                message: "Ingrese solo números enteros"
                                                            }
                                                        })}
                                                    />
                                                    <label style={{ paddingLeft: "3px", fontWeight: "bold" }}>%</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-4">
                                            <label
                                                className="mb-1"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {" "}
                                                    Ultima Medicion{" "}
                                            </label>
                                            <div
                                                className="d-flex align-items-center px-1"
                                                style={{
                                                    height: "40px",
                                                    width: "130px",
                                                    borderRadius: "10px",
                                                    textAlign: "center",
                                                    backgroundColor:
                                                        "#EEEEEE",
                                                }}
                                            >
                                                <div className="me-3">
                                                    <EventIcon />
                                                </div>
                                                <div>
                                                    <input
                                                        id="inputUltMed"
                                                        style={{
                                                            width: "60px",
                                                            height: "30px",
                                                            borderWidth:
                                                                "0px",
                                                            textAlign:
                                                                "center",
                                                        }}
                                                        value={
                                                            "-"
                                                        }
                                                        disabled
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-5 d-flex justify-content-center">
                                        <span >
                                            <Typography variant="body2" color="error" id="errorSumilla"                                        >
                                                {methods.errors?.porcentajeLogro?.message}
                                            </Typography>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Indicadores */}
                            <IndicadoresArray {...{ control, methods, indicadorVoid, niveles, numIndicadores, setNumIndicadores }} />
                        </form>
                        <div className="row justify-content-center mt-3">
                            <div className="col-4 col-sm-4 col-md-3 col-lg-2">
                                <Link
                                    to="/gestionarResultadoEstudiante"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        id="buttonCancelar"
                                        variant="contained"
                                        size="small"
                                        style={{ backgroundColor: "#928D8D", color: "white" }}
                                        endIcon={<ClearIcon />}
                                    >
                                        Cancelar
                                    </Button>

                                </Link>
                            </div>

                            <div className="col-4 col-sm-4 col-md-3 col-lg-2">
                                <Button
                                    id="buttonGuardar"
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    endIcon={<CheckIcon />}
                                    disabled={!isDirty}
                                    onClick={() => {
                                        handleClick()
                                        methods.trigger().then(() => {
                                            if (Object.keys(methods.formState.errors).length == 0) {
                                                {/* console.log(methods.formState.errors) */ }
                                                handleOpenSave()
                                            }
                                        });

                                    }}
                                >
                                    Guardar
                                    </Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={openSave}
                                    onClose={handleCloseSave}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade timeout={5} in={openSave}>
                                        <div className="container h-100 d-flex align-items-center justify-content-center">
                                            <div className={`h-auto pb-5 ${classes.popup}`}>
                                                <ModalConfirmacionRegistro
                                                    handleClose={handleCloseSave}
                                                    onSubmit={onSubmit}
                                                />
                                            </div>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        </div>
                    </FormProvider>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AgregarResultadoEstudiante;