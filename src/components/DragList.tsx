import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
import { TaskState } from "../models/TaskState";
import ListItem from "./ListItem";

function generateItem(i: number): Task {
  return {
    id: Math.floor(Math.random() * 1500).toString(),
    title: "title: " + i,
    description: "lorem ipsum dolor",
    state: TaskState.TODO,
  };
}

function DragList(l: TaskList, onChange: Function) {
  const [list, setList] = React.useState(l);

  const addToList = (index: number, e: Task) => {
    const result = Array.from(list.items);
    result.splice(index, 0, e);

    const cpy = list;
    cpy.items = result;
    setList(cpy);
    onChange();
  };

  const removeFromList = (index: number) => {
    const result = Array.from(list.items);
    result.splice(index, 1);

    const cpy = list;
    cpy.items = result;
    setList(cpy);
    onChange();
  };

  return (
    <Container maxWidth="sm">
      <Card style={{ backgroundColor: list.backColor }}>
        <CardHeader title={list.name} />
        <CardContent>
          <List>
            {list.items.map((e, i) => {
              return ListItem(e, list.frontColor, () => removeFromList(i));
            })}
          </List>
        </CardContent>
        <CardActions disableSpacing style={{ float: "right" }}>
          <IconButton
            onClick={() => {
              addToList(list.items.length, generateItem(list.items.length));
            }}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
}

export default DragList;
