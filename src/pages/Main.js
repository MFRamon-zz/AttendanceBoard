import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import Profesor from '../components/Profesor';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
//import MoreIcon from '@material-ui/icons/MoreVert';
//import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Map from '../components/Map/Map';

const drawerWidth = 280;



export default function ClippedDrawer() {
  const classes = useStyles();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="toolbar">
          <Typography variant="h6" noWrap className={classes.text}>
            Administration Panel
          </Typography>
          <Button onClick={handleMenu}>
            <Avatar button alt="Remy Sharp" src="http://2.bp.blogspot.com/-y6gRRHzE1aI/UkV3Do-lcaI/AAAAAAAAWUc/_5BwPJChM0Y/s1600/Wallpaper+Pelicula+-+Spiderman+%25284%2529.jpg"/>
          </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.toolbar} />
        <List>
            <ListItem>
                <Profesor/>
            </ListItem>
            <ListItem>
                <Profesor/>
            </ListItem>
        </List>
      </Drawer>
      <Fab color="#D7D7D7" variant="extended" aria-label="delete" className={classes.fab}>
        <FontAwesomeIcon icon={faUserPlus} className="icon" className={classes.extendedIcon}/>
        Add Professor
      </Fab>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Map></Map>
      </main>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#F5F5F5'
    },
    text: {
        color: '#707070'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    fab: {
        margin: theme.spacing(1),   
        zIndex: 5000,
        position: "fixed",
        bottom: 30,
        right: 30
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
  }));