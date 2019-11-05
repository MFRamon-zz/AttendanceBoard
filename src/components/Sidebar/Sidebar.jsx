import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Profesor from "../Profesor";
import {
  getClassrooms,
  getGeofences,
  getClassroomsNames
} from "../../controllers/classroomController";
import { updateGeofence } from "../../controllers/geofenceController";

const drawerWidth = 280;

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem>
            <Profesor />
          </ListItem>
          <ListItem>
            <Profesor />
          </ListItem>
          <ListItem>
            <input
              type="button"
              value="Click"
              onClick={() => getClassrooms()}
            />
          </ListItem>
          <ListItem>
            <input type="button" value="Click" onClick={() => getGeofences()} />
          </ListItem>
          <ListItem>
            <input
              type="button"
              value="Click"
              onClick={() => getClassroomsNames()}
            />
          </ListItem>
          <ListItem>
            <input type="button" value="Try" onClick={() => updateGeofence()} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1
  },
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar
}));
