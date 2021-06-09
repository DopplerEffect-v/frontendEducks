import React, { useState, useEffect } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import MenuFiltrosUsuarios from "./MenuFiltrosUsuarios";
import InputBusquedas from "../ComunesComponents/InputBusquedas";
import CardBusquedaAsistentes from "./CardBusquedaAsistentes";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ListarAsistentes from "./ListarAsistentes";
import RegistrarUsuario from "./RegistrarUsuario";
//usuarios context
import { useContext } from "react";
import AsistentesContext from "../../context/AsistentesContext/AsistentesContext";

const useStyles = makeStyles({
    button: {
        width: "40px",
        height: "40px",
    },
});

const BuscarAsistentes = ({ idPrograma, handleClose}) => {
    const [toggleFetch, setToggleFetch] = useState(true);
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchNoAsistentes(idPrograma, e.target.value);
        }
    };
    //context
    const {
        asistentes,
        fetchAsistentes,
        addAsistentes,
        Noasistentes,
        fetchNoAsistentes,
    } = useContext(AsistentesContext);

    useEffect(() => {
        fetchNoAsistentes(idPrograma);
        setLoading(false);
    }, []);

    return (
        <div className="container w-90 p-0 ">
            <div className="d-flex justify-content-end p-0">
                <div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="btn justify-content-end"
                        aria-label="Close"
                    >
                        <HighlightOffIcon className={classes.button} />
                    </button>
                </div>
            </div>
            {toggleFetch ? (
                <ListarAsistentes
                    id="modalBusqueda"
                    idPrograma={idPrograma}
                    handleClose={handleClose}
                    setToggleFetch={setToggleFetch}
                />
            ) : (
                <RegistrarUsuario
                    handleClose={handleClose}
                    setToggleFetch={setToggleFetch}
                />
            )}
        </div>
    );
};

export default BuscarAsistentes;
