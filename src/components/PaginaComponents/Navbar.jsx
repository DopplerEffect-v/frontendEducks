import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavbarPrograma from "./NavbarPrograma";
import NavbarFacultad from "./NavbarFacultad";
import NavbarAdmin from "./NavbarAdmin";
import NavbarDocente from "./NavbarDocente";
import AuthContext from "../../context/AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        //minWidth: '220px',
        height: "100%",
        background: "#f3f3f3",
        color: "#083e7b",
        fontWeight: "bold",
        paddingTop: "10%",
    },
    nested: {
        paddingLeft: theme.spacing(4),
        background: "#f3f3f3",
        "&:hover": {
            background: "#C4C4C4",
        },
    },
    tr: {
        background: "#f3f3f3",
        "&:hover": {
            background: "#C4C4C4",
        },
    },
    listado: {
        fontSize: "100%",
    },
}));

const Navbar = ({rol,setRol}) => {
    //rol es parametro XD
    
    const { roles, loadUser, isAuth } = useContext(AuthContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    switch (rol.idRol) {
        case 3:
            return (
                <div className='h-100'>
                    <NavbarAdmin handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
            );
        case 1:
            return (
                <div className='h-100'>
                    <NavbarFacultad handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
            );
        case 2:
            return (
                <div className='h-100'>
                    <NavbarPrograma handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
            );
        case 5:
        case 4:
            return (
                <div className='h-100'>
                    <NavbarDocente handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
            );
        
        default:
            return (
                <div className='h-100'>
                    <NavbarAdmin handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
            );
    }
};
export default Navbar;
