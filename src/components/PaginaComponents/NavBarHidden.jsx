import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";

import NavbarPrograma from "./NavbarPrograma";
import NavbarFacultad from "./NavbarFacultad";
import NavbarAdmin from "./NavbarAdmin";
import NavbarDocente from "./NavbarDocente";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        //minWidth: '220px',
        height: "100vh",
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

function NavbarHidden(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const rol = props.rol.idRol;
    const handleClick = () => {
        setOpen(!open);
    };
    
    switch (rol) {
        case 3:
            return (
                <Drawer
                    variant={props.variant}
                    open={props.open}
                    onClose={props.onClose ? props.onClose : null}
                >
                <div className='h-100'>
                    <NavbarAdmin handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
                </Drawer>
            );
        case 1:
            return (
                <Drawer
                    variant={props.variant}
                    open={props.open}
                    onClose={props.onClose ? props.onClose : null}
                >
                <div className='h-100'>
                    <NavbarFacultad handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
                </Drawer>
            );
        case 2:
            return (
                <Drawer
                    variant={props.variant}
                    open={props.open}
                    onClose={props.onClose ? props.onClose : null}
                >
                <div className='h-100'>
                    <NavbarPrograma handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
                </Drawer>
            );
        case 5:
        case 4:
            return (
                <Drawer
                    variant={props.variant}
                    open={props.open}
                    onClose={props.onClose ? props.onClose : null}
                >
                <div className='h-100'>
                    <NavbarDocente handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
                </Drawer>
            );
        
        default:
            return (
                <Drawer
                    variant={props.variant}
                    open={props.open}
                    onClose={props.onClose ? props.onClose : null}
                >
                <div className='h-100'>
                    <NavbarAdmin handleClick={handleClick} open={open} setOpen={setOpen} classes={classes} />
                </div>
                </Drawer>
            );
    }
}

export default NavbarHidden;
