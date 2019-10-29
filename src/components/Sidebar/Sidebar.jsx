import React from "react";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/styles";
import Profesor from '../Profesor';

const drawerWidth = 280;

function Sidebar(props) {
    const { classes }  = props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem>
                            <Profesor />
                        </ListItem>
                        <ListItem>
                            <Profesor />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
    );
}

export default withStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
    }
})(Sidebar)
