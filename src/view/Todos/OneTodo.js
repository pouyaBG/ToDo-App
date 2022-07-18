import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteTodo from '../../services/deleteApi';
import {
  PostComplatedTodo,
  PostUnComplatedTodo,
} from '../../services/updateApi';
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
import style from './style.module.scss';

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
  const [deleteState, setDeleteState] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const deleteHandler = () => {
    setIsLoading(true);
    DeleteTodo(id).then((res) => {
      setChange(new Date());
    });
  };
  const completedHandler = (completed) => {
    PostComplatedTodo(id, {
      text: text,
      completed,
      timeStart: timeStart,
      timeEnd: completed ? new Date() : null,
    })
      .then((res) => {
        setChange(new Date());
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   const uncompletedHandler = () => {
//     PostUnComplatedTodo(id, {
//       text: text,
//       completed: !completed,
//       timeStart: timeStart,
//       timeEnd: null,
//     })
//       .then((res) => {
//         setChange(new Date());
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style.box_todo}>
      <Card sx={{ minWidth: 275, maxWidth: 325 }}>
        <CardContent
          sx={{
            backgroundColor: `${
              completed
                ? 'rgba(68, 212, 11, 0.459)'
                : 'rgba(255, 123, 0, 0.459)'
            }`,
          }}
          className={style.body}
          onClick={handleClickOpen}>
          <Typography variant='body1' className={style.text_body}>
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
          <div className={style.card_actions}>
            <IconButton size='small' color='error'>
              {!deleteState ? (
                <Tooltip title='حدف'>
                  <DeleteIcon onClick={() => setDeleteState(true)} />
                </Tooltip>
              ) : (
                <Tooltip title='مطمئنید'>
                  {!isLoading ? (
                    <GppMaybeRoundedIcon onClick={deleteHandler} />
                  ) : (
                    <CircularProgress sx={{ color: 'red' }} size={22} />
                  )}
                </Tooltip>
              )}
            </IconButton>
            {!completed ? (
              <Tooltip title='تکمیل کردن'>
                <IconButton
                  size='small'
                  color='info'
                  onClick={()=> completedHandler(true)}>
                  <DoneAllSharpIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='تکمیل نشده'>
                <IconButton
                  size='small'
                  color='info'
                  onClick={()=> completedHandler(false)}>
                  <RemoveDoneSharpIcon />
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
            {text}
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
    </div>
  );
};

export default OneTodo;
