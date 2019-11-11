import React, {Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';

const Header = (props) => {
 
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
        <Fragment>

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
                            <MenuItem onClick={handleClose}>Log out</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

        </Fragment>
    );

};

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

export default Header;