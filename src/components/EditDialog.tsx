import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Task } from "../models/Task";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";

interface EditProps {
  onValidate: Function;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default React.forwardRef((props: EditProps, ref) => {
  const [render, rerender] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState<Task>({
    id: "-1",
    title: "New Task",
    description: "No Description",
  });
  const [titleValid, setTitleValid] = React.useState(true);
  const [descValid, setDescValid] = React.useState(true);

  React.useImperativeHandle(ref, () => ({
    openDialog: (t: Task) => {
      // Clone for avoiding read-only error
      const new_task: Task = {
        id: t.id,
        title: t.title,
        description: t.description,
      };
      handleClickOpen();
      setTask(new_task);
      rerender(!render);
    },
  }));

  const onTitleChange = (e: any) => {
    const temp = task;
    temp.title = e.target.value;
    setTask(temp);
    setTitleValid(e.target.value.length > 0);
    rerender(!render);
  };

  const onDescChange = (e: any) => {
    const temp = task;
    temp.description = e.target.value;
    setTask(temp);

    // TODO: Remove 200 HARDCODED VALUE
    setDescValid(e.target.value.length > 0 && e.target.value.length < 200);
    rerender(!render);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = () => {
    handleClose();
    props.onValidate(task);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <EditIcon />
          {"    Edit task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            error={!titleValid}
            label="Title"
            size="medium"
            variant="filled"
            fullWidth
            onChange={(e) => onTitleChange(e)}
            value={task.title}
          />
          <br />
          <TextField
            label="Description"
            error={!descValid}
            multiline
            size="medium"
            minRows={3}
            variant="filled"
            fullWidth
            onChange={(e) => onDescChange(e)}
            value={task.description}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={!titleValid || !descValid}
            onClick={validate}
          >
            Validate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
