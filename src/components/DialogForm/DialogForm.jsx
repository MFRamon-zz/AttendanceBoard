import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";

import * as factories from "../../helpers/factories";
import { getCourses } from "../../helpers/queries";
import app from "../../config/firebaseConfig";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

let courses = [];

function getStyles(name, classroomList, theme) {
  return {
    fontWeight:
      classroomList.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function DialogForm(props) {
  useState(async () => {
    courses = await getCourses();
  });

  //const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const [classroomList, setClassroomList] = React.useState([]);
  const [classroomName, setClassroomName] = React.useState([]);

  const handleChange = event => {
    setClassroomList(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Geofence</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the following form in order to complete the geofence
            registration.
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">
              Courses in this geofence
            </InputLabel>
            <Select
              autoFocus
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={classroomList}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {courses.map(name => (
                <MenuItem
                  key={name.title}
                  value={name.title}
                  style={getStyles(name.title, classroomList, theme)}
                >
                  {name.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="name"
            label="Course Name"
            type="text"
            fullWidth
            onChange={event => {
              setClassroomName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={p => {
              const listRef = classroomList.map(c => {
                var obj = courses.find(course => course.title === c);
                return app.firestore().doc(`courses/${obj._id.id}`);
              });

              let listofSelectedCourses = {
                courses: listRef,
                name: classroomName
              };
              props.handleGeofenceComplete(listofSelectedCourses);
            }}
            color="primary"
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
