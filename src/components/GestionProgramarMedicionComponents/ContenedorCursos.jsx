import React from "react";
import CardCursoMedicion from "./CardCursoMedicion";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    contenedorFormulario: {
        backgroundColor: "#F9F6F6",
        maxWidth: "100%",
        minHeight: "145px",
        padding: theme.spacing(0, 2, 2, 2),
        marginBottom: "50px",
    },
}));

const ContenedorCursos = ({
    cursos,
    clicked,
    handleCursoSeleccionado,
    handleRemoveCurso
}) => {
    const classes = useStyles();
    if(cursos){
        return (
            <div className={classes.contenedorFormulario}>
                <div className="d-flex overflow-auto pb-2 py-0">
                    {cursos.map((curso, i) => (
                        <CardCursoMedicion
                            key={i}
                            index={i}
                            clicked={clicked}
                            curso={curso}
                            handleCursoSeleccionado={handleCursoSeleccionado}
                            handleRemoveCurso={handleRemoveCurso}
                        />
                    ))}
                </div>
            </div>
        );
    }
};

export default ContenedorCursos;
