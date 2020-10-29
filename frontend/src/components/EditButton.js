import React from 'react';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

const OurModal = ({
  children,
  open,
  setOpen,
  width,
  height,
  minWidth,
  maxWidth,
  maxHeight,
}) => {
  const PaperModal = withStyles({
    root: {
      outline: 'none',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      position: 'absolute',
      width,
      minWidth,
      height,
    },
  })(Paper);

  const StyledBackdrop = withStyles({
    root: {
      backdropFilter: 'blur(7px) !important',
    },
  })(Backdrop);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      BackdropComponent={StyledBackdrop}
    >
      <PaperModal elevation={8}>
        <CloseIcon
          style={{
            fontSize: '1.5rem',
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
          onClick={() => setOpen(false)}
        />
        {children}
      </PaperModal>
    </Modal>
  );
};

export default OurModal;