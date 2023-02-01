import * as React from 'react';
import clsx from 'classnames';
import Modal from '@mui/material/Modal';

interface SmallModalProps {
  open: boolean;
  handleClose: () => void;
}

const SmallModal: React.FC<SmallModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={clsx('')}>test</div>
    </Modal>
  );
};

export default SmallModal;
