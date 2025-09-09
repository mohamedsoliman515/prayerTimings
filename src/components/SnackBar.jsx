import useMainContent from "../Hooks/useMainContent";
import {  Snackbar, Alert } from "@mui/material";

const SnackBar = () => {
  const {
    locationError,
    setLocationError,
  } = useMainContent();
  return (
    <Snackbar
      open={!!locationError} 
      autoHideDuration={10000}
      onClose={() => setLocationError("")}
    >
      <Alert
        onClose={() => setLocationError("")}
        severity="warning"
        sx={{ width: "100%" }}
      >
        {locationError}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
