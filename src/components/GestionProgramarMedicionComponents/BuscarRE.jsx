import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import ListarREs from "./ListarREs";

const useStyles = makeStyles({
    button: {
        width: "40px",
        height: "40px",
    },
});

const BuscarRE = ({ handleClose, idSemestre }) => {
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
            <ListarREs
                handleClose={handleClose}
                idSemestre={idSemestre}
            />
        </div>
    );
};

export default BuscarRE;