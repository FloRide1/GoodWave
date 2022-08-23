import { Box, List } from "@material-ui/core";
import Button from "@mui/material/Button";
import React from "react";
import { useState } from "react";
import DragList from "../components/DragList";
import { TaskList } from "../models/TaskList";

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

  // But i still need to rerender the data from child components
  const onChange = () => {
    rerender(!render);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {lists.map((e: TaskList) => DragList(e, onChange))}
    </Box>
  );
}

export default Tasks;
