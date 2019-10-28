import React from "react";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Profesor from '../Profesor';
import { withStyles } from "@material-ui/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';



function Appbar(props) {
    

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { classes } = props;
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className="toolbar">
                <Typography variant="h6" noWrap className={classes.text}>
                    Administration Panel
          </Typography>
                <Button onClick={handleMenu}>
                    <Avatar button alt="Remy Sharp" src="http://2.bp.blogspot.com/-y6gRRHzE1aI/UkV3Do-lcaI/AAAAAAAAWUc/_5BwPJChM0Y/s1600/Wallpaper+Pelicula+-+Spiderman+%25284%2529.jpg" />
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
                    onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#F5F5F5'
    },
    text: {
        color: '#707070'
    },
})(Appbar)


