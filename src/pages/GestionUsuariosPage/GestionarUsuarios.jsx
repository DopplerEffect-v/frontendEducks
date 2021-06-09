import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";
import Header from "../../components/PaginaComponents/Header";
import Navbar from "../../components/PaginaComponents/Navbar";
import GestionarUsuariosStyles from "./GestionarUsuariosStyles";
import Loading from "../Loading/Loading";
import InputBusquedas from "../../components/ComunesComponents/InputBusquedas";
import MenuGestionUsuarios from "../../components/GestionUsuariosComponents/MenuGestionUsuarios";
import CardGestionUsuario from "../../components/GestionUsuariosComponents/CardGestionUsuario";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UsuarioContext from "../../context/UsuarioContext/UsuarioContext";
import Footer from "../../components/PaginaComponents/Footer";
import AuthContext from "../../context/AuthContext/AuthContext";
import instance from "../../instance";
import Input from "@material-ui/core/Input";
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

const GestionarUsuarios = () => {
    const { loadUser } = useContext(AuthContext);
    const [rol, setRol] = useState(instance.getItem("sasaGurudumu"));
    const classes = GestionarUsuariosStyles();
    const [loading, setLoading] = useState(true);

    const { usuarios,errores, fetchUsuarios, buscarUsuarios, uploadFile } =
        useContext(UsuarioContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        loadUser();
        setRol(instance.getItem("sasaGurudumu"));
        fetchUsuarios();
        setLoading(false);
    }, []);
    if (loading) {
        return <Loading />;
    }
    const onChange = (criterio) => {
        buscarUsuarios(criterio);
    };

    /*const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            buscarUsuarios(e.target.value);
        }
    };*/

    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(
            /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(
                /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
            );
            if (headers && row.length == headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"') d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c
        }));

        setData(list);
        setColumns(columns);

        console.log(JSON.stringify(list));
        uploadFile(list)
        console.log(errores)
    };


    const handleUploadFile = (e) => {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = evt => {
                /* Parse data */
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                processData(data);
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-lg">
            <Header rol={rol} setRol={setRol} />
            <div className="row">
                <div className="col-3 d-xxl-block d-xl-block d-lg-block d-sm-none d-none p-0">
                    <div className=" h-100" style={{ padding: "0%" }}>
                        <Navbar rol={rol} setRol={setRol} />
                    </div>
                </div>

                <div className={`col ${classes.contenedor}`}>
                    <h3 style={{ fontWeight: "bold", marginBottom: "1%" }}>
                        Gestionar Usuarios
                    </h3>

                    <div className={`${classes.espacio}`}>
                        <div className="row align-items-center mb-4">
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <InputBusquedas
                                    placeHolder_Default="Buscar por Código o Nombre"
                                    //handleKeyPress={handleKeyPress}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="col-lg-3 col-sm-3 text-end">
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    component="label"
                                    endIcon={<BackupIcon />}
                                >
                                    Cargar Usuarios
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleUploadFile(e)}
                                    />
                                </Button>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-sm-3 text-end">
                                <Link
                                    to={{
                                        pathname:
                                            "/gestionarUsuarios/AgregarUsuario",
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        id="buttonNuevo"
                                        className={classes.btn}
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        endIcon={<AddIcon />}
                                    //onClick={}
                                    >
                                        Nuevo Usuario
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <MenuGestionUsuarios />

                        <div className="h-100">
                            <div
                                className="p-0 overflow-auto"
                                style={{ height: "550px" }}
                            >
                                {usuarios
                                    .filter((val) => {
                                        if (searchTerm === "") {
                                            return val;
                                        } else if (
                                            val.nombres
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            val.apellidoPaterno
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            val.apellidoMaterno
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            val.email
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            val.codigo
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                )
                                        ) {
                                            return val;
                                        }
                                    })
                                    .map((usuario) => {
                                        return (
                                            <CardGestionUsuario
                                                key={usuario.idUsuario}
                                                usuario={usuario}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GestionarUsuarios;
