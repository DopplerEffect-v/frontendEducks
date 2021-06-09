import { makeStyles } from '@material-ui/core/styles';
import Campus from "../../assets/images/pucpCampus4.jpg";

const LoginStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Campus})`,
        minHeight: '100vh',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    opacity: {
        backgroundColor: 'rgba(255,255,255,0.35)',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        //minHeight: '700.797px',
        minHeight: '685px',
        height: '80%',
        borderRadius: '5px'
    },
    card: {
        padding: '10px',
        height: '93%'
    },
    typography: {
        marginTop: '10px',
        marginBottom: '10px',
        fontFamily: theme.typography.fontFamily.robotoSlab,
        textAlign: 'center'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center'
    },
    btn: {
        height: '42px',
        marginTop: '20px',
        width: '100%',
        '&:hover': {
            backgroundColor: '#970000'
        }
    },
    ref: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row-reverse',
        fontFamily: 'Roboto Slab',
        fontSize: '13px',
        width: '100%'
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
}))

export default LoginStyles;