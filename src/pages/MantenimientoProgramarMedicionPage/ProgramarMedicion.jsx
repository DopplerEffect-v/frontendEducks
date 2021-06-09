import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import MantenimientoProgramarMedicionStyles from "./MantenimientoProgramarMedicionStyles";
import Loading from "../Loading/Loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Footer from "../../components/PaginaComponents/Footer";
import SecureLS from "secure-ls";
import AuthContext from "../../context/AuthContext/AuthContext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ContenedorCursos from "../../components/GestionProgramarMedicionComponents/ContenedorCursos";
import mockCursos from "../../mockObjects/ProgramarMedicion/mockCursosMedicion";
import mockMedicion from "../../mockObjects/ProgramarMedicion/mockMedicion";
import ContenedorMediciones from "../../components/GestionProgramarMedicionComponents/ContenedorMediciones";
import horarioVacio from "../../mockObjects/ProgramarMedicion/horarioVacio";
import MenuFiltroMediciones from "../../components/GestionProgramarMedicionComponents/MenuFiltroMediciones";
import instance from "../../instance";
import MenuItem from "@material-ui/core/MenuItem";
import { useToasts } from "react-toast-notifications";

const ProgramarMedicion = ({ indicador, cicloSeleccionado }) => {
    //Datos de LS
    const ls = new SecureLS({ encodingType: "aes" });
    let current = instance.getItem('sasaGurudumu');
    let idPrograma = current.idPrograma;
    let nombrePrograma = current.nombrePrograma;
    //Styles
    const classes = MantenimientoProgramarMedicionStyles();
    //Variables locales
    const [loading, setLoading] = useState(true);
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem('sasaGurudumu'));

    const [cursosCombo, setCursosCombo] = useState(null);
    const [medicion, setMedicion] = useState(null);
    const [cursos, setCursos] = useState(null);

    const [cursoSeleccionado, setCursoSeleccionado] = useState()

    const { addToast } = useToasts();

    //Al inicio el primer curso siempre sera el clickeado
    const [clicked, setClicked] = useState(0);

    //Funcion para manejar el curso seleccionado. Debe setear a falso todos los cursos y luego en verdadero el curso seleccionado
    const handleCursoSeleccionado = (index) => {
        if (clicked === index) { return }
        else { setClicked(index); }
    };

    /* Funcion que agrega horario vacio al curso que este clicked */
    const handleNuevoHorario = () => {
        let temp = JSON.parse(JSON.stringify(cursos))
        let tempHorario = JSON.parse(JSON.stringify(horarioVacio))
        temp[clicked].horarios.push({ ...tempHorario });
        setCursos([...temp]);
        
    };

    const handleChangeHorario = (e, indexCurso, indexHorario) => {
        let temp = JSON.parse(JSON.stringify(cursos))
        temp[indexCurso].horarios[indexHorario].horario = e.target.value;
        setCursos([...temp]);
    };


    /*  Funcion que elimina un horario del curso seleccionado en la lista de cursos
    Recibe de parametro el indice en el arreglo de cursos */

    const handleRemoveHorario = (index) => {
        let temp = JSON.parse(JSON.stringify(cursos))
        temp[clicked].horarios.splice(index, 1);
        //Si lo elimina bien pero no vuelve a renderizar los nuevos horarios..(ver console.log)
        setCursos([...temp]);
    };

    const handleChangeTipoEvidencias = (e) => {
        setMedicion(prevMedicion => ({ ...prevMedicion, [e.target.name]: e.target.value }));
    };

    const agregarCursoSeleccionado = () => {
        let bandera = 0
        cursos.map((curso) => {
            if (curso.idCurso === cursoSeleccionado.idCurso) bandera = 1
        })

        if (bandera === 0) {
            let tempCursoSeleccionado = JSON.parse(JSON.stringify(cursoSeleccionado))

            let temp = JSON.parse(JSON.stringify(cursos))
            temp.push({ ...tempCursoSeleccionado });
            setCursos([...temp]);
        } else {
            addToast("El curso seleccionado ya se encuentra en la Programacion", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    };



    // Funcion que removera un curso de la lista de cursos
    const handleRemoveCurso = (index) => {

        setCursos(cursos.filter((item, i) => i !== index));
    };

    const submit = () => {

        console.log(medicion)
    };

    useEffect(() => {
        loadUser();
        setRol(instance.getItem('sasaGurudumu'));


        //fetchCursosCombo
        setCursosCombo(mockCursos)

        //fetchMedicion
        setMedicion(mockMedicion)

        setLoading(false);

    }, []);

    useEffect(() => {
        if (cursosCombo) {
            setCursoSeleccionado(cursosCombo[0])
        }

    }, [cursosCombo]);

    useEffect(() => {

        if (medicion) setCursos(medicion.cursos)

    }, [medicion]);

    useEffect(() => {

        if (cursos) setMedicion(prevMedicion => ({ ...prevMedicion, ["cursos"]: cursos }));

    }, [cursos]);


    if (loading) {
        return <Loading />;
    }

    if (medicion && cursos && cursosCombo) {
        return (
            <div className="container-lg" style={{ minHeight: "1000px" }}>
                <Header rol={rol} setRol={setRol} />
                <div className="row">
                    <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                        <div className=" h-100" style={{ padding: "0%" }}>
                            <Navbar rol={rol} setRol={setRol} />
                        </div>
                    </div>
                    <div className={`col ${classes.contenedor}`}>
                        <div className="row align-items-start">
                            <div className="col-4">
                                <Link
                                    to="/gestionarPlanesMedicion"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <IconButton
                                            disableFocusRipple
                                            disableRipple
                                            aria-label="ArrowBackIcon"
                                        >
                                            <ArrowBackIcon
                                                style={{
                                                    color: "#00477F",
                                                }}
                                            />
                                        </IconButton>
                                        <label
                                            className="col"
                                            style={{
                                                paddingLeft: "2%",
                                                color: "#00477F",
                                                cursor: "pointer",
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
                                textAlign: "center",
                            }}
                        >
                            Programar Medición de Indicadores
                        </h3>

                        <h4
                            style={{
                                marginBottom: "40px",
                                textAlign: "center",
                            }}
                        >
                            Cursos y Horarios
                        </h4>
                        <div>
                            <div className="row my-3">
                                <div className="col-md-4 col-sm-4 col-6">
                                    <label className="me-3">Indicador: </label>
                                    <label className={classes.datosResultado}>
                                        {indicador.codigo}
                                    </label>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <label className="me-2">Ciclo: </label>
                                    <label className={classes.datosResultado}>
                                        {cicloSeleccionado.ciclo}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 d-flex align-items-center">
                            <label className="me-2">Curso:</label>
                            <Select
                                style={{ minWidth: "220px" }}
                                className="me-2"
                                value={cursoSeleccionado ? cursoSeleccionado.nombre : ""}
                            >
                                {

                                    cursosCombo.map((curso) => {
                                        return (
                                            <MenuItem
                                                id={curso.id}
                                                key={curso.id}
                                                value={curso.nombre}
                                                onClick={() => setCursoSeleccionado(curso)}
                                            >
                                                {curso.nombre}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>

                            <Button
                                id="buttonAgregar"
                                className={classes.btn}
                                variant="contained"
                                size="small"
                                color="secondary"
                                endIcon={<AddCircleOutlineIcon />}

                                onClick={agregarCursoSeleccionado}
                            >
                                Agregar
                                    </Button>
                        </div>

                        <ContenedorCursos
                            cursos={cursos}
                            clicked={clicked}
                            handleCursoSeleccionado={
                                handleCursoSeleccionado
                            }
                            handleRemoveCurso={handleRemoveCurso}
                        />
                        {/* Hacemos un map por cursos PERO solo se renderizara el que este clickeado (variable clicked) */}
                        <div className={`d-flex align-items-center mb-2 ${classes.containerGA}`} >
                            <label className={classes.datosResultado}>
                                Tipo de Evidencias:
                            </label>
                            <div className="me-1"></div>
                            <input
                                id="tipoEvidencias"
                                type="text"
                                name="tipoEvidencias"
                                className="form-control me-auto"
                                style={{
                                    backgroundColor: "white",
                                    width: "300px",
                                }}
                                maxLength="200"
                                value={medicion.tipoEvidencias}
                                onChange={handleChangeTipoEvidencias}
                            ></input>
                            <Button
                                id="buttonAgregar"
                                className={classes.btn}
                                variant="contained"
                                size="small"
                                color="secondary"
                                endIcon={<AddCircleOutlineIcon />}
                                onClick={() => handleNuevoHorario()}
                            >
                                Insertar
                            </Button>
                        </div>

                        <div className={classes.contenedorFormulario}>
                            {/* <MenuFiltroMediciones />     */}
                            {cursos.map((curso, index) => {
                                if (index === clicked) {
                                    return (
                                        <ContenedorMediciones
                                            key={index}
                                            cursos={cursos}
                                            setCursos={setCursos}
                                            handleRemoveHorario={
                                                handleRemoveHorario
                                            }
                                            index={index}
                                            handleChangeHorario={handleChangeHorario}
                                            medicion={medicion}
                                            setMedicion={setMedicion}
                                        />
                                    );
                                }
                            })}
                        </div>

                        <div className="row justify-content-center mt-5">
                            <div className="col-sm-4 col-md-3 col-lg-2">
                                <Link
                                    to="/gestionarPlanesMedicion"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        size="small"
                                        endIcon={<ClearIcon />}
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
                            </div>
                            <div className="col-sm-4 col-md-3 col-lg-2">
                                <Button
                                    className={classes.btn}
                                    id="btnGuardar"
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    endIcon={<CheckIcon />}
                                    onClick={submit}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    } else {
        return <div></div>
    }
};

export default ProgramarMedicion;
