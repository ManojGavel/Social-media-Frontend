import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditDialog,
  patchTodos,
  setEditTodo,
} from "../../Store/Home-Slice";
import { fetchTodos } from "../../Store/Todo-Slice";

export default function EditDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.home.editTodoDialog);
  const selectedTodo = useSelector((state) => state.home.selectedTodo);

  const handleClose = () => {
    dispatch(closeEditDialog());
  };

  const handleEditTodo = (e) => {
    dispatch(setEditTodo(e.target.value));
  };


  const handleUpdateClick = () => {
    console.log("come to update");
    return dispatch(patchTodos(selectedTodo))
      .unwrap()
      .then(() => dispatch(closeEditDialog()))
      .then(() => dispatch(fetchTodos()));
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Edit"
            type="email"
            fullWidth
            value={selectedTodo?.description}
            onChange={handleEditTodo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Close
          </Button>
          <Button
            onClick={handleUpdateClick}
            variant="contained"
            color="success"
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
