import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Perfil_Vacio from "../../assets/images/perfil-vacio.jpg";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import BuscarUsuarios from "../GestionUsuariosComponents/BuscarUsuarios";
import { Typography } from "@material-ui/core";
import { useFormContext } from "react-hook-form";

const useStyle = makeStyles((theme) => ({
  container: {
    //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
    fontSize: "100%",
    fontFamily: "Roboto",
    fontWeight: "bold",
    borderRadius: "5px",
    border: " 1px solid #BBBBBB",
    backgroundColor: "#ECECEC",
  },

  input: {
    fontSize: "85%",
    fontFamily: "Roboto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    height: "90%",
    width: "92%",
    backgroundColor: "#f3f3f3",
    border: "1px  #000",
    borderRadius: "15px",
    padding: theme.spacing(2, 4, 3),
  },
  medium: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

const ProgramaResponsable = ({ programa }) => {
  //const [image, setImage] = useState(`data:image/;base64,${Img}`);
  const [open, setOpen] = React.useState(false);
  const classes = useStyle();

  const methods = useFormContext();
  const { errors } = useFormContext();
  //Handlers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`container pt-3 h-100 w-100 ${classes.container}`}>
      <Avatar
        className={`mx-auto ${classes.medium} mb-3`}
        src={programa ? Perfil_Vacio : Perfil_Vacio}
      />

      <label> Responsable de Programa </label>
      <div className="row align-items-center">
        <div className="col-sm-7 col-md-8 col-lg-9 col-xl-10">
          <input
            type="text"
            className={`form-control ${classes.input}`}
            placeholder="Buscar Responsable de Programa"
            name="responsablePrograma"
            disabled
            value={
              methods.getValues("nombreResponsable")
                ? methods.getValues("nombreResponsable")
                : programa
                ? programa.nombres +
                  " " +
                  programa.apellidoPaterno +
                  " " +
                  programa.apellidoMaterno
                : ""
            }
            ref={methods.register({
              required: {
                value: true,
                message: "Por favor seleccione un coordinador"
              },
              minLength: {
                value: 2,
                message: "Por favor seleccione un coordinador"
              }
            })}
          />
          <span> <Typography id="typographyErrorResponsable" variant='body2' color='error'>{errors?.responsablePrograma?.message}</Typography></span>
        </div>

        <div className="col p-0">
          <IconButton
            id="buttonBuscarResposable"
            aria-label="SearchIcon"
            disableFocusRipple
            disableRipple
            onClick={handleOpen}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
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
              <div className={classes.popup}>
                <BuscarUsuarios handleClose={handleClose} />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default ProgramaResponsable;
