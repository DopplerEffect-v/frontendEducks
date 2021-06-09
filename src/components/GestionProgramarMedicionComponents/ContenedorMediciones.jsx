import React from "react";
import MenuFiltroMediciones from "./MenuFiltroMediciones";
import CardHorarioMedicion from "./CardHorarioMedicion";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    contenedorFormulario: {
        backgroundColor: "#F9F6F6",
        maxWidth: "100%",
        height: "370px",
        overflow: "auto",
    },
    contenedorMenu: {
        backgroundColor: "#F9F6F6",
        maxWidth: "100%",
    },
}));


const ContenedorMediciones = ({ handleChangeHorario, handleRemoveHorario, cursos, setCursos, index,medicion, setMedicion}) => {
    const classes = useStyles();

    

    return (
        <div className={classes.contenedorMenu} >
            
            <MenuFiltroMediciones />
            <div className={classes.contenedorFormulario}>

                {cursos[index].horarios.map((horario, indexHorario) => (
                    <CardHorarioMedicion
                        key={indexHorario}
                        horario={horario}
                        cursos={cursos}
                        setCursos={setCursos}
                        indexCurso={index}
                        indexHorario={indexHorario}
                        handleRemoveHorario={handleRemoveHorario}
                        handleChangeHorario={handleChangeHorario}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContenedorMediciones;
