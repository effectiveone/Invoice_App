import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Button: {
    display: "flex",
    flexDirection: "row",
    gap: "150px",
    marginLeft: "50px",
    paddingBottom: "50px",
  },
}));
const useSubmitButton = (handleSubmit, handleSubmitEdit, buttonText) => {
  const classes = useStyles();

  const handleButtonClick = () => {
    buttonText === "Zapisz" ? handleSubmit() : handleSubmitEdit();
  };

  const button = (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={handleButtonClick}
    >
      {buttonText}
    </Button>
  );

  return button;
};

export default useSubmitButton;
