import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";

import ListarUsuarios from "./ListarUsuarios";
import RegistrarUsuario from "./RegistrarUsuario";

const useStyles = makeStyles({
    button: {
        width: "40px",
        height: "40px",
    },
});

const BuscarUsuarios = ({ handleClose }) => {
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
                <ListarUsuarios
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

export default BuscarUsuarios;
