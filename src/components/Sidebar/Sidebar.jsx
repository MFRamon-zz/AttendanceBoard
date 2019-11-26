import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import {
  getClassrooms,
  getGeofences,
} from "../../helpers/queries";
import { updateGeofence } from "../../helpers/queries";
import Profesor from '../Professor/Professor';
import Header from '../Header/Header'

const drawerWidth = 280;


const Sidebar = ({data}) => {


  const classes = useStyles();

  const [state, setState] = useState({
    data: null,
    profesors: [
      
    ],
    profesor: null
  });
  const [selected, setSelected] = useState(0);

  useState(()=>{
    const info = data
    setState({profesors: info})
  })

  // useEffect(()=>{
  //   const didMount = () => {
  //     setState({profesors: data})
  //   }
  // })

  const showGeofence = (position) => {
    // let profesor = {
    //   id: p,
    //   active: true
    // }
    // const info = data
    // setState({profesors: info})
    // let selectedTeacher = data[position]
    // setState({
    //   profesors: state.profesors,
    //   profesor: selectedTeacher})
    //setState({ profesors[position].isFocused: true})
    //state.selected = position;
    setSelected(position);
    setState({profesors: state.profesors})
    console.log("Hooks state: ", state)
  }

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


           { state.profesors.map((p, i) => (
            <ListItem onClick={showGeofence.bind(this, i)}> 
              <Profesor name={p.name} image={p.image ? p.image : "https://www.showplacerents.com/img/user-placeholder.png"} 
              active={(selected===i) ? true : false} status={true} />
            </ListItem>
          )) } 


          {/* <ListItem>
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
              //onClick={() => getClassroomsNames()}
            />
          </ListItem>
          <ListItem>
            <input type="button" value="Try" onClick={() => updateGeofence()} />
          </ListItem> */}
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

