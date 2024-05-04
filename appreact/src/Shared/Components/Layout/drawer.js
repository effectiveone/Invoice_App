import React from "react";
import { Link } from "react-router-dom";
import { sanitizedUrl } from "../../Utils/api";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListIcon from "@material-ui/icons/List";
import BusinessIcon from "@material-ui/icons/Business";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { t } from "i18next";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  toolbar: theme.mixins.toolbar,
}));

const PermanentDrawer = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="permanent-drawer">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Toolbar />
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button component={Link} to={sanitizedUrl.MainPage}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={t("dashboardPage")} />
          </ListItem>
          <ListItem button component={Link} to={sanitizedUrl.AllInvoices}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={t("newInvoice")} />
          </ListItem>
          <ListItem button component={Link} to={sanitizedUrl.Dashboard}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={t("allInvoice")} />
          </ListItem>

          <ListItem button component={Link} to={sanitizedUrl.Inventory}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={t("inventory")} />
          </ListItem>
          <ListItem button component={Link} to={sanitizedUrl.Kontrahent}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={t("contrahent")} />
          </ListItem>
          <ListItem button component={Link} to={sanitizedUrl.MyCompany}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={t("myCompany")} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to={sanitizedUrl.Settings}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t("settings")} />
          </ListItem>
        </List>
      </Drawer>
      <main>{children}</main>
    </div>
  );
};

export default PermanentDrawer;
