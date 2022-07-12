import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteTodo from '../../services/deleteApi';
import { PostComplatedTodo } from '../../services/postApi';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton, Tooltip } from '@mui/material';
// for date
const options = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const OneTodo = ({ text, id, completed, timeStart, timeEnd, setChange }) => {
  const deleteHandler = () => {
    DeleteTodo(id).then((res) => {
      setChange(new Date());
    });
  };
  const completedHandler = () => {
    PostComplatedTodo(id, {
      text: text,
      completed: !completed,
      timeStart: timeStart,
      timeEnd: new Date(),
    }).then((res) => {
      setChange(new Date());
    });
  };
  return (
    <div className='box-todo'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent className='body'>
          <Typography variant='body1' className='text-body'>
            {text}
          </Typography>

          <Typography variant='body2' component='div' marginTop={2}>
            شروع:
            <br></br>
            {new Date(timeStart).toLocaleString('fa-IR', options)}
          </Typography>
          <Typography variant='body2' component='div' marginTop={2}>
            <p>پایان:</p>
            {completed
              ? new Date(timeEnd).toLocaleString('fa-IR', options)
              : '  به پایان نرسیده است'}
          </Typography>
        </CardContent>
        <CardActions>
          <div className='card-actions'>
            <Tooltip title='حدف'>
              <IconButton size='small' color='error' onClick={deleteHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='تکمیل کردن'>
              <IconButton size='small' color='info' onClick={completedHandler}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default OneTodo;
