import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarSemestresStyles from "./GestionarSemestresStyles";
import Loading from "../Loading/Loading";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalConfirmacionRegistro from "./ModalConfirmacionRegistro";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import { useForm, FormProvider } from "react-hook-form";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SemestreContext from "../../context/SemestreContext/SemestreContext";
import Footer from "../../components/PaginaComponents/Footer"
import AuthContext from "../../context/AuthContext/AuthContext";
import instance from "../../instance";

const GestionarSemestres = () => {
    const { loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem('sasaGurudumu'));
    const classes = GestionarSemestresStyles();
    const [loading, setLoading] = useState(true);
    const [openRegistro, setOpenRegistro] = React.useState(false);
    const [openEliminacion, setOpenEliminacion] = React.useState(false);
    const { cicloActual, ultimoProgramado, ultimoAgregado, primerAgregar, detalleSemestres, addSemestres, deleteSemestres, fetchDetalleSemestre } =
        useContext(SemestreContext);
    const history = useHistory();

    const methodsAgregar = useForm({
        mode: "onChange",
        shouldFocusError: true,
    });
    const methodsEliminar = useForm({
        mode: "onChange",
        shouldFocusError: true,
    });
    var cad1 = "";

    //Validaciones


    const validarAgregar2 = () => {
        const data = {
            agno: document.getElementsByName("agno")[0].value,
            ciclo: document.getElementsByName("ciclo")[0].value
        }
        console.log(data.agno, "agno ")
        console.log(data.ciclo, "ciclo")
        const cadInputAnio = parseInt(data.agno);
        const cadInputCiclo = parseInt(data.ciclo);

        const cadUltAn = ultimoAgregado.split("-");
        const ultAnAnio = parseInt(cadUltAn[0]);
        const ultAnCiclo = parseInt(cadUltAn[1]);

        const cadUltProg = ultimoProgramado.split("-");
        const ultProgAnio = parseInt(cadUltProg[0]);
        const ultProgCiclo = parseInt(cadUltProg[1]);

        const valAn = ultAnAnio * 10 + ultAnCiclo;
        const valProg = ultProgAnio * 10 + ultProgCiclo;
        const valInput = cadInputAnio * 10 + cadInputCiclo;

        if (valInput > valAn) {
            console.log(valInput, valAn, "valInput y valAn")
            methodsAgregar.clearErrors("anioEliminarMayor");
            return true;
        }
        else {
            console.log(valInput, valAn, "valInput y valAn")
            methodsAgregar.setError("anioEliminarMayor", { message: "Para añadir debe ser mayor a último agregado" });
            return false
        };
    }

    const validarEliminar2 = () => {
        //tiene que ser mayor a ultimo programado y menor a ultimo anadido
        if (ultimoProgramado === "---" && ultimoAgregado === "---"){
            methodsEliminar.setError("anioEliminarMenor", { message: "No hay semestres registrados" });
            return false;
        }
        const data = {
            agno2: document.getElementsByName("agno2")[0].value,
            ciclo2: document.getElementsByName("ciclo2")[0].value
        }
        console.log(data.agno2, "agno ")
        console.log(data.ciclo2, "ciclo")
        console.log(cicloActual , "ciclo Actual")
        const cadActual = cicloActual.split("-")
        const actualAnio = parseInt(cadActual[0]);
        const actualCiclo = parseInt(cadActual[1]);

        const cadUltAn = ultimoAgregado.split("-");
        const ultAnAnio = parseInt(cadUltAn[0]);
        const ultAnCiclo = parseInt(cadUltAn[1]);

        const cadInputAnio = parseInt(data.agno2);
        const cadInputCiclo = parseInt(data.ciclo2);

        const cadUltProg = ultimoProgramado.split("-");
        
        const ultProgAnio = parseInt(cadUltProg[0]);
        const ultProgCiclo = parseInt(cadUltProg[1]);
        //Verificar ultimo anadido
        const valAn = ultAnAnio * 10 + ultAnCiclo;
        const valProg = ultProgAnio * 10 + ultProgCiclo;
        const valInput = cadInputAnio * 10 + cadInputCiclo;
        const valActual = actualAnio*10 + actualCiclo;

        
        if (ultimoProgramado === "---" && valInput <= valAn && valInput > valActual){
            methodsEliminar.clearErrors("anioEliminarMenor");
            return true;
        }

        if (valInput > valProg && valInput <= valAn) {
            methodsEliminar.clearErrors("anioEliminarMenor");
            return true;
        }
        else {
            methodsEliminar.setError("anioEliminarMenor", { message: "Para eliminar debe ser mayor a último programado y menor a último agregado" });
            return false;
        };
    }



    /* const semestres = {
        "cicloActual": "2021-1",
        "ultimoCicloProgramado": "2022-1",
        "primerCicloEliminable": "2022-2",
        "últimoCicloAgregado": "2025-1",
    } */

    //Handlers
    const handleOpenRegistro = () => {
        setOpenRegistro(true);
    };
    const handleCloseRegistro = () => {
        setOpenRegistro(false);
    };
    const handleOpenEliminacion = () => {
        setOpenEliminacion(true);
    };
    const handleCloseEliminacion = () => {
        setOpenEliminacion(false);
    };

    /*  const onSubmitAgregar = (data) => {
         if (validarAgregar(data)) {
             console.log(data);
             addSemestres(data).then(() => {
                 history.push("/");
                 history.push("/gestionarSemestres");
             });
         } else {
             methodsAgregar.setError("anioEliminarMayor", { message: "Para añadir debe ser mayor a último agregado" });
             return;
         }
     } */

    const onSubmitAgregar = (data) => {

        console.log(data);
        addSemestres(data).then(() => {
            history.push("/");
            history.push("/gestionarSemestres");
        });

    }

    /*  const onSubmitEliminar = (data) => {
         console.log(validarEliminar(data));
         if (validarEliminar(data)) {
             console.log(data);
             deleteSemestres(data).then(() => {
                 history.push("/");
                 history.push("/gestionarSemestres");
             });
         } else {
             methodsEliminar.setError("anioEliminarMenor", { message: "Para eliminar debe ser mayor a último programado y menor a último agregado" });
             console.log(cad1, "dentro de submit");
             cad1 = "Debe ser mayor a último programado";
             console.log(cad1, "despues de asignar");
             console.log(methodsEliminar.errors, "errors on submit");
             return;
         }
     } */

    const onSubmitEliminar = (data) => {
        /* console.log(validarEliminar2(data)); */
        console.log(data);
        deleteSemestres(data).then(() => {
            history.push("/");
            history.push("/gestionarSemestres");
        });

    }

    useEffect(() => {
        loadUser();
        setRol(instance.getItem('sasaGurudumu'));
        fetchDetalleSemestre();
        methodsAgregar.register("agno");
        methodsAgregar.setValue("agno", null);
        methodsAgregar.register("ciclo");
        methodsAgregar.setValue("ciclo", null);
        methodsEliminar.register("agno2");
        methodsEliminar.setValue("agno2", null);
        methodsEliminar.register("ciclo2");
        methodsEliminar.setValue("ciclo2", null);
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading />;
    }
    return (

        <div className="container-lg" style={{ minHeight: "1000px" }}>
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

                <div className={`col ${classes.contenedor}`} style={{ minHeight: "700px" }}>
                    <h3 style={{ fontWeight: "bold", marginBottom: "2%" }}>
                        Gestionar Semestres
                            </h3>


                    <div className={`${classes.espacio}`}>

                        <div className="row align-items-center mb-5">
                            <div className="col-3 fw-bold text-start">Ciclo Actual:</div>
                            <div className="col-2 text-center rounded-pill" style={{ backgroundColor: "#DADADA" }}>
                                {cicloActual}
                            </div>
                            <div className="col"></div>
                        </div>

                        <div className="row align-items-center mb-5">
                            <div className="col-3 fw-bold text-start">Último Ciclo Programado:</div>
                            <div className="col-2 text-center rounded-pill" style={{ backgroundColor: "#DADADA" }}>
                                {ultimoProgramado}
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3 fw-bold text-start">Último Ciclo Agregado:</div>
                            <div className="col-2 text-center rounded-pill" style={{ backgroundColor: "#DADADA" }}>
                                {ultimoAgregado}
                            </div>
                        </div>
                        <FormProvider {...methodsAgregar}>
                            <form>
                                <div className="row align-items-center mb-5">
                                    <div className="col" >
                                        <div className="row align-items-center">
                                            <div className="col-4 text-center">
                                                <div className="fw-bold text-start">Agregar Semestres desde: </div>
                                                {/* <div style={{ color: "#818181", fontSize: "12px" }}>(*) El ciclo ingresado debe ser mayor al último ciclo agregado</div> */}
                                            </div>
                                            <div className="col-2 text-center">
                                                <input
                                                    className="rounded-pill text-center"
                                                    style={{ width: "100%" }}
                                                    disabled
                                                    type="text"
                                                    id=""
                                                    name="primerAgregado"
                                                    value={primerAgregar} />
                                            </div>

                                            <div className="col-2 text-center">
                                                <div className="fw-bold text-center">Hasta: </div>
                                                {/* <div style={{ color: "#818181", fontSize: "12px" }}>(*) El ciclo ingresado debe ser mayor al último ciclo agregado</div> */}
                                            </div>

                                            <div className="col">
                                                <div className="row align items center">
                                                    <div className="col-6 text-center">
                                                        <input
                                                            className="rounded-pill"
                                                            style={{ width: "100%", backgroundColor: "white", textAlign: "center" }}
                                                            type="text"
                                                            ref={methodsAgregar.register({
                                                                required: {
                                                                    value: true,
                                                                    message: "Para añadir ingrese un año y semestre"
                                                                },
                                                                minLength: {
                                                                    value: 4,
                                                                    message: "Para añadir ingrese un año válido"
                                                                },
                                                                maxLength: {
                                                                    value: 4,
                                                                    message: "Para añadir ingrese un año válido"
                                                                },
                                                                pattern: {
                                                                    value: /[0-9]{4,4}/,
                                                                    message: "Para añadir ingrese solo números"
                                                                },
                                                                max: {
                                                                    value: 2100,
                                                                    message: "Para añadir ingrese un año menor a 2100"
                                                                }
                                                            })}
                                                            name="agno"
                                                            placeholder=" año"
                                                        />


                                                    </div>
                                                    <div className="col-1 text-center p-0">
                                                        -
                                                         </div>
                                                    <div className="col-4 text-center">
                                                        <input
                                                            className="rounded-pill"
                                                            style={{ width: "100%", backgroundColor: "white", textAlign: "center" }}
                                                            type="text"
                                                            ref={methodsAgregar.register({
                                                                required: {
                                                                    value: true,
                                                                    message: "Para añadir ingrese un año y semestre"
                                                                },
                                                                minLength: {
                                                                    value: 1,
                                                                    message: "Para añadir ingrese un semestre válido"
                                                                },
                                                                maxLength: {
                                                                    value: 1,
                                                                    message: "Para añadir ingrese un semestre válido"
                                                                },
                                                                pattern: {
                                                                    value: /[1-2]/,
                                                                    message: "Para añadir ingrese en ciclo valores de 1-2"
                                                                }
                                                            })}
                                                            name="ciclo"
                                                            placeholder=" ciclo"
                                                            onChange={validarAgregar2}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-2">

                                        <Button
                                            id="buttonAnadir"
                                            className={classes.btn}
                                            style={{ width: "100px" }}
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            endIcon={<AddIcon />}
                                            onClick={() => {

                                                methodsAgregar.trigger().then(() => {
                                                    validarAgregar2();

                                                    if (Object.keys(methodsAgregar.formState.errors).length == 0) {
                                                        console.log(methodsAgregar.formState.errors)
                                                        handleOpenRegistro()
                                                    }
                                                });
                                            }}
                                        >
                                            Añadir
                                            </Button>


                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={openRegistro}
                                            onClose={handleCloseRegistro}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade timeout={5} in={openRegistro}>
                                                <div className="container h-100 d-flex align-items-center justify-content-center">
                                                    <div
                                                        className={`h-auto pb-5 ${classes.popup}`}
                                                    >
                                                        <ModalConfirmacionRegistro
                                                            handleClose={
                                                                handleCloseRegistro
                                                            }
                                                            onSubmitAgregar={onSubmitAgregar}
                                                        />
                                                    </div>
                                                </div>
                                            </Fade>
                                        </Modal>
                                    </div>

                                </div>
                            </form>
                        </FormProvider>
                        <FormProvider {...methodsEliminar}>
                            <form>
                                <div className="row align-items-center mb-5">
                                    <div className="col" >
                                        <div className="row align-items-center">
                                            <div className="col-4 text-center">
                                                <div className="fw-bold text-start">Eliminar Semestres desde: </div>
                                                {/* <div style={{ color: "#818181", fontSize: "12px" }}>(*) El ciclo ingresado debe ser mayor al último ciclo agregado</div> */}
                                            </div>

                                            <div className="col">
                                                <div className="row align items center">
                                                    <div className="col-6 text-center">
                                                        <input
                                                            className="rounded-pill"
                                                            style={{ width: "100%", backgroundColor: "white", textAlign: "center" }}
                                                            type="text"
                                                            ref={methodsEliminar.register({
                                                                required: {
                                                                    value: true,
                                                                    message: "Para eliminar ingrese un año y semestre"
                                                                },
                                                                minLength: {
                                                                    value: 4,
                                                                    message: "Para eliminar ingrese un año válido"
                                                                },
                                                                maxLength: {
                                                                    value: 4,
                                                                    message: "Para eliminar ingrese un año válido"
                                                                },
                                                                pattern: {
                                                                    value: /[0-9]{4,4}/,
                                                                    message: "Para eliminar ingrese solo números"
                                                                },
                                                                min: {
                                                                    value: 1950,
                                                                    message: "Para eliminar debe ser mayor a último programado y menor a último agregado"
                                                                },
                                                                max: {
                                                                    value: 3000,
                                                                    message: "Para eliminar debe ser mayor a último programado y menor a último agregado"
                                                                },
                                                                /* validate: value => validarAnioEliminar(value) || "Debe ser mayor a último programado", */

                                                            })}
                                                            name="agno2"
                                                            placeholder=" año"
                                                        />

                                                    </div>
                                                    <div className="col-1 text-center p-0">
                                                        -
                                                         </div>
                                                    <div className="col-4 text-center">
                                                        <input
                                                            className="rounded-pill"
                                                            style={{ width: "100%", backgroundColor: "white", textAlign: "center" }}
                                                            type="text"
                                                            ref={methodsEliminar.register({
                                                                required: {
                                                                    value: true,
                                                                    message: "Para eliminar ingrese un año y semestre"
                                                                },
                                                                minLength: {
                                                                    value: 1,
                                                                    message: "Para eliminar ingrese un semestre válido"
                                                                },
                                                                maxLength: {
                                                                    value: 1,
                                                                    message: "Para eliminar ingrese un semestre válido"
                                                                },
                                                                pattern: {
                                                                    value: /[1-2]/,
                                                                    message: "Para eliminar ingrese en ciclo valores de 1-2"
                                                                }
                                                            })}
                                                            name="ciclo2"
                                                            placeholder=" ciclo"
                                                            onChange={validarEliminar2}
                                                        />

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-2 text-center">
                                                <div className="fw-bold text-center">Hasta: </div>
                                                {/* <div style={{ color: "#818181", fontSize: "12px" }}>(*) El ciclo ingresado debe ser mayor al último ciclo agregado</div> */}
                                            </div>


                                            <div className="col-2 text-center">
                                                <input className="rounded-pill text-center" style={{ width: "100%" }} disabled type="text" id="" name="ultimoAgregado" value={ultimoAgregado} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-2">

                                        <Button
                                            id="buttonEliminar"
                                            style={{ width: "100px" }}
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            endIcon={<DeleteIcon />}
                                            onClick={() => {
                                                methodsEliminar.trigger().then(() => {
                                                    validarEliminar2();

                                                    if (Object.keys(methodsEliminar.formState.errors).length == 0) {
                                                        console.log(methodsEliminar.formState.errors)

                                                        handleOpenEliminacion()
                                                    }
                                                });

                                            }}

                                        >
                                            Eliminar
                                            </Button>
                                        {console.log(methodsEliminar.errors, "desde el boton")}
                                        {console.log(methodsEliminar.errors, "errors on submit 2")}
                                        {console.log(cad1, "cadena")}


                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={openEliminacion}
                                            onClose={handleCloseEliminacion}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade timeout={5} in={openEliminacion}>
                                                <div className="container h-100 d-flex align-items-center justify-content-center">
                                                    <div
                                                        className={`h-auto pb-5 ${classes.popup}`}
                                                    >
                                                        <ModalConfirmacionEliminacion
                                                            handleClose={
                                                                handleCloseEliminacion
                                                            }
                                                            onSubmitEliminar={onSubmitEliminar}
                                                        />
                                                    </div>
                                                </div>
                                            </Fade>
                                        </Modal>

                                    </div>

                                </div>

                                
                                <span> <Typography id="erroresAgregar" variant='body2' color='error'>{methodsAgregar.errors?.agno?.message || methodsAgregar.errors?.ciclo?.message || methodsAgregar.errors?.anioEliminarMayor?.message}</Typography></span>                                
                                <span> <Typography id="erroresEliminar" variant='body2' color='error'>{methodsEliminar.errors?.agno2?.message || methodsEliminar.errors?.ciclo2?.message || methodsEliminar.errors?.anioEliminarMenor?.message}</Typography></span>

                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default GestionarSemestres;
