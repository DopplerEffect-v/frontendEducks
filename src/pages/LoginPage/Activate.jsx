import React, { useContext } from "react";
//MaterialUI core
import { useToasts } from "react-toast-notifications";

//MaterialUI Styles
import LoginStyles from "./LoginStyles";

import { useHistory } from "react-router-dom";

import AuthContext from "../../context/AuthContext/AuthContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import pato from '../../assets/images/PATITODEFENDERS.png'
import styles from './ActivateStyles.css'

import instance from "../../instance";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      position: 'center center',
      alignItems: 'center',
    },
  }));
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function Activate({match}) {
    const classes = useStyles();
    const { addToast } = useToasts();
    const { roles, currentRol, loginUser, loadUser } = useContext(AuthContext);
    const history = useHistory();
    const Token=match.params.token;
    //sleep(5000);
    instance.setItem("ishara", { token: Token });
    console.log(Token);
    loadUser().then((response) => {
        let current = instance.getItem("sasaGurudumu");
        console.log(current);
        switch (current.idRol) {
            case 1:
                history.push("/gestionarProgramas");
                break;
            case 2:
                history.push({
                    pathname: "/gestionarAsistentes",
                });
                break;
            case 3:
                history.push("/gestionarFacultades");
                break;
            case 4:
                history.push("/");
            case 5:
                history.push("gestionarAsistentes");
            default:
                return history.push("/");
        }
    });
    return(
        <div className={classes.root}>
            <img src={pato} id='pato'/>
        </div>
    )
}
export default Activate;