import { makeStyles } from '@material-ui/core/styles';
import Campus from "../../assets/images/pucpCampus4.jpg"

const GestionarProgramasStyles = makeStyles((theme) => ({
    listado: {
        backgroundColor: "#F9F6F6",
        maxWidth: "100%",
        padding: theme.spacing(2)
    },
    contenedor: {
        paddingTop: "2%",
        paddingBottom: "4%",
        paddingLeft: "2%",
        //paddingRight: "0%",
        minWidth: "66.66%",
        backgroundColor: 'white'
    },
    root: {
        backgroundImage: `url(${Campus})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgrounPosition: "center center"
    },
    opacity: {
        backgroundColor: 'rgba(255,255,255,0.35)',
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed",
        backgrounPosition: "center center"
    },
    btn: {
        height: '100%',
        width: 'auto',
        fontWeight: 'bolder',
        fontFamily: theme.typography.fontFamily.roboto,
    },
}));

export default GestionarProgramasStyles;