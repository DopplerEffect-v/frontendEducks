import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuFiltrosObjetivosEducacionales from "../GestionObjetivosEducacionalesComponents/MenuFiltrosObjetivosEducacionales";
import CardBusquedaObjetivosEducacionales from "../GestionObjetivosEducacionalesComponents/CardBusquedaObjetivosEducacionales";
import InputBusquedas from "../ComunesComponents/InputBusquedas";
import objetivos from "../../mockObjects/ObjetivoEducacional/mockObjetivos";
import instance from "../../instance";

import ObjetivoEducacionalContext from "../../context/ObjetivoEducacionalContext/ObjetivoEducacionalContext";

const useStyle = makeStyles((theme) => ({
    btnRegistrarUsuario: {
        background: "#970000",
        "&:hover": {
            background: "#760303",
        },
        color: "white",
    },
}));

const ListarObjetivos = ({ handleClose, addObjetivo,append }) => {
    //Acceso al local storage
    let current = instance.getItem("sasaGurudumu");
    let idPrograma = current.idPrograma;
    //styles
    const classes = useStyle();
    const [searchTerm, setSearchTerm] = useState("");
    const { objetivosEducacionales, fetchObjetivosEducacionales } = useContext(
        ObjetivoEducacionalContext
    );

    useEffect(() => {
        fetchObjetivosEducacionales(idPrograma);
    }, []);

    return (
        <div>
            <div className="row d-flex mb-4">
                <h2
                    className="text-center col-lg-8 offset-lg-2 col-sm-8 offset-sm-2 col-xs-4"
                    style={{ fontWeight: "bold" }}
                >
                    Búsqueda de Objetivos Educacionales
                </h2>
            </div>
            <div className="container-fluid px-5">
                <div className="mb-3 row">
                    <div className="col-6">
                        <InputBusquedas
                            placeHolder_Default="Buscar por Código o Sumilla"
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                </div>

                <div
                    className="container h-100 pt-1 px-0 align-items-center justify-content-center"
                    style={{ backgroundColor: "white" }}
                >
                    <div>
                        <MenuFiltrosObjetivosEducacionales />
                    </div>
                    <div
                        className="list-group overflow-auto mb-4"
                        style={{ maxHeight: "350px" }}
                    >
                        {objetivosEducacionales.map((objetivo) => {
                            return (
                                <div
                                    className="mt-2 col-md-12"
                                    key={objetivo.idObjetivoEducacional}
                                >
                                    <CardBusquedaObjetivosEducacionales
                                        objetivo={objetivo}
                                        idPrograma={idPrograma}
                                        handleClose={handleClose}
                                        addObjetivo={addObjetivo}
                                        append={append}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListarObjetivos;
