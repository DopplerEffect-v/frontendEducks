import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import Loading from "../Loading/Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useHistory } from "react-router-dom";
import MantenimientoResultadoEstudianteStyles from "./MantenimientoResultadoEstudianteStyles";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ObjetivoRelacionado from "../../components/GestionResultadoEstudianteComponents/ObjetivoRelacionado";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EventIcon from "@material-ui/icons/Event";
import resultadoCaca from "../../mockObjects/ResultadoEstudiante/mockResultado";
import indicadorVacio from "../../mockObjects/ResultadoEstudiante/mockIndicador";
import NivelVacio from "../../mockObjects/ResultadoEstudiante/mockNivel";
import BuscarObjetivos from "../../components/GestionResultadoEstudianteComponents/BuscarObjetivos";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import ModalConfirmacionEditar from "./ModalConfirmacionEditar";
import Footer from "../../components/PaginaComponents/Footer";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import url from "../../config";
import IndicadoresArray from "../../components/GestionResultadoEstudianteComponents/IndicadorVer";
import { Typography } from "@material-ui/core";
import ResultadoEstudianteContext from "../../context/ResultadoEstudianteContext/ResultadoEstudianteContext";
import instance from "../../instance";

const VerResultadoEstudiante = ({ idResultadoEstudiante }) => {
  const classes = MantenimientoResultadoEstudianteStyles();
  const [loading, setLoading] = useState(true);
  const { loadUser } = useContext(AuthContext);
  const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
  const [open, setOpen] = React.useState(false);
  const [openSave, setOpenSave] = useState(false);
  let current = instance.getItem("sasaGurudumu");
  let idPrograma = current.idPrograma;
  const [indicadorVoid, setIndicadorVoid] = useState(indicadorVacio);
  //const [resultado, setResultado] = useState(resultadoCaca);
  const [resultado, setResultado] = useState(null);
  const [niveles, setNiveles] = useState();
  const [numIndicadores, setNumIndicadores] = useState();
  const history = useHistory();
  /* const { resultadoEstudiante } = useContext(
        ResultadoEstudianteContext
    ); */
  const { addToast } = useToasts();

  const methods = useForm({ mode: "onChange" });
  const { isDirty } = methods.formState;

  const control = methods.control;
  const {
    fields: indicadorFields,
    append: indicadorAppend,
    remove: indicadorRemove,
  } = useFieldArray({
    control,
    name: `Indicadores`,
  });
  const {
    fields: objFields,
    append: objAppend,
    remove: objRemove,
  } = useFieldArray({
    control,
    name: `Objetivos`,
  });

  useEffect(() => {
    //console.log(idResultadoEstudiante);
    loadUser();
    setRol(instance.getItem("sasaGurudumu"));
    methods.register("fidPrograma");
    methods.setValue("fidPrograma", idPrograma);
    const getResultado = async () => {
      try {
        //Secure config para requests a APIs
        var secureConfig = {
          headers: {
            Authorization: `Bearer ${instance.getItem("ishara")}`,
          },
        };
        await axios
          .post(
            `${url}/resultadoEstudiante/mostrarResultadoEstudiante`,
            {
              idResultadoEstudiante: idResultadoEstudiante,
            },
            secureConfig
          )
          .then((res) => {
            setResultado(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getResultado();
  }, []);

  useEffect(() => {
    if (resultado) {
      console.log(resultado);
      /* var i = 0;
            resultado.indicadores.forEach(indicador => {
                i++;
            }); */
      //console.log(i, "indicadoresDespuesDelForchEach")
      setNumIndicadores(resultado.numIndicadores);
      //guarda objetivos
      //setObjetivos(resultado.objetivos);
      resultado.objetivos.forEach((obj) => {
        objAppend(obj);
      });
      //numeroNiveles
      setNiveles(parseInt(resultado.niveles));
      setLoading(false);
    }
  }, [resultado]);

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
    const a = methods.getValues("objetivos");
    console.log(a);
  };

  const onSubmit = (data) => {
    //Login
    loadUser();
    setRol(instance.getItem("sasaGurudumu"));
    //
    console.log("data", data);
    /* addResultadoEstudiante(data).then(()=>{
            history.push("/gestionarResultadoEstudiante");
        }); */
  };

  const verificarNiveles = () => {
    let bandera = 0;
    var i;
    if (parseInt(niveles) > parseInt(resultado.niveles)) {
      /* indicadorFields.forEach(indicador => (
                indicador.niveles.push(NivelVacio))
            ) */

      let botones = document.getElementsByName("botonAgregar");
      if (botones) {
        console.log(botones, "Son los botones");
        for (i = 0; i < botones.length; i++) {
          botones[i].click();
        }
        //botones.map((boton,index)=>{boton.click();})
      }
      resultado.niveles = niveles;
    } else if (parseInt(niveles) < parseInt(resultado.niveles)) {
      let i = 0;
      console.log(numIndicadores, "numIndicadoresAlMomentoRemover");
      for (i = 0; i < numIndicadores; i++) {
        let idCod = "N_" + i + "_" + (resultado.niveles - 1);
        let descripcion = document.getElementById(idCod);
        let input = document.getElementById("inputNiveles");
        if (descripcion) {
          if (descripcion.value !== "") {
            addToast(
              "El último nivel contiene información: No puede ser eliminado",
              {
                appearance: "error",
                autoDismiss: true,
              }
            );
            input.value = parseInt(niveles) + 1;
            setNiveles(parseInt(niveles) + 1);
            bandera = 1;
            break;
          }
        }
        let idProgreso = "P_N_" + i + "_" + (resultado.niveles - 1);
        let progreso = document.getElementById(idProgreso);
        if (progreso) {
          if (progreso.value !== "") {
            addToast(
              "El último nivel contiene información: No puede ser eliminado",
              {
                appearance: "error",
                autoDismiss: true,
              }
            );
            input.value = parseInt(niveles) + 1;
            setNiveles(parseInt(niveles) + 1);
            bandera = 1;
            break;
          }
        }
      }

      if (bandera === 0) {
        let botonesDel = document.getElementsByName("botonDelete");
        if (botonesDel) {
          console.log(botonesDel, "Son los botones");
          for (i = 0; i < botonesDel.length; i++) {
            botonesDel[i].click();
          }
          //botones.map((boton,index)=>{boton.click();})
        }
        resultado.niveles = niveles;
      }
      const l = indicadorFields.length;
      indicadorAppend(indicadorVacio);
      indicadorRemove(l);
    }
  };

  useEffect(() => {}, [indicadorFields]);

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
  };

  useEffect(() => {
    if (resultado) {
      addNiveles();
      verificarNiveles();
    }
  }, [niveles]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container-lg">
      <Header rol={rol} setRol={setRol} />
      <div className="row">
        <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
          <div className=" h-100" style={{ padding: "0%" }}>
            <Navbar rol={rol} setRol={setRol} />
          </div>
        </div>

        <div
          className={`col ${classes.contenedor}`}
          style={{ minHeight: "800px" }}
        >
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
              Ver Resultado del Estudiante
            </h3>
            <div className="col-2 text-end me-2">
                            <Link
                                to={{
                                    pathname:
                                        "/gestionarResultadoEstudiante/editarResultadoEstudiante",
                                    state: {
                                        idResultadoEstudiante: idResultadoEstudiante,
                                    },
                                }}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    id="btnEditar"
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

          <FormProvider {...methods}>
            <form
              className={`${classes.contenedorFormulario}`}
              /* onSubmit={methods.handleSubmit(onSubmit)} */
            >
              <div className="row align-items-center pb-1">
                <div className="d-flex px-1 align-items-center ">
                  <label className="me-2 px-2" style={{ fontWeight: "bold" }}>
                    Código
                  </label>
                  <input
                    id="inputCodigo"
                    type="text"
                    name="codigo"
                    className="form-control mb-0"
                    style={{
                      backgroundColor: "#e9ecef",
                      width: "100px",
                      textAlign: "center",
                      color: "black",
                      resize: "none",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      borderWidth: "thin",
                    }}
                    defaultValue={resultado.codigo}
                    ref={methods.register({
                      required: {
                        value: true,
                        message: "Por favor complete el código",
                      },
                    })}
                    disabled
                    maxLength="100"
                  ></input>
                  <span>
                    <Typography variant="body2" color="error" id="errorSumilla">
                      {methods.errors?.codigo?.message}
                    </Typography>
                  </span>
                </div>
                <div className="col">
                  <label className="p-1" style={{ fontWeight: "bold" }}>
                    {" "}
                    Sumilla{" "}
                  </label>
                  <textarea
                    id="txtSumilla"
                    name="sumilla"
                    className="form-control"
                    style={{
                      backgroundColor: "#e9ecef",
                      width: "100%",
                      maxHeight: "70px",
                      color: "black",
                      resize: "none",
                      marginBottom: "10px",
                    }}
                    defaultValue={resultado.sumilla}
                    disabled
                    ref={methods.register({
                      required: {
                        value: true,
                        message: "Por favor complete la sumilla",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          "La sumilla no puede tener más de 100 caracteres",
                      },
                    })}
                    disabled
                  ></textarea>
                  <span>
                    <Typography variant="body2" color="error" id="errorSumilla">
                      {methods.errors?.sumilla?.message}
                    </Typography>
                  </span>
                </div>
              </div>
              <label className="p-1" style={{ fontWeight: "bold" }}>
                {" "}
                Descripcion{" "}
              </label>
              <textarea
                id="txtDescripcion"
                className="form-control mb-3"
                name="descripcion"
                style={{
                  backgroundColor: "#e9ecef",
                  width: "100%",
                  minHeight: "100px",
                  maxHeight: "300px",
                  color: "black",
                  resize: "none",
                  marginBottom: "10px",
                }}
                defaultValue={resultado.descripcion}
                ref={methods.register({
                  required: {
                    value: true,
                    message: "Por favor complete la descripcion",
                  },
                  maxLength: {
                    value: 1000,
                    message:
                      "La descripción no puede tener más de 1000 caracteres",
                  },
                })}
                disabled
              ></textarea>
              <span>
                <Typography variant="body2" color="error" id="errorSumilla">
                  {methods.errors?.descripcion?.message}
                </Typography>
              </span>
              {/* Objetivos del estudiante, N niveles, Ultima medicion */}
              <div className="container px-1 row justify-content-center mb-3">
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
                        Objetivos del Estudiante Relacionados{" "}
                      </label>
                    </div>
                    <div
                      className="container px-0 overflow-auto mt-1 "
                      style={{
                        backgroundColor: "#e9ecef",
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
                        {objFields.map((objetivo, index) => {
                          return (
                            <ObjetivoRelacionado
                              key={objetivo.idObjetivoEducacional}
                              objetivo={objetivo}
                              btnState={true}
                              index={index}
                              register={methods.register}
                              remove={objRemove}
                            />
                          );
                        })}
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
                            name="niveles"
                            className="form-control"
                            style={{
                              width: "60px",
                              height: "30px",
                              textAlign: "center",
                            }}
                            defaultValue={resultado.niveles}
                            onKeyDown={(e) => {
                              e.preventDefault();
                            }}
                            ref={methods.register}
                            min="1"
                            max="10"
                            disabled
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
                            name="logroEsperado"
                            style={{
                              width: "55px",
                              height: "30px",
                              textAlign: "center",
                            }}
                            defaultValue={resultado.porcentajeLogro}
                            ref={methods.register}
                            disabled
                          ></input>
                          <label
                            style={{ paddingLeft: "3px", fontWeight: "bold" }}
                          >
                            %
                          </label>
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
                          border: "1px solid #ced4da",
                          textAlign: "center",
                          backgroundColor: "#EEEEEE",
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
                              borderWidth: "0px",
                              textAlign: "center",
                            }}
                            value={resultado.ultimaMedicion}
                            disabled
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Indicadores */}
              <IndicadoresArray
                {...{
                  control,
                  methods,
                  indicadorVoid,
                  niveles,
                  numIndicadores,
                  setNumIndicadores,
                  resultado,
                }}
              />
            </form>
          </FormProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerResultadoEstudiante;
