import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import ListarObjetivos from "./ListarObjetivos";

const useStyles = makeStyles({
    button: {
        width: "40px",
        height: "40px",
    },
});

const BuscarObjetivos = ({ handleClose, addObjetivo,append }) => {
    const classes = useStyles();

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
            <ListarObjetivos
                handleClose={handleClose}
                addObjetivo={addObjetivo}
                append={append}
            />
        </div>
    );
};

export default BuscarObjetivos;
