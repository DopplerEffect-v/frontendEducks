import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";

import ListarUsuariosSinRegister from "./ListarUsuariosSinRegister";
import RegistrarUsuarioSinRegister from "./RegistrarUsuarioSinRegister";

const useStyles = makeStyles({
    button: {
        width: "40px",
        height: "40px",
    },
});

const BuscarUsuariosSinRegister = ({ cursos,setCursos,indexCurso,indexHorario,handleClose }) => {
    const classes = useStyles();
    const [toggleFetch, setToggleFetch] = useState(true);

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
                <ListarUsuariosSinRegister
                    handleClose={handleClose}
                    setToggleFetch={setToggleFetch}
                    cursos={cursos} setCursos={setCursos} indexCurso={indexCurso} indexHorario={indexHorario}
                />
            ) : (
                <RegistrarUsuarioSinRegister
                    handleClose={handleClose}
                    setToggleFetch={setToggleFetch}
                    cursos={cursos} setCursos={setCursos} indexCurso={indexCurso} indexHorario={indexHorario}
                />
            )}
        </div>
    );
};

export default BuscarUsuariosSinRegister;