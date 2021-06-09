import { makeStyles } from "@material-ui/core/styles";
import Campus from "../../assets/images/pucpCampus4.jpg";

const MantenimientoProgramaStyles = makeStyles((theme) => ({
    contenedor: {
        paddingTop: "2%",
        paddingBottom: "4%",
        paddingLeft: "2%",
        minWidth: "66.66%",
        backgroundColor: "white",
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
        height: "100%",
        width: "auto",
        fontWeight: "bolder",
        fontFamily: theme.typography.fontFamily.roboto,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    popup: {
        width: "60%",
        maxWidth: "700px",
        backgroundColor: "#f3f3f3",
        border: "1px  #000",
        borderRadius: "15px",
    },
}));

export default MantenimientoProgramaStyles;
