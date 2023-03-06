import * as React from 'react';
import clsx from 'classnames';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface SmallDialogProps {
  open: boolean;
  handleClose?: () => void;
  title?: string;
  content?: React.ReactNode;
  button?: React.ReactNode;
}

const SmallDialog: React.FC<SmallDialogProps> = ({
  open,
  handleClose,
  title,
  content,
  button
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="small-dialog-title"
      aria-describedby="small-dialog-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>{button}</DialogActions>
    </Dialog>
  );
};

export default SmallDialog;
