import Campus from "../../assets/images/pucpCampus4.jpg";
import { makeStyles } from "@material-ui/core/styles";

const MantenimientoResultadoEstudianteStyles = makeStyles((theme) => ({
    contenedorFormulario: {
        backgroundColor: "#F9F6F6",
        maxWidth: "100%",
        padding: theme.spacing(2),
    },
    contenedor: {
        paddingTop: "2%",
        paddingBottom: "4%",
        paddingLeft: "2%",
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
    popup: {
        width: "92%",
        backgroundColor: "#f3f3f3",
        border: "1px  #000",
        borderRadius: "15px",
    },
    btn: {
        height: '100%',
        width: 'auto',
        fontWeight: 'bolder',
        fontFamily: theme.typography.fontFamily.roboto,
    },
    addBtn: {
        cursor: "pointer"
    }
}));



export default MantenimientoResultadoEstudianteStyles;
