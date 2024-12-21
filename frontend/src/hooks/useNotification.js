import { useSnackbar } from 'notistack';

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccess = (message) => {
    enqueueSnackbar(message, { 
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'right' }
    });
  };

  const showError = (message) => {
    enqueueSnackbar(message, { 
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'right' }
    });
  };

  return { showSuccess, showError };
}; 