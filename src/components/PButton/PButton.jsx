import React, { Fragment, Component } from "react";
import Fab from "@material-ui/core/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import DialogForm from "../DialogProfessor/DialogProfessor";

const styles = theme => ({
  fab: {
    margin: theme.spacing(1),
    zIndex: 5000,
    position: "fixed",
    bottom: 30,
    right: 30
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
});

class FloatingActionButton extends Component {
  handleClickOpen = () => {
    this.setState({ dialogForm: { open: true } });
  };
  handleClose = () => {
    this.setState({ dialogForm: { open: false } });
  };
  constructor(props) {
    super(props);
    this.state = {
      dialogForm: {
        open: false
      }
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Fab
          color="primary"
          variant="extended"
          aria-label="delete"
          onClick={this.handleClickOpen}
          className={classes.fab}
        >
          <FontAwesomeIcon icon={faUserPlus} className={classes.extendedIcon} />
          Add Professor
        </Fab>
        <DialogForm
          open={this.state.dialogForm.open}
          handleClose={this.handleClose.bind(this)}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(FloatingActionButton);
