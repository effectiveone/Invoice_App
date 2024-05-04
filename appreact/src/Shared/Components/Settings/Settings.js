import React from "react";
import { Grid } from "@material-ui/core";
import CustomSelect from "./CustomSelect";
import TemplateCheckbox from "./templateCheckbox";
import DesignSelect from "./designSelect";

const Settings = () => {
  return (
    <Grid
      style={{
        margin: "20px 20px 20px 20px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <DesignSelect />
      <CustomSelect />
      <TemplateCheckbox />
    </Grid>
  );
};

export default Settings;
