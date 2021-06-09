import React, { createElement, useEffect, useState } from "react";
import CardCursos from "../../components/GestionCursosComponents/CardCursos";
import MenuFiltrosCursos from "../../components/GestionCursosComponents/MenuFiltrosCursos";
import Input_Busquedas from "../../components/ComunesComponents/InputBusquedas";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AuthContext from "../../context/AuthContext/AuthContext";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarCursosStyles from "./GestionarCursosStyles";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import CursoContext from "../../context/CursoContext/CursoContext";
import instance from "../../instance";
import Footer from "../../components/PaginaComponents/Footer";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

const GestionarCursos = () => {
    let current = instance.getItem("sasaGurudumu");
    let fidPrograma = current.idPrograma;
    let nombrePrograma = current.nombrePrograma;
    const classes = GestionarCursosStyles();
    const [loading, setLoading] = useState(true);
    const { currentRol, loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
    //context
    const { cursos, fetchCursos, addCurso, existeCurso } =
        useContext(CursoContext);

    const [searchTerm, setSearchTerm] = useState("");
    const { addToast } = useToasts();

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        fetchCursos(fidPrograma);

        setLoading(false);
    }, []);
    if (loading) {
        return <Loading />;
    }
    const onChange = (criterio) => {
        fetchCursos(fidPrograma, criterio)
    }
    return (
        <div className={classes.root}>
            <div className={classes.opacity}>
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
                                Gestionar Cursos
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
                                            placeHolder_Default="Buscar Curso"
                                            //handleKeyPress={handleKeyPress}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="col-2 offset-2 d-flex justify-content-end p-0">
                                        <Button
                                            className={classes.btn}
                                            id="botonNuevo"
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            endIcon={<AddIcon />}
                                            onClick={() => {
                                                var firstelement =
                                                    document.getElementsByClassName(
                                                        "container-fluid mx-auto"
                                                    )[0];
                                                //firstelement.insertAdjacentHTML("afterEnd",`<div id="cursonuevo" style="font-size: 90%;" class="container-fluid mx-auto row align-items-center py-2 mb-2"><input id="codigo" class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " style="margin-right: 60px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;width: 20%;" placeholder="Ingresar código ..."><input class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block" placeholder="Ingresar nombre ..." style="margin-right: 20px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;"></div>`);
                                                /*firstelement.insertAdjacentHTML("afterEnd",`<div id="cursonuevo"><div style="font-size: 90%;padding-bottom: 0px !important;margin-bottom: 0px !important;" class="container-fluid mx-auto row align-items-center py-2 mb-2"><input id="codigonuevo" class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " style="margin-right: 60px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;width: 20%;padding: 5px;" placeholder="Ingresar código ...">
                                                    <input class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block" placeholder="Ingresar nombre ..." style="margin-right: 20px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;padding: 5px;"></div>
                                                    <div style="font-size: 70%;color: red;" id="validaciones" class="container-fluid mx-auto row align-items-center mb-2"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " style="" id="validaCod"></div>
                                                    <div id="validaNom" class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block"></div></div></div>`);
                                                    */
                                                firstelement.insertAdjacentHTML(
                                                    "afterEnd",
                                                    `<div id="cursonuevo"><div style="font-size: 90%;padding-bottom: 0px !important;margin-bottom: 0px !important;" class="container-fluid mx-auto row align-items-center py-2 mb-2"><input id="codigonuevo" class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " style="margin-right: 60px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;width: 20%;padding: 5px;" placeholder="Ingresar código ..."><input id="nombreCurso" class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block" placeholder="Ingresar nombre ..." style="margin-right: 20px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;padding: 5px;"></div><div style="font-size: 70%;color: red;" id="validaciones" class="container-fluid mx-auto row align-items-center mb-2"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " style="" id="validaCod"></div>
                                                    <div id="validaNom" class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block"></div></div></div>`
                                                );

                                                document.getElementById(
                                                    "botonNuevo"
                                                ).style.backgroundColor =
                                                    "gray";
                                                document.getElementById(
                                                    "botonNuevo"
                                                ).style.pointerEvents = "none";
                                                let inputcodigoCur =
                                                    document.querySelectorAll(
                                                        "div.mx-auto>input"
                                                    )[0];
                                                let inputnombreCur =
                                                    document.querySelectorAll(
                                                        "div.mx-auto>input"
                                                    )[1];
                                                inputcodigoCur.select();
                                                var enter = false;

                                                [
                                                    inputcodigoCur,
                                                    inputnombreCur,
                                                ].forEach(function (
                                                    inputnuevo
                                                ) {
                                                    inputnuevo.addEventListener(
                                                        "keypress",
                                                        function (e) {
                                                            if (
                                                                e.key == "Enter"
                                                            ) {
                                                                /*fetch('http://54.162.5.155:8000/api/curso/existeCursoGeneral',{
                                                                    method:'POST',
                                                                }).then(data=>{
                                                                    console.log(data)
                                                                })*/

                                                                var encontrado = false;
                                                                for (
                                                                    var i = 0;
                                                                    i <
                                                                    document.querySelectorAll(
                                                                        "#codigo"
                                                                    ).length;
                                                                    i++
                                                                )
                                                                    if (
                                                                        document
                                                                            .querySelectorAll(
                                                                                "#codigo"
                                                                            )
                                                                        [
                                                                            i
                                                                        ].innerText.toUpperCase() ==
                                                                        inputcodigoCur.value.toUpperCase()
                                                                    ) {
                                                                        encontrado = true;
                                                                        break;
                                                                    }

                                                                if (
                                                                    encontrado
                                                                ) {
                                                                    const Toast =
                                                                        Swal.mixin(
                                                                            {
                                                                                toast: true,
                                                                                position:
                                                                                    "top-end",
                                                                                showConfirmButton: false,
                                                                                timer: 3000,
                                                                                timerProgressBar: true,
                                                                                didOpen:
                                                                                    (
                                                                                        toast
                                                                                    ) => {
                                                                                        toast.addEventListener(
                                                                                            "mouseenter",
                                                                                            Swal.stopTimer
                                                                                        );
                                                                                        toast.addEventListener(
                                                                                            "mouseleave",
                                                                                            Swal.resumeTimer
                                                                                        );
                                                                                    },
                                                                            }
                                                                        );

                                                                    Toast.fire({
                                                                        icon: "error",
                                                                        title: "El curso ya está registrado",
                                                                    });
                                                                }
                                                                if (
                                                                    inputcodigoCur
                                                                        .value
                                                                        .length <
                                                                    6 ||
                                                                    inputcodigoCur
                                                                        .value
                                                                        .length >
                                                                    6
                                                                ) {
                                                                    enter = true;
                                                                    document.getElementById(
                                                                        "validaCod"
                                                                    ).innerText =
                                                                        "Debe tener 6 caracteres";
                                                                }
                                                                if (
                                                                    inputnombreCur
                                                                        .value
                                                                        .length ==
                                                                    0
                                                                ) {
                                                                    enter = true;
                                                                    document.getElementById(
                                                                        "validaNom"
                                                                    ).innerText =
                                                                        "No puede ser vacío";
                                                                }
                                                                if (
                                                                    inputnombreCur
                                                                        .value
                                                                        .length >
                                                                    100
                                                                ) {
                                                                    enter = true;
                                                                    document.getElementById(
                                                                        "validaNom"
                                                                    ).innerText =
                                                                        "No puede tener más de 100 caracteres";
                                                                }
                                                                if (!encontrado && inputcodigoCur.value.length == 6 && inputnombreCur.value.length > 0 && inputnombreCur.value.length <= 100) {
                                                                    document.getElementById("botonNuevo").removeAttribute("style");
                                                                    addCurso(
                                                                        fidPrograma,
                                                                        inputcodigoCur.value.toUpperCase(),
                                                                        inputnombreCur.value
                                                                    ).then(
                                                                        () => {
                                                                            fetchCursos(
                                                                                fidPrograma
                                                                            );
                                                                        }
                                                                    );
                                                                    document.getElementById("cursonuevo").remove();
                                                                }
                                                            }
                                                        }
                                                    );
                                                });
                                                inputcodigoCur.addEventListener(
                                                    "input",
                                                    function (e) {
                                                        if (enter == true) {
                                                            if (
                                                                inputcodigoCur
                                                                    .value
                                                                    .length <
                                                                6 ||
                                                                inputcodigoCur
                                                                    .value
                                                                    .length > 6
                                                            )
                                                                document.getElementById(
                                                                    "validaCod"
                                                                ).innerText =
                                                                    "Debe tener 6 caracteres";

                                                            if (
                                                                inputcodigoCur
                                                                    .value
                                                                    .length == 6
                                                            )
                                                                document.getElementById(
                                                                    "validaCod"
                                                                ).innerText =
                                                                    "";

                                                        }
                                                    }
                                                );
                                                inputnombreCur.addEventListener(
                                                    "input",
                                                    function (e) {
                                                        if (enter == true) {
                                                            if (
                                                                inputnombreCur
                                                                    .value
                                                                    .length == 0
                                                            )
                                                                document.getElementById(
                                                                    "validaNom"
                                                                ).innerText =
                                                                    "No puede ser vacío";

                                                            if (
                                                                inputnombreCur
                                                                    .value
                                                                    .length > 0
                                                            )
                                                                document.getElementById(
                                                                    "validaNom"
                                                                ).innerText =
                                                                    "";
                                                            if (
                                                                inputnombreCur
                                                                    .value
                                                                    .length >
                                                                100
                                                            ) {                                                                
                                                                document.getElementById(
                                                                    "validaNom"
                                                                ).innerText =
                                                                    "No puede tener más de 100 caracteres";
                                                            }
                                                            if (
                                                                inputnombreCur
                                                                    .value
                                                                    .length <=
                                                                100
                                                            ) {                                                                
                                                                document.getElementById(
                                                                    "validaNom"
                                                                ).innerText =
                                                                    "";
                                                            }
                                                        }
                                                    }
                                                );

                                                //var once=false;
                                                document.onkeydown = function (
                                                    e
                                                ) {
                                                    e = e || window.event;
                                                    if (
                                                        (e.keyCode == 27) &
                                                        (document.getElementById(
                                                            "cursonuevo"
                                                        ) !=
                                                            null)
                                                    ) {
                                                        //tecla Escape
                                                        //document.getElementById("botonNuevo").removeAttribute("style");
                                                        //document.getElementsByClassName("container-fluid mx-auto ")[1].remove();
                                                        //document.getElementById("cursonuevo").remove();
                                                        //if (document.querySelectorAll("#filaCurso")) document.querySelectorAll("#filaCurso").forEach(elem=>elem.removeAttribute("style"));
                                                        //if (document.querySelectorAll("#cursoeditar")) document.querySelectorAll("#cursoeditar").forEach(elem=>elem.remove());
                                                        //once=true;

                                                        //Este sí sirve
                                                        if (
                                                            document.getElementById(
                                                                "botonNuevo"
                                                            )
                                                        )
                                                            document
                                                                .getElementById(
                                                                    "botonNuevo"
                                                                )
                                                                .removeAttribute(
                                                                    "style"
                                                                );
                                                        if (
                                                            document.getElementById(
                                                                "cursonuevo"
                                                            )
                                                        )
                                                            document
                                                                .getElementById(
                                                                    "cursonuevo"
                                                                )
                                                                .remove();
                                                    }
                                                };
                                            }}
                                        >
                                            Nuevo
                                        </Button>
                                    </div>
                                </div>

                                <MenuFiltrosCursos />
                                <div className="h-100">
                                    <div
                                        className="p-0 overflow-auto"
                                        style={{ height: "480px" }}
                                    >
                                        {cursos
                                            .filter((val) => {
                                                if (searchTerm === "") {
                                                    return val;
                                                } else if (
                                                    val.codigo
                                                        .toLowerCase()
                                                        .includes(
                                                            searchTerm.toLowerCase()
                                                        ) ||
                                                    val.nombre
                                                        .toLowerCase()
                                                        .includes(
                                                            searchTerm.toLowerCase()
                                                        )
                                                ) {
                                                    return val;
                                                }
                                            })
                                            .map((curso) => {
                                                return (
                                                    <CardCursos
                                                        key={curso.idCurso}
                                                        curso={curso}
                                                        fidPrograma={
                                                            fidPrograma
                                                        }
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
            </div>
        </div>
    );
    //Lógica del botón Nuevo
    console.log("Holi boli");
};

export default GestionarCursos;
