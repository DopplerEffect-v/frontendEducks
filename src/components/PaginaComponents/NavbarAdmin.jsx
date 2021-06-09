import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";
//icons
import { Icon } from '@iconify/react';
import studentIcon from '@iconify/icons-whh/student';
import rulerFill from '@iconify/icons-ri/ruler-fill';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import planIcon from '@iconify/icons-grommet-icons/plan';
import fileReport from '@iconify/icons-majesticons/file-report';
import assistantIcon from '@iconify/icons-wpf/assistant';
import iHealthEducation from '@iconify/icons-medical-icon/i-health-education';
import educationIcon from '@iconify/icons-carbon/education';

const Navbar = ({ handleClick, open, setOpen, classes }) => {
    const history = useHistory();
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem button className={classes.tr} styles={{ paddingTop: '0px' }}
                onClick={() => {
                    history.push('/gestionarUsuarios');
                }
                }
            >
                <ListItemIcon>
                    <Icon icon={iHealthEducation} style={{ color: '#000', fontSize: '200%' }} />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.listado }} primary="Administrar Usuarios" />

            </ListItem>

            <ListItem id="buttonGestionarFacultades" button className={classes.tr}
                onClick={() => {
                    history.push('/gestionarFacultades');
                }
                }
            >
                <ListItemIcon>
                    <Icon icon={educationIcon} style={{ color: '#000', fontSize: '180%' }} />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.listado }} primary="Administrar Facultades" />
            </ListItem>

            <ListItem id="buttonGestionarSemestres" button className={classes.tr}
                onClick={() => {
                    history.push('/gestionarSemestres');
                }
                }
            >
                <ListItemIcon>
                    <Icon icon={fileReport} style={{ color: '#000', fontSize: '180%' }} />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.listado }} primary="Gestionar Semestres" />
            </ListItem>
        </List>

    );
}

export default Navbar;