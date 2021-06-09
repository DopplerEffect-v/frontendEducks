import React, { useState ,useContext,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Input } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import GestionarCursosStyles from "../../pages/GestionObjetivosEducacionalesPage/GestionarObjetivosEducacionalesStyles";
import CursoContext from "../../context/CursoContext/CursoContext";
import Loading from "../../pages/Loading/Loading";
import AuthContext from "../../context/AuthContext/AuthContext";
import SecureLS from "secure-ls";
import Swal from 'sweetalert2'


const useStyle = makeStyles((theme) => ({
    botonRemover: {
        background: "#00477F",
        "&:hover": {
            background: "#042E50",
        },
        color: "white",
    },
    card: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "90%",
        fontFamily: "Roboto",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
        backgroundColor: "white",
    },
}));

const CardCursos = ({ curso, fidPrograma }) => {
    const ls = new SecureLS({ encodingType: "aes" });
    const {fetchCursos ,updateCurso,deleteCurso,existeCurso} = useContext( CursoContext );
    const { currentRol, loadUser } = useContext(AuthContext);
    const classes = useStyle();
    const classes2 = GestionarCursosStyles();
    const [open, setOpen] = React.useState(false);
    const [rol, setRol] = useState(ls.get("sasaGurudumu"));
    const [loading, setLoading] = useState(true);
    
    
    //Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            className={`container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`} id="filaCurso"
        >
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-11 " id="codigo">
                {curso.codigo}
            </div>
            <div className="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block" id="nombre">
                {curso.nombre}
            </div>
            <div className="col-lg-2 col-md-2 col-sm-6 col-xs text-center p-0">
                <div className="row justify-content-center">
                    <div className="col p-0"></div>
                    <div className="col-4 p-0 justify-content-center">
                            <IconButton
                                id={"btnEditar_"+curso.codigo}
                                aria-label="EditIcon"
                                disableFocusRipple
                                disableRipple
                                style={{ padding: "0px", margin: "0px" }}
                                onClick={() => {    

                                                  
                                    var i=0;
                                    for (i=0;i<document.querySelectorAll("#codigo").length;i++){
                                        if(document.querySelectorAll("#codigo")[i].innerText.toUpperCase()==curso.codigo.toUpperCase()) break;
                                    }   

                                    //document.querySelectorAll("#filaCurso")[i].insertAdjacentHTML("afterEnd",`<div id="cursoeditar" style="font-size: 90%;" class="container-fluid mx-auto row align-items-center py-2 mb-2"><input class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " id="codigoEdit" style="margin-right: 60px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;width: 20%;padding: 5px;"><input class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block" id="nombre" style="margin-right: 20px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;padding: 5px;"></div>`);
                                    document.querySelectorAll("#filaCurso")[i].insertAdjacentHTML("afterEnd",`<div id="cursoeditar"><div style="font-size: 90%;padding-bottom: 0px !important;margin-bottom: 0px !important;" class="container-fluid mx-auto row align-items-center py-2 mb-2"><input class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " style="margin-right: 60px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;width: 20%;padding: 5px;"><input id="nomedit" class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block" style="margin-right: 20px;border: none;border-bottom: solid 3px;border-color: #1a8df2;outline: none;padding: 5px;"></div>
                                    <div style="font-size: 70%;color: red;" id="validaciones" class="container-fluid mx-auto row align-items-center mb-2"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-11 " style="" id="validaCod"></div>
                                    <div id="validaNom" class="col-lg-7 col-md-7 d-none d-sm-none d-md-block d-lg-block"></div></div></div>`);
                                    

                                    document.querySelectorAll("#filaCurso")[i].style.display="none";
                                    
                                    let inputcodigoCur=document.querySelectorAll("#filaCurso")[i].nextSibling.childNodes[0].childNodes[0];
                                    let inputnombreCur=document.querySelectorAll("#filaCurso")[i].nextSibling.childNodes[0].childNodes[1];
                                    inputcodigoCur.value=curso.codigo;//llenar por default el input
                                    inputnombreCur.value=curso.nombre;//llenar por default el input
                                    inputnombreCur.focus();
                                    //document.querySelectorAll("#filaCurso")[i].nextSibling.childNodes[0].childNodes[1].focus();
                                    var enter=false;
                                    [inputcodigoCur,inputnombreCur].forEach(function(inputedit){
                                        inputedit.addEventListener('keypress',function(e){
                                            if(e.key=='Enter'){
                                                var codCur= document.querySelectorAll("#filaCurso")[i].nextSibling.childNodes[0].childNodes[0];
                                                var nomCur= document.querySelectorAll("#filaCurso")[i].nextSibling.childNodes[0].childNodes[1];
                                                
                                                var encontrado=false;
                                                for (var j=0;j<document.querySelectorAll("#codigo").length;j++)
                                                    if(document.querySelectorAll("#codigo")[j].innerText.toUpperCase()==codCur.value.toUpperCase() && i!=j){
                                                        encontrado=true;
                                                        break};
                                                if (encontrado){
    
                                                    const Toast = Swal.mixin({
                                                        toast: true,
                                                        position: 'top-end',
                                                        showConfirmButton: false,
                                                        timer: 3000,
                                                        timerProgressBar: true,
                                                        didOpen: (toast) => {
                                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                                        }
                                                    })
                                                              
                                                        Toast.fire({
                                                        icon: 'error',
                                                        title: 'El curso ya está registrado'
                                                    })
                                                }
                                                if (codCur.value.length<6 || codCur.value.length>6){
                                                    enter=true;
                                                    document.getElementById("validaCod").innerText="Debe tener 6 caracteres";
                                                }
                                                if (nomCur.value.length==0){
                                                    enter=true;
                                                    document.getElementById("validaNom").innerText="No puede ser vacío";
                                                }
                                                if (nomCur.value.length>100){
                                                    enter=true;
                                                    document.getElementById("validaNom").innerText="No puede tener más de 100 caracteres";
                                                }
                                                if(!encontrado && codCur.value.length==6 && nomCur.value.length>0){
                                                    updateCurso(curso.idCurso,fidPrograma,codCur.value.toUpperCase(),nomCur.value).then(() => {
                                                        fetchCursos(fidPrograma);
                                                    });
        
                                                    document.querySelectorAll("#filaCurso")[i].nextSibling.remove();//Elinar el editable en específico
                                                    document.querySelectorAll("#filaCurso")[i].removeAttribute("style");//mostrando el label row en específico
                                                }
    
            

                                                
                                            }


                                        })
                                    })
                                    inputcodigoCur=document.querySelectorAll("#filaCurso")[i].nextSibling.childNodes[0].childNodes[0];
                                    inputnombreCur=document.querySelectorAll("#filaCurso")[i].nextSibling.childNodes[0].childNodes[1];
                                    inputcodigoCur.addEventListener('input',function(e){
                                        if(enter==true){
                                            if (inputcodigoCur.value.length<6 || inputcodigoCur.value.length>6 )
                                                document.getElementById("validaCod").innerText="Debe tener 6 caracteres";
                                            
                                            if (inputcodigoCur.value.length==6)
                                                document.getElementById("validaCod").innerText="";
                                        }
                                    });
                                    inputnombreCur.addEventListener('input',function(e){
                                        if(enter==true){
                                            if (inputnombreCur.value.length==0 )
                                                document.getElementById("validaNom").innerText="No puede ser vacío";
                                            
                                            if (inputnombreCur.value.length>0 )
                                                document.getElementById("validaNom").innerText="";
                                        }
                                    });
                                    inputnombreCur.addEventListener('input',function(e){
                                        if(enter==true){
                                            if (inputnombreCur.value.length>100 )
                                                document.getElementById("validaNom").innerText="No puede tener más de 100 caracteres";
                                            
                                            if (inputnombreCur.value.length<100 )
                                                document.getElementById("validaNom").innerText="";
                                        }
                                    });
                                    document.onkeydown=function(e){
                                        e=e ||window.event;
                                        if(e.keyCode==27 ){//tecla Escape
                                            if (document.querySelectorAll("#filaCurso")) document.querySelectorAll("#filaCurso").forEach(elem=>elem.removeAttribute("style"));
                                            if (document.querySelectorAll("#cursoeditar")) document.querySelectorAll("#cursoeditar").forEach(elem=>elem.remove());
                                            
                                            if (document.getElementById("botonNuevo")) document.getElementById("botonNuevo").removeAttribute("style");
                                            if (document.getElementById("cursonuevo")) document.getElementById("cursonuevo").remove();
                                        }
                                    }
                                    

                                }}
                            >
                                <EditIcon />
                            </IconButton>
                    </div>
                    <div className="col-3 p-0 justify-content-center">
                        <IconButton
                            id={"btnEliminar_"+ curso.codigo}
                            aria-label="DeleteIcon"
                            disableFocusRipple
                            disableRipple
                            style={{ padding: "0px", margin: "0px" }}
                            onClick={() => {
                                handleOpen();
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <div className="col-1 p-0"></div>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes2.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade timeout={5} in={open}>
                        <div className="container h-100 d-flex align-items-center justify-content-center">
                            <div className={`h-auto pb-5 ${classes2.popup}`}>
                                <ModalConfirmacionEliminacion
                                    handleClose={handleClose}
                                    idCurso={curso.idCurso}
                                    fidPrograma={fidPrograma}
                                    curso={curso}
                                />
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
};

export default CardCursos;
