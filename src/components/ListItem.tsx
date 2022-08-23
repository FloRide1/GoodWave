import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Task } from "../models/Task";
import CloseIcon from "@mui/icons-material/Close";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

const DragItem = styled.div` padding : 10px;
border - radius : 6px;
margin : 0 0 8px 0;
display : grid;
grid - gap : 20px;
flex - direction : column;
`;

function ListItem(task: Task, color: string, onRemove: Function) {
  return (
    <DragItem>
      <Card style={{ backgroundColor: color }}>
        <CardActions disableSpacing style={{ float: "right" }}>
          <IconButton onClick={() => onRemove()}>
            <CloseIcon />
          </IconButton>
        </CardActions>
        <CardHeader title={task.title} />
        <CardContent>
          <Typography paragraph>{task.description}</Typography>
        </CardContent>
      </Card>
    </DragItem>
  );
}

export default ListItem;
