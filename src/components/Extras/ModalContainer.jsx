import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import BuscarUsuarios from '../BuscarUsuarios'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    minHeight: '700px',
    minWidth: '1000px',
    backgroundColor: "#f3f3f3",
    border: '1px  #000',
    borderRadius: '15px',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalContainer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
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
        <Fade timeout={5}  in={open}>
          <div className={classes.popup}>
            <BuscarUsuarios handleClose={handleClose}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}