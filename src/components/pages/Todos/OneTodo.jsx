import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DeleteTodo } from '../../../services/deleteApi';
import { PostChangeTodo, PostComplatedTodo } from '../../../services/updateApi';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import RemoveDoneSharpIcon from '@mui/icons-material/RemoveDoneSharp';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import style from '../../../view/style/oneTodo.module.scss';

// for date
const options = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const OneTodo = ({
  text,
  id,
  completed,
  timeStart,
  timeEnd,
  setChange,
  pointTime,
  task_id,
}) => {
  const [deleteState, setDeleteState] = React.useState(false);
  const [loadingCompleted, setLoadingCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [isLoadingChange, setIsLoadingChange] = React.useState(false);
  const [todoUpdate, setTodoUpdate] = React.useState([{ tododes: '' }]);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const deleteHandler = () => {
    setIsLoading(true);
    DeleteTodo(id).then((res) => {
      setChange(new Date());
      setIsLoading(false);
    });
  };

  const completedHandler = (completed) => {
    document.getElementById('card' + id).style.background = completed
      ? '#6ECB63'
      : '#FFB319';
    setLoadingCompleted(true);
    PostComplatedTodo(id, {
      text: text,
      completed,
      timeStart: timeStart,
      timeEnd: completed ? new Date() : null,
      pointTime,
      task_id,
    })
      .then((res) => {
        setChange(new Date());
        setLoadingCompleted(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTimeStatrt = (start) => {
    document.getElementById('card' + id).style.background = '#FFB319';
    setLoadingCompleted(true);
    PostComplatedTodo(id, {
      text: text,
      completed,
      timeStart: start ? new Date() : null,
      timeEnd: null,
      pointTime,
      task_id,
    })
      .then((res) => {
        setChange(new Date());
        setLoadingCompleted(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEditHandler = () => {
    setIsReadOnly(false);
    setIsDisabled(false);
  };

  const setChangeTodoHandler = (e) => {
    setTodoUpdate({ ...todoUpdate, [e.target.name]: e.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const postTodoHandler = () => {
    setIsReadOnly(true);
    setIsLoadingChange(true);
    setIsDisabled(true);
    PostChangeTodo(id, {
      text: todoUpdate.tododes,
      completed,
      timeStart: timeStart,
      timeEnd: timeEnd,
      pointTime,
      task_id,
    })
      .then((res) => {
        setChange(new Date());
        setOpen(false);
        setIsLoadingChange(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getLengthTime(end, start) {
    const Delta = Math.abs(new Date(end) - new Date(start));

    let result;
    let min = Delta / 1000 / 60;

    if (min < 1) {
      result = Math.floor(Delta / 1000) + '  ?????????? ';
    } else if (min < 60) {
      result = Math.floor(min) + ' ??????????';
    } else if (min > 60) {
      result =
        (min / 60) % Math.floor(min / 60) == 0
          ? Math.floor(min / 60) + ' ????????'
          : Math.floor(min / 60) +
            ' ???????? ??' +
            Math.floor(60 * ((min / 60) % Math.floor(min / 60))) +
            '??????????';
    } else if (min / 60 / 24 > 1) {
      result = Math.floor(min / 60 / 24) + ' ??????';
    }

    return result;
  }
  const handleClose = () => {
    setOpen(false);
  };
  function handleDelete() {
    setDeleteState(true);
    setTimeout(() => {
      setDeleteState(false);
    }, 5000);
  }

  return (
    <>
      <Card
        className={style.box_todo}
        sx={{
          minWidth: 275,
          maxWidth: 325,
          backgroundColor: '#fff',
          borderRadius: 5,
        }}>
        {pointTime == null ? (
          ''
        ) : (
          <Tooltip title='???????? ??????'>
            <span className={style.timeaccest}>
              <p>{pointTime}</p>
              <AccessTimeIcon />
            </span>
          </Tooltip>
        )}
        <Tooltip title='???????? ???????? ?????? ???????? ???????? ????????' placement='left'>
          <CardContent
            id={'card' + id}
            sx={{
              backgroundColor: `${
                timeStart == null
                  ? '#D7E9F7'
                  : completed
                  ? '#6ECB63'
                  : '#FFB319'
              }`,
            }}
            className={style.body}
            onClick={handleClickOpen}>
            <Typography
              variant='body1'
              className={style.text_body}
              sx={{
                textDecoration: timeEnd == null ? 'none' : 'line-through',
                color: timeEnd == null ? 'none' : 'rgba(0, 0, 0, 0.5)',
              }}>
              {text}
            </Typography>
            <div className={style.boder}></div>
            <div>
              <Typography variant='body2' component='div' marginTop={2}>
                ????????:
                <br></br>
                {timeStart == null
                  ? '???????? ???????? ??????'
                  : new Date(timeStart).toLocaleString('fa-IR', options)}
              </Typography>
              <Typography variant='body2' component='div' marginTop={2}>
                <p>??????????:</p>
                {completed
                  ? new Date(timeEnd).toLocaleString('fa-IR', options)
                  : '  ???? ?????????? ???????????? ??????'}
              </Typography>
            </div>
          </CardContent>
        </Tooltip>
        <CardActions>
          <div className={style.card_actions}>
            <IconButton size='small' color='error'>
              {!deleteState ? (
                <Tooltip title='??????'>
                  <DeleteIcon onClick={handleDelete} />
                </Tooltip>
              ) : (
                <Tooltip title='?????????? ??????????'>
                  {!isLoading ? (
                    <GppMaybeRoundedIcon onClick={deleteHandler} />
                  ) : (
                    <CircularProgress sx={{ color: 'red' }} size={22} />
                  )}
                </Tooltip>
              )}
            </IconButton>
            <span className={style.TimeSpan}>
              {timeStart == null
                ? '???????? ????????'
                : timeEnd == null
                ? '?????????? ????????'
                : getLengthTime(timeEnd, timeStart)}
            </span>
            {loadingCompleted ? (
              <CircularProgress size={22} />
            ) : timeStart == null ? (
              <Tooltip title='????????'>
                <IconButton
                  size='small'
                  color='info'
                  onClick={() => handleTimeStatrt(true)}>
                  <CheckIcon sx={{ color: '#d35400' }} />
                </IconButton>
              </Tooltip>
            ) : !completed ? (
              <Tooltip title='?????????? ????????'>
                <IconButton
                  size='small'
                  color='info'
                  onClick={() => completedHandler(true)}>
                  <DoneAllSharpIcon sx={{ color: 'green' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='?????????? ????????'>
                <IconButton
                  size='small'
                  color='info'
                  onClick={() => completedHandler(false)}>
                  <RemoveDoneSharpIcon sx={{ color: '#d35400' }} />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </CardActions>
      </Card>
      {/* edit modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>?????? ???????? ???????????? ??????</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Tooltip
              title={
                isReadOnly ? '???????? ???????????? ???????????? ?????? ?????????? ???????? ????????' : ''
              }>
              <textarea
                className={style.todo_description}
                id='textarea'
                readOnly={isReadOnly}
                name='tododes'
                onChange={setChangeTodoHandler}
                onDoubleClick={openEditHandler}>
                {text}
              </textarea>
            </Tooltip>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Tooltip title='??????????'>
            <Button onClick={postTodoHandler} disabled={isDisabled}>
              {!isLoadingChange ? (
                <>??????????</>
              ) : (
                <>
                  ???????? ?????? ???????? &nbsp;
                  <CircularProgress sx={{ color: 'blue' }} size={22} />
                </>
              )}
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(OneTodo);
