import { useState } from 'react';

interface UseModalReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useModal = (): UseModalReturn => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
  };
};

export default useModal;
