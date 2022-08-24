import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import AddIcon from "@mui/icons-material/Add";
import { Droppable } from "@react-forked/dnd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
import { TaskState } from "../models/TaskState";
import { AppDispatch, RootState } from "../redux/store";
import { pushTask, removeTask } from "../redux/taskSlice";
import ListItem from "./ListItem";

function DragList(index: number, onOpenEditDialog: Function) {
  //React Redux Hooks
  const lists = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container maxWidth="sm">
      <Droppable droppableId={`${index}`}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Card style={{ backgroundColor: lists[index].backColor }}>
              <CardHeader title={lists[index].name} />
              <CardContent>
                <List>
                  {lists[index].items.map((e, i) => {
                    return ListItem(
                      i,
                      e,
                      lists[index].frontColor,
                      () => dispatch(removeTask(index, i)),
                      onOpenEditDialog
                    );
                  })}
                </List>
              </CardContent>
              <CardActions disableSpacing style={{ float: "right" }}>
                <IconButton
                  onClick={() => {
                    dispatch(pushTask(index, "New Task", "No Description"));
                  }}
                >
                  <AddIcon />
                </IconButton>
              </CardActions>
            </Card>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
}

export default DragList;
