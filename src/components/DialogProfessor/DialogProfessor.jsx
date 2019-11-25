import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from '@material-ui/core/MenuItem';

import { newTeacher } from "../../helpers/querys";
import * as factories from "../../helpers/factories";
import { CreateUser } from "../../helpers/auth";
import { createEmail } from "../../helpers/createEmailFunction";


const roles = [
  {
    value: 'Coordinador',
    label: 'Professor',
  },
  {
    value: 'Maestro',
    label: 'Principal',
  },
];

export default function DialogProfessor(props) {
  const [open, setOpen] = React.useState(false);
  const [currency, setRole] = React.useState('EUR');

  const handleChange = event => {
    setRole(event.target.value);
  };

  async function insertTeacher() {
    const email = createEmail("Juan Carlos Aviña Luna", "63533");
    const uid = await CreateUser(email, "123456");
    await newTeacher(
      factories.newTeacher("Juan Carlos Aviña Luna", "teacher", uid)
    );
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Professor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduce all the Professor Information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="filled"
          />
          <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Register Number"
            type="numeric"
            fullWidth
            variant="filled"
          />
          <TextField
            id="filled-select-currency"
            select
            label="Role"
            margin="normal"
            fullWidth
            variant="filled"
            value={currency}
            onChange={handleChange}>
            {roles.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={async () => await insertTeacher()} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
