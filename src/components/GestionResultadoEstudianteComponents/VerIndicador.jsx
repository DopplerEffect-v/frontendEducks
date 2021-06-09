import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VerNivel from "./VerNivel";

const useStyles = makeStyles({
    contenedor: {
        width: "72px",
        height: "auto",
        borderRadius: "10px",
        backgroundColor: "#5DC982",
        fontFamily: "Roboto",
        fontWeight: "bold",
    },
    titulo: { fontFamily: "Roboto", fontSize: "15px", fontWeight: "bold" },
    deleteBtn: { cursor: "pointer" }
});

const VerIndicador = ({ indicador }) => {
    const classes = useStyles();
    return (
        <div
            className="container px-1 py-2 mb-3"
            style={{
                backgroundColor: "#EEEEEE",
                color: "black",
                resize: "none",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #CCCCCC"
            }}
        >
            <div className="row d-flex pb-1 align-items-center justify-content-between">
                <div className="col-11 d-flex align-items-center">
                    <label className={`${classes.titulo}`} style={{ width: "100px" }}> {indicador.codigo} </label>
                    <div className="mx-2">-</div>
                    <label className={`${classes.titulo}`} style={{ width: "100%" }} > {indicador.nombre}</label>
                </div>

            </div>

            <div>
                {indicador.niveles.map((nivel, i) => {
                    return (
                        <div className="list-group">
                            <VerNivel key={nivel.idNivel} nivel={nivel} contador={i + 1} />{" "}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VerIndicador;