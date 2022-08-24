import { Box, List } from "@material-ui/core";
import Button from "@mui/material/Button";
import { DragDropContext } from "@react-forked/dnd";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragList from "../components/DragList";
import EditDialog from "../components/EditDialog";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
import { TaskState } from "../models/TaskState";
import { AppDispatch, RootState } from "../redux/store";
import { addTask, removeTask, reorderTask, setTask } from "../redux/taskSlice";

function Tasks() {
  const dialogRef = React.useRef(null);

  //React Redux Hooks
  const lists = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();

  const onOpenEditDialog = (task: Task) => {
    const temp: any = dialogRef.current;
    temp.openDialog(task);
  };

  function onDragEnd(result: any) {
    const { source, destination } = result;

    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    // Drop on the same list
    if (sInd === dInd) {
      dispatch(reorderTask(sInd, source.index, destination.index));
    } else {
      const item = lists[sInd].items[source.index];
      dispatch(removeTask(sInd, source.index));
      dispatch(addTask(dInd, destination.index, item));
    }
  }

  const onValidate = (t: Task) => {
    // Find corresponding index
    let list_index = -1;
    let item_index = -1;
    lists.forEach((list: TaskList, list_i: number) => {
      list.items.forEach((item: Task, item_i: number) => {
        if (item.id === t.id) {
          list_index = list_i;
          item_index = item_i;
        }
      });
    });

    // TODO: Add security
    if (list_index !== -1 && item_index !== -1) {
      dispatch(setTask(list_index, item_index, t));
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((e: TaskList, index: number) =>
            DragList(index, onOpenEditDialog)
          )}
        </DragDropContext>
      </Box>
      <EditDialog ref={dialogRef} onValidate={onValidate} />
    </div>
  );
}

export default Tasks;
