import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import GestionarFacultades from "./pages/GestionFacultadesPage/GestionarFacultades";
import EditarFacultad from "./pages/MantenimientoFacultadesPage/EditarFacultad";
import AgregarFacultad from "./pages/MantenimientoFacultadesPage/AgregarFacultad";
import GestionarProgramas from "./pages/GestionProgramasPage/GestionarProgramas";
import EditarPrograma from "./pages/MantenimientoProgramasPage/EditarPrograma";
import AgregarPrograma from "./pages/MantenimientoProgramasPage/AgregarPrograma";
import Login from "./pages/LoginPage/Login";
import ProtectedRoute from "./components/Extras/ProtectedRoute";
import GestionarAsistentes from "./pages/GestionAsistentesPage/GestionarAsistentes";
import GestionarObjetivosEducacionales from "./pages/GestionObjetivosEducacionalesPage/GestionarObjetivosEducacionales";
import VerObjetivoEducacional from "./pages/MantenimientoObjetivosEducacionalesPage/VerObjetivoEducacional";
import GestionarCursos from "./pages/GestionCursosPage/GestionarCursos";
import EditarObjetivoEducacional from "./pages/MantenimientoObjetivosEducacionalesPage/EditarObjetivoEducacional";
import AgregarObjetivoEducacional from "./pages/MantenimientoObjetivosEducacionalesPage/AgregarObjetivoEducacional";
import GestionarSemestres from "./pages/GestionSemestresPage/GestionarSemestres";
import { Redirect } from "react-router-dom";
import GestionarUsuarios from "./pages/GestionUsuariosPage/GestionarUsuarios";
import AgregarUsuario from "./pages/MantenimientoUsuariosPage/AgregarUsuario";
import EditarUsuario from "./pages/MantenimientoUsuariosPage/EditarUsuario";
import Activate from "./pages/LoginPage/Activate";
import VerResultadoEstudiante from "./pages/MantenimientoResultadoEstudiantePage/VerResultadoEstudiante";
import MantenimientoUsuarioStyles from "./pages/MantenimientoFacultadesPage/MantenimientoFacultadStyles";
import EditarResultadoEstudiante from "./pages/MantenimientoResultadoEstudiantePage/EditarResultadoEstudiante";
import AgregarResultadoEstudiante from "./pages/MantenimientoResultadoEstudiantePage/AgregarResultadoEstudiante";
import GestionarResultadosEstudiante from "./pages/GestionResultadoEstudiante/GestionarResultadosEstudiante";
import GestionarPlanesMedicion from "./pages/GestionPlanesMedicionPage/GestionarPlanesMedicion";
import ProgramarMedicion from "./pages/MantenimientoProgramarMedicionPage/ProgramarMedicion";
import ActivateLogin from "./pages/LoginPage/ActivateLogin";
import ActivateExample from "./pages/LoginPage/ActivateExample";

function App() {
    const classes = MantenimientoUsuarioStyles();
    return (
        <BrowserRouter>
            <div className={classes.root}>
                <div className={classes.opacity}>
                    <Switch>
                        <Route
                            exact
                            path="/gestionarUsuarios/EditarUsuario"
                            component={(props) =>
                                EditarUsuario({ ...props.location.state })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarUsuarios/AgregarUsuario"
                            component={AgregarUsuario}
                        />
                        <Route
                            exact
                            path="/gestionarUsuarios"
                            component={GestionarUsuarios}
                        />
                        <Route
                            exact
                            path="/gestionarSemestres"
                            component={GestionarSemestres}
                        />
                        <Route
                            exact
                            path="/gestionarObjetivosEducacionales/AgregarObjetivoEducacional"
                            component={(props) =>
                                AgregarObjetivoEducacional({
                                    ...props.location.state,
                                })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarObjetivosEducacionales/EditarObjetivoEducacional"
                            component={(props) =>
                                EditarObjetivoEducacional({
                                    ...props.location.state,
                                })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarObjetivosEducacionales/VerObjetivoEducacional"
                            component={(props) =>
                                VerObjetivoEducacional({
                                    ...props.location.state,
                                })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarObjetivosEducacionales"
                            component={GestionarObjetivosEducacionales}
                        />
                        <Route
                            exact
                            path="/gestionarAsistentes"
                            component={GestionarAsistentes}
                        />
                        <Route exact path="/" component={Login} />
                        <Route
                            exact
                            path="/gestionarFacultades"
                            component={GestionarFacultades}
                        />
                        <Route
                            exact
                            path="/gestionarCursos"
                            component={GestionarCursos}
                        />
                        <Route
                            exact
                            path="/gestionarFacultades/nuevaFacultad"
                            component={AgregarFacultad}
                        />
                        <Route
                            exact
                            path="/gestionarFacultades/editarFacultad"
                            component={(props) =>
                                EditarFacultad({ ...props.location.state })
                            }
                        />

                        <Route
                            exact
                            path="/gestionarProgramas"
                            component={GestionarProgramas}
                        />

                        <Route
                            exact
                            path="/gestionarProgramas/nuevoPrograma"
                            component={(props) =>
                                AgregarPrograma({ ...props.location.state })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarProgramas/editarPrograma"
                            component={(props) =>
                                EditarPrograma({ ...props.location.state })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarResultadoEstudiante"
                            component={GestionarResultadosEstudiante}
                        />
                        <Route
                            exact
                            path="/gestionarResultadoEstudiante/verResultadoEstudiante"
                            component={(props) =>
                                VerResultadoEstudiante({
                                    ...props.location.state,
                                })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarResultadoEstudiante/agregarResultadoEstudiante"
                            component={AgregarResultadoEstudiante}
                        />
                        <Route
                            exact
                            path="/gestionarResultadoEstudiante/editarResultadoEstudiante"
                            component={(props) =>
                                EditarResultadoEstudiante({
                                    ...props.location.state,
                                })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarPlanesMedicion/programarMedicion"
                            component={(props) =>
                                ProgramarMedicion({ ...props.location.state })
                            }
                        />
                        <Route
                            exact
                            path="/gestionarPlanesMedicion"
                            component={GestionarPlanesMedicion}
                        />
                        <Route
                            exact
                            path="/activate/:token"
                            component={ActivateLogin}
                        />
                        {/* <Route
                            exact
                            path="/activateLogin"
                            component={ActivateExample}
                        /> */}
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
