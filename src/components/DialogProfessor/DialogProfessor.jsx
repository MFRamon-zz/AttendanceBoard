import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from '@material-ui/core/MenuItem';

import { newTeacher } from "../../helpers/queries";
import * as factories from "../../helpers/factories";
import { CreateUser } from "../../helpers/auth";
import { createEmail } from "../../helpers/createEmailFunction";


const roles = [
  {
    value: 'Maestro',
    label: 'Professor',
  },
  {
    value: 'Coordinador',
    label: 'Principal',
  },
];

export default function DialogProfessor(props) {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [name, setName] = React.useState('');
  
  async function insertTeacher(name,number,role) {
    const email = createEmail(name, number);
    const uid = await CreateUser(email, number);
    await newTeacher(
      factories.newTeacher(name, role, uid)
    );
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleRole = event => {
    setRole(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
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
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Register Number"
            type="numeric"
            fullWidth
            variant="filled"
            value={number}
            onChange={handleNumber}
          />
          <TextField
            id="filled-select-currency"
            select
            label="Role"
            margin="normal"
            fullWidth
            variant="filled"
            value={role}
            onChange={handleRole}>
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
          <Button style={{ backgroundColor: "#6200ea", color: "white" }}
            onClick={async () => await insertTeacher(name,number,role)}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
