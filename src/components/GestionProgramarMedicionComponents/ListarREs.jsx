import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuFiltrosRE from "./MenuFiltrosRE";
import CardBusquedaRE from "./CardBusquedaRE";
import InputBusquedas from "../ComunesComponents/InputBusquedas";
import resultado from "../../mockObjects/ResultadoEstudiante/mockResultado";
import SecureLS from "secure-ls";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ciclos from "../../mockObjects/Semestres/mockCiclos";
import instance from "../../instance";
import ProgramaMedicionContext from "../../context/ProgramaMedicionContext/ProgramaMedicionContext";

const useStyle = makeStyles((theme) => ({
    btn: {
        height: "80%",
        width: "auto",
        fontWeight: "bolder",
        fontFamily: theme.typography.fontFamily.roboto,
    },
}));

const ListarREs = ({ handleClose, idSemestre }) => {
    //Acceso al local storage
    const ls = new SecureLS({ encodingType: "aes" });
    let current = instance.getItem('sasaGurudumu');
    let idPrograma = current.idPrograma;
    //styles
    const classes = useStyle();
    const [searchTerm, setSearchTerm] = useState("");
    const [noResultados, setNoResultados] = useState(null);
    const [allSelected, setAllSelected] = useState(false);
    const [resultadosSeleccionados, setResultadosSeleccionados] = useState([]);
    const { resultadosNoMedicion, asignarResultadoMedicion, fetchProgramasMedicion, fetchNoResultadoEstudiante } = useContext(
        ProgramaMedicionContext
    );

    const onChange = (criterio) => {
        fetchNoResultadoEstudiante(idPrograma, idSemestre, criterio);
    }

    const verificarResultados = (checked, resultado) => {
        if (checked) {
            agregarResultados(resultado);
        }
        else {
            eliminarResultados(resultado);
        }
    }

    const agregarResultados = (resultado) => {
        let temp = JSON.parse(JSON.stringify(resultado));
        setResultadosSeleccionados([...resultadosSeleccionados, temp]);
    }

    const eliminarResultados = (resultado) => {
        const nuevosResultadosSeleccionados = resultadosSeleccionados.filter(resultadoSeleccionado => resultadoSeleccionado.idResultadoEstudiante !== resultado.idResultadoEstudiante)
        setResultadosSeleccionados(nuevosResultadosSeleccionados);
    }

    useEffect(() => {
        fetchNoResultadoEstudiante(idPrograma, idSemestre);
    }, []);

    useEffect(() => {
        if (resultadosNoMedicion) {
            setNoResultados(resultadosNoMedicion)
        }

    }, [resultadosNoMedicion])

    if (noResultados) {
        return (
            <div>
                <div className="row d-flex mb-4">
                    <h3
                        className="text-center col-lg-8 offset-lg-2 col-sm-8 offset-sm-2 col-xs-4"
                        style={{ fontWeight: "bold" }}
                    >
                        Agregar Resultados de Estudiante
                </h3>
                </div>
                <div className="container-fluid px-5">
                    <div className="mb-3 row d-flex justify-content-between">
                        <div className="col-lg-6 col-md-6 d-none d-sm-none d-md-block d-lg-block">
                            <InputBusquedas
                                placeHolder_Default="Buscar por Código o Sumilla"
                            /* onChange={onChange} */
                            />
                        </div>
                        <div className="d-flex col-lg-3 col-md-3 col-sm-3 col-3 justify-content-end">
                            <Button
                                className={classes.btn}
                                variant="contained"
                                size="small"
                                color="secondary"
                                endIcon={<AddCircleOutlineIcon />}
                                onClick={() => {
                                    console.log(resultadosSeleccionados);
                                    asignarResultadoMedicion(idPrograma, idSemestre, resultadosSeleccionados);
                                    handleClose();
                                }}
                            >
                                Añadir
                        </Button>
                        </div>
                    </div>

                    <div
                        className="container h-100 py-1 px-1 align-items-center justify-content-center"
                        style={{ backgroundColor: "white", borderRadius: "5px" }}
                    >
                        <div>
                            <MenuFiltrosRE
                                setAllSelected={setAllSelected}
                                allSelected={allSelected}
                            />
                        </div>
                        <div
                            className="list-group overflow-auto mb-4"
                            style={{ maxHeight: "350px" }}
                        >
                            {noResultados.map((resultado) => {
                                /* let isSelected = false;
                                resultado = { ...resultado, ...isSelected }; */
                                return (
                                    <div
                                        className="mt-2 col-md-12"
                                        key={resultado.id}
                                    >
                                        <CardBusquedaRE
                                            key={resultado.id}
                                            resultado={resultado}
                                            handleClose={handleClose}
                                            verificarResultados={verificarResultados}
                                            setAllSelected={setAllSelected}
                                            allSelected={allSelected}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <div></div>
    }
};

export default ListarREs;
