import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteTodo from '../../../services/deleteApi';
import { PostComplatedTodo } from '../../../services/updateApi';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
}) => {
  const [deleteState, setDeleteState] = React.useState(false);
  const [loadingCompleted, setLoadingCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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
    })
      .then((res) => {
        setChange(new Date());
        setLoadingCompleted(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getLengthTime(end, start) {
    const Delta = Math.abs(new Date(end) - new Date(start));

    let result;
    let min = Delta / 1000 / 60;

    if (min < 1) {
      result = Math.floor(Delta / 1000) + '  ثانیه ';
    } else if (min < 60) {
      result = Math.floor(min) + ' دقیقه';
    } else if (min > 60) {
      result =
        (min / 60) % Math.floor(min / 60) == 0
          ? Math.floor(min / 60) + ' ساعت'
          : Math.floor(min / 60) +
            ' ساعت و' +
            Math.floor(60 * ((min / 60) % Math.floor(min / 60))) + "دقیقه";
    } else if (min / 60 / 24 > 1) {
      result = Math.floor(min / 60 / 24) + ' روز';
    }

    return result;
  }

  function handleDelete() {
    setDeleteState(true);
    setTimeout(() => {
      setDeleteState(false);
    }, 4000);
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
          <Tooltip title='زمان هدف'>
            <span className={style.timeaccest}>
              <p>{pointTime}</p>
              <AccessTimeIcon />
            </span>
          </Tooltip>
        )}
        <Tooltip title='برای دیدن متن کامل کلیک کنید' placement='left'>
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
                شروع:
                <br></br>
                {timeStart == null
                  ? 'شروع نشده است'
                  : new Date(timeStart).toLocaleString('fa-IR', options)}
              </Typography>
              <Typography variant='body2' component='div' marginTop={2}>
                <p>پایان:</p>
                {completed
                  ? new Date(timeEnd).toLocaleString('fa-IR', options)
                  : '  به پایان نرسیده است'}
              </Typography>
            </div>
          </CardContent>
        </Tooltip>
        <CardActions>
          <div className={style.card_actions}>
            <IconButton size='small' color='error'>
              {!deleteState ? (
                <Tooltip title='حدف'>
                  <DeleteIcon onClick={handleDelete} />
                </Tooltip>
              ) : (
                <Tooltip title='مطمئن هستید'>
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
                ? 'شروع نشده'
                : timeEnd == null
                ? 'تکمیل نشده'
                : getLengthTime(timeEnd, timeStart)}
            </span>
            {loadingCompleted ? (
              <CircularProgress size={22} />
            ) : timeStart == null ? (
              <Tooltip title='شروع'>
                <IconButton
                  size='small'
                  color='info'
                  onClick={() => handleTimeStatrt(true)}>
                  <CheckIcon sx={{ color: '#d35400' }} />
                </IconButton>
              </Tooltip>
            ) : !completed ? (
              <Tooltip title='تکمیل کردن'>
                <IconButton
                  size='small'
                  color='info'
                  onClick={() => completedHandler(true)}>
                  <DoneAllSharpIcon sx={{ color: 'green' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='تکمیل نشده'>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>متن کامل فعالیت شما</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <textarea
              name=''
              className={style.todo_description}
              readOnly={true}>
              {text}
            </textarea>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Tooltip title='ویرایش'>
            <IconButton onClick={handleClose} autoFocus>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(OneTodo);
