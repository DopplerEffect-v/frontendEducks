import { React, useState } from "react";
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

const FacultadForm = ({ facultad }) => {
    const classes = useStyle();

    const methods = useFormContext({
        mode: "onChange"
      });
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
                        defaultValue={facultad ? facultad.siglas : null}
                        /* onBlur={e => { verifySiglas(e.target.value); setFlag(flagSiglas) }} */
                        /* onChange={e => setCadena(e.target.value)} */
                        ref={methods.register({
                            required: {
                                value: true,
                                message: "Por favor ingrese las siglas"
                            },
                            maxLength: {
                                value: 10,
                                message: "Las siglas no pueden superar los 10 caracteres."
                            },
                            pattern: {
                                value: /^([A-Z0-9]{0,})+[A-Z0-9]+([A-Z0-9]{0,})$/,
                                message: "Por favor ingrese las siglas en mayuscula"
                            }
                        })}
                        title="hola"
                        required
                    />
                    <span id="spanErrorSiglas"> <Typography id="typographyErrorSiglas" variant='body2' color='error'>{errors?.siglas?.message } </Typography></span>
                    {/* {flag && <span> <Typography variant='body2' color='error'>Estas siglas ya están registradas</Typography></span>} */}
                </div>

                <label className="p-1" style={{ fontWeight: "bold" }}>
                    Nombre Facultad
                </label>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control mb-2 ${classes.input}`}
                        placeholder="Ingrese Nombre"
                        name="nombreFacultad"
                        defaultValue={facultad ? facultad.nombreFacultad : null}
                       
                        ref={methods.register({
                            required: {
                                value: true,
                                message: "Por favor complete el nombre de la facultad"
                            },
                            maxLength: {
                                value: 100,
                                message: "El nombre no puede superar los 100 caracteres."
                            }
                        })}
                        required
                    />
                    <span> <Typography id="typographyErrorNombre" variant='body2' color='error'>{errors?.nombreFacultad?.message} </Typography></span>
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

                            facultad ? facultad.correoElectronico : null
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
                    <span> <Typography id="typographyErrorCorreo" variant='body2' color='error'>{errors?.correoElectronico?.message} </Typography></span>
                </div>
            </div>
        </div>
    );
};

export default FacultadForm;
