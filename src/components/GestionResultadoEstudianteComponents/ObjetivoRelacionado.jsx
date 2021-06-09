import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
const useStyles = makeStyles({
    contenedor: {
        height: "auto",
        border: "1px solid #388C4A",
        borderRadius: "10px",
        backgroundColor: "#5DC982",
        fontFamily: "Roboto",
        fontSize: "12px",
        fontWeight: "bold",
    },
    btnAdd: {
        cursor: "pointer",
        fontSize: "19px",
    },
});

const ObjetivoRelacionado = ({ objetivo, btnState, handleRemoveObjetivo, index,register,remove }) => {
    const classes = useStyles();
    return (
        <div
            className={`d-flex justify-content-between align-items-center m-1 px-1 ${classes.contenedor}`}
        >
            <div 
                className="d-flex align-items-center p-1"
                id="objetivoRelacionado"
            >
                {objetivo.codigo}
            </div>
            {btnState && (
            <div>
                    <RemoveCircleOutlineIcon
                        className={classes.btnAdd}
                        onClick={() => {
                            //handleRemoveObjetivo(index);
                            remove(index);
                        }}
                    />
            </div>
            )}
        </div>
    );
};

export default ObjetivoRelacionado;
