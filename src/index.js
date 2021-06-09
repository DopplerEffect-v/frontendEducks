import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FacultadState from "./context/FacultadContext/FacultadState";
import UsuarioState from "./context/UsuarioContext/UsuarioState";
import ProgramaState from "./context/ProgramaContext/ProgramaState";
import AsistentesState from "./context/AsistentesContext/AsistentesState";
import SemestreState from "./context/SemestreContext/SemestreState";
import ObjetivoEducacionalState from "./context/ObjetivoEducacionalContext/ObjetivoEducacionalState";
import ResultadoEstudianteState from "./context/ResultadoEstudianteContext/ResultadoEstudianteState";
import { ToastProvider } from "react-toast-notifications";
import AuthState from "./context/AuthContext/AuthState";
import CursoState from "./context/CursoContext/CursoState";
import ProgramarMedicionState from "./context/ProgramaMedicionContext/ProgramaMedicionState";

const customTheme = createMuiTheme({
    //Theme Settings
    palette: {
        primary: {
            //main: "#07487D",
            main: "#00477F",
        },
        secondary: {
            main: "#970000",
            //main: "#00477F",
        },
        info: {
            main: "#970000",
        },
    },
    typography: {
        button: {
            textTransform: "none",
            borderRadius: "50",
        },
        fontFamily: {
            roboto: "Roboto",
            robotoSlab: "Roboto Slab",
        },
        /*fontFamily: [
        "Roboto",
        "Roboto Slab",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),*/
    },
    mixins: {
        toolbar: {
            minHeight: "110px",
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={customTheme}>
        <ToastProvider>
            <AuthState>
                <ObjetivoEducacionalState>
                    <ProgramarMedicionState>
                        <ResultadoEstudianteState>
                            <FacultadState>
                                <AsistentesState>
                                    <ProgramaState>
                                        <CursoState>
                                            <UsuarioState>
                                                <SemestreState>
                                                    <App />
                                                </SemestreState>
                                            </UsuarioState>
                                        </CursoState>
                                    </ProgramaState>
                                </AsistentesState>
                            </FacultadState>
                        </ResultadoEstudianteState>
                    </ProgramarMedicionState>
                </ObjetivoEducacionalState>
            </AuthState>
        </ToastProvider>
    </ThemeProvider>,
    document.getElementById("root")
);
