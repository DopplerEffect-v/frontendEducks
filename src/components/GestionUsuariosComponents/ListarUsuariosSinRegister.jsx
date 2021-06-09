import React, { useEffect, useContext,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuFiltrosUsuarios from "./MenuFiltrosUsuarios";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import InputBusquedas from "../ComunesComponents/InputBusquedas";
import CardBusquedaUsuariosSinRegister from "./CardBusquedaUsuariosSinRegister";
import UsuarioContext from "../../context/UsuarioContext/UsuarioContext";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles((theme) => ({
    btnRegistrarUsuario: {
        background: "#970000",
        "&:hover": {
            background: "#760303",
        },
        color: "white",
    },
}));

const ListarUsuariosSinRegister = ({ cursos,setCursos,indexCurso,indexHorario,handleClose, setToggleFetch }) => {
    //styles
    const classes = useStyle();
    //context
    const { usuarios, fetchUsuarios, buscarUsuarios } =
        useContext(UsuarioContext);
    const [searchTerm,setSearchTerm]=useState("");

    useEffect(() => {
        fetchUsuarios();
    }, []);

    /*const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            buscarUsuarios(e.target.value);
        }
    };*/
    const onChange=(criterio)=>{
        buscarUsuarios(criterio)
    }

    return (
        <div>
            <div className="row d-flex mb-4">
                <h2
                    className="text-center col-lg-8 offset-lg-2 col-sm-8 offset-sm-2 col-xs-4"
                    style={{ fontWeight: "bold" }}
                >
                    Búsqueda de Usuarios
                </h2>
            </div>
            <div className="container-fluid px-5">
                <div className="mb-3 row">
                    <div className="col-6">
                        <InputBusquedas
                            placeHolder_Default="Buscar por nombre, codigo o correo"
                            //handleKeyPress={handleKeyPress}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div
                    className="container h-100 pt-1 px-0 align-items-center justify-content-center"
                    style={{ backgroundColor: "white" }}
                >
                    <div>
                        <MenuFiltrosUsuarios />
                    </div>
                    <div
                        className="list-group overflow-auto"
                        style={{ maxHeight: "350px" }}
                    >
                            {usuarios.filter((val)=>{
                                if (searchTerm===''){
                                return val
                                }
                                else if(
                                    val.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.apellidoPaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.apellidoMaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.codigo.toLowerCase().includes(searchTerm.toLowerCase()) 
                                ){
                                return val;
                                }
                            }).map((usuario) => {
                            return (
                                <div
                                    className="mt-2 col-md-12"
                                    key={usuario.idUsuario}
                                >
                                    <CardBusquedaUsuariosSinRegister
                                        key={usuario.idUsuario}
                                        usuario={usuario}
                                        handleClose={handleClose}
                                        cursos={cursos} setCursos={setCursos} indexCurso={indexCurso} indexHorario={indexHorario}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end px-5 mt-5">
                <Button
                    variant="contained"
                    size="small"
                    className={classes.btnRegistrarUsuario}
                    endIcon={<PersonAddIcon />}
                    onClick={() => {
                        setToggleFetch(false);
                    }}
                >
                    Registrar Usuario
                </Button>
            </div>
        </div>
    );
};

export default ListarUsuariosSinRegister;
