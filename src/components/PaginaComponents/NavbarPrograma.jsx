import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

//icons
import { Icon } from "@iconify/react";
import studentIcon from "@iconify/icons-whh/student";
import rulerFill from "@iconify/icons-ri/ruler-fill";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import planIcon from "@iconify/icons-grommet-icons/plan";
import fileReport from "@iconify/icons-majesticons/file-report";
import assistantIcon from "@iconify/icons-wpf/assistant";
import iHealthEducation from "@iconify/icons-medical-icon/i-health-education";
import educationIcon from "@iconify/icons-carbon/education";
import { useHistory } from "react-router-dom";
import bxsBookHeart from '@iconify-icons/bx/bxs-book-heart';

const Navbar = ({ handleClick, open, setOpen, classes }) => {
    const history = useHistory();
    const initialState = {
        objetivo: false,
        resultado: false,
        planMedicion: false,
        mediciones: false,
        planMejora: false,
        reportes: false,
        asistentes: false,
    };
    const [selected, setSelected] = useState(initialState);

    /* const handleSelect = (e) => {
        setSelected(initialState);
        setSelected({
            ...selected,
            [e]: true,
        });
        console.log(e);
    }; */

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem
                id="buttonGestionarObjetivosEducacionales"
                button
                name="objetivo"
                className={classes.tr}
                styles={{ paddingTop: "0px" }}
                onClick={(e) => {
                    //handleSelect("objetivo");
                    history.push("/gestionarObjetivosEducacionales");
                }}
                selected={selected.objetivo}
            >
                <ListItemIcon>
                    <Icon
                        icon={iHealthEducation}
                        style={{ color: "#000", fontSize: "200%" }}
                    />
                </ListItemIcon>
                <ListItemText                    
                    classes={{ primary: classes.listado }}
                    primary="Objetivos Educacionales"
                />
            </ListItem>
            <ListItem 
                button
                id="buttonGestionarResultadoEstudiante"
                name="resultadosEstudiante"
                className={classes.tr}
                styles={{ paddingTop: "0px" }}
                onClick={(e) => {
                    //handleSelect("objetivo");
                    history.push("/gestionarResultadoEstudiante");
                }}
                selected={selected.objetivo}
            >
                <ListItemIcon>
                    <Icon
                        icon={studentIcon}
                        style={{ color: "#000", fontSize: "150%" }}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listado }}
                    primary="Resultados del Estudiante"
                />
            </ListItem>
            <ListItem 
                button
                id="buttonGestionarResultadoEstudiante"
                name="resultadosEstudiante"
                className={classes.tr}
                styles={{ paddingTop: "0px" }}
                onClick={(e) => {
                    //handleSelect("objetivo");
                    history.push("/gestionarPlanesMedicion");
                }}
                selected={selected.objetivo}
                >
                <ListItemIcon>
                    <Icon
                        icon={rulerFill}
                        style={{ color: "#000", fontSize: "185%" }}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listado }}
                    primary="Plan de Medicion"
                />
            </ListItem>
            <ListItem button onClick={handleClick} className={classes.tr}>
                <ListItemIcon>
                    <Icon
                        icon={educationIcon}
                        style={{ color: "#000", fontSize: "180%" }}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listado }}
                    primary="Mediciones del Estudiante"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ArrowForwardIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listado }}
                            primary="Mis mediciones"
                        />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ArrowForwardIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listado }}
                            primary="Historico de Mediciones"
                        />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button className={classes.tr}>
                <ListItemIcon>
                    <Icon
                        icon={planIcon}
                        style={{ color: "#000", fontSize: "170%" }}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listado }}
                    primary="Planes de Mejora"
                />
            </ListItem>
            <ListItem button className={classes.tr}>
                <ListItemIcon>
                    <Icon
                        icon={fileReport}
                        style={{ color: "#000", fontSize: "180%" }}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listado }}
                    primary="Reportes"
                />
            </ListItem>
            <ListItem button className={classes.tr}>
                <ListItemIcon>
                    <Icon
                        icon={assistantIcon}
                        style={{ color: "#000", fontSize: "185%" }}
                    />
                </ListItemIcon>
                <ListItemText
                    id="buttonGestionarAsistentes"
                    classes={{ primary: classes.listado }}
                    primary="Gestionar Asistentes"
                    onClick={() => {
                        history.push("/gestionarAsistentes");
                    }}
                />
            </ListItem>
            <ListItem button className={classes.tr}>
                <ListItemIcon>
                    <Icon                        
                        icon={bxsBookHeart}
                        style={{ color: "#000", fontSize: "185%" }}
                    />
                </ListItemIcon>
                <ListItemText
                    id="buttonGestionarCursos"
                    classes={{ primary: classes.listado }}
                    primary="Gestionar Cursos"
                    onClick={() => {
                        history.push("/gestionarCursos");
                    }}
                />
            </ListItem>
            {/* <ListItem>
                    <ListItemText classes={{ primary: classes.listado }} primary="Gestionar Asistentes" />
                </ListItem> */}
        </List>
    );
};

export default Navbar;
