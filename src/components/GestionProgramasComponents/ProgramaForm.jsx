import React from "react";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";
import { useFormContext } from "react-hook-form";
import { Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    label: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "100%",
        fontFamily: "Roboto",
        fontWeight: "bold",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
    },

    input: {
        fontSize: "85%",
        fontFamily: "Roboto",
    },
}));

const ProgramaForm = ({ programa }) => {
    const classes = useStyle();
    const methods = useFormContext();
    const { errors } = useFormContext();
    return (
        <div className={`container p-0 ${classes.label}`}>
            <div className="p-3" style={{ backgroundColor: "#ECECEC" }}>
                <label className="p-1" style={{ fontWeight: "bold" }}>
                    Siglas
                </label>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control w-50 mb-2 ${classes.input}`}
                        placeholder="Ingrese Siglas"
                        name="siglas"
                        defaultValue={programa ? programa.siglas : null}
                        ref={methods.register({
                            required: {
                                value: true,
                                message: "Por favor complete las siglas"
                            },
                            maxLength: {
                                value: 10,
                                message: "Las siglas no pueden superar los 10 caracteres"
                            },
                            pattern: {
                                value: /^([A-Z0-9]{0,})+[A-Z0-9]+([A-Z0-9]{0,})$/,
                                message: "Ingrese solo mayúsculas"
                            }
                        })}
                        required
                    />
                    <span> <Typography id="typographyErrorSiglas" variant='body2' color='error'>{errors?.siglas?.message} </Typography></span>
                </div>

                <label className="p-1" style={{ fontWeight: "bold" }}>
                    Nombre Programa
                </label>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control mb-2 ${classes.input}`}
                        placeholder="Ingrese Nombre"
                        name="nombre"
                        defaultValue={programa ? programa.nombre : null}
                        ref={methods.register({
                            required: {
                                value: true,
                                message: "Por favor complete el nombre del programa"
                            },
                            maxLength: {
                                value: 100,
                                message: "El nombre no puede superar los 100 caracteres."
                            },
                        })}
                        required
                    />
                    <span> <Typography variant='body2' id="typographyErrorNombrePrograma" color='error'>{errors?.nombre?.message} </Typography></span>
                </div>

                <div className="row align-items-center p-1">
                    <div className="col-1">
                        <EmailIcon />
                    </div>
                    <div className="col-3">
                        <label style={{ fontWeight: "bold" }}>Correo</label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${classes.input}`}
                        placeholder="Ingrese Correo"
                        name="correoElectronico"
                        defaultValue={
                            programa ? programa.correoElectronico : null
                        }
                        ref={methods.register({
                            required: {
                                value: true,
                                message: "Por favor complete el correo"
                            },
                            maxLength: {
                                value: 50,
                                message: "El correo no puede superar los 50 caracteres"
                            },
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Por favor ingrese un correo válido"
                            }
                        })}
                        required
                    />
                    <span> <Typography variant='body2' id="typographyErrorCorreo" color='error'>{errors?.correoElectronico?.message} </Typography></span>
                </div>
            </div>
        </div>
    );
};

export default ProgramaForm;