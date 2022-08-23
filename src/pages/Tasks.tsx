import { Box, List } from "@material-ui/core";
import Button from "@mui/material/Button";
import { DragDropContext } from "@react-forked/dnd";
import React from "react";
import { useState } from "react";
import DragList from "../components/DragList";
import EditDialog from "../components/EditDialog";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
import { TaskState } from "../models/TaskState";

const init_list: Array<TaskList> = [];

// TODO
init_list.push({
  name: "TODO",
  items: [],
  frontColor: "tomato",
  backColor: "firebrick",
});

// IN PROGRESS
init_list.push({
  name: "IN PROGRESS",
  items: [],
  frontColor: "orange",
  backColor: "darkorange",
});

// DONE
init_list.push({
  name: "DONE",
  items: [],
  frontColor: "green",
  backColor: "darkgreen",
});

function Tasks() {
  // Object are passed by reference
  const [lists, setLists] = React.useState(init_list);
  const [render, rerender] = useState(false);
  const dialogRef = React.useRef(null);

  const onOpenEditDialog = (task: Task) => {
    const temp: any = dialogRef.current;
    temp.openDialog(task);
  };

  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const addToList = (list: Array<Task>, index: number, e: Task) => {
    const result = Array.from(list);
    result.splice(index, 0, e);
    return result;
  };

  const removeFromList = (list: Array<Task>, index: number) => {
    const result = Array.from(list);
    result.splice(index, 1);
    return result;
  };

  function onDragEnd(result: any) {
    const { source, destination } = result;

    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    // Drop on the same list
    if (sInd === dInd) {
      lists[sInd].items = reorder(
        lists[sInd].items,
        source.index,
        destination.index
      );
    } else {
      const item = lists[sInd].items[source.index];
      lists[sInd].items = removeFromList(lists[sInd].items, source.index);
      lists[dInd].items = addToList(lists[dInd].items, destination.index, item);
    }

    setLists(lists);
    onChange();
  }

  const onValidate = (t: Task) => {
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

    if (list_index !== -1 && item_index !== -1) {
      lists[list_index].items[item_index] = t;
      setLists(lists);
      onChange();
    }
  };

  // But i still need to rerender the data from child components
  const onChange = () => {
    rerender(!render);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((e: TaskList, index: number) =>
            DragList(index, e, onChange, onOpenEditDialog)
          )}
        </DragDropContext>
      </Box>
      <EditDialog ref={dialogRef} onValidate={onValidate} />
    </div>
  );
}

export default Tasks;
