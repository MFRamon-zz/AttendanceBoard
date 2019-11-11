import React, {Fragment} from 'react';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from '@material-ui/core/styles';

const FloatingActionButton = () => {

    const classes = useStyles();

    return (
        <Fragment>

            <Fab color="#D7D7D7" variant="extended" aria-label="delete" className={classes.fab}>
                <FontAwesomeIcon icon={faUserPlus} className={classes.extendedIcon}/>
                Add Professor
            </Fab>

        </Fragment>
    );
};

export default FloatingActionButton;

const useStyles = makeStyles(theme => ({
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