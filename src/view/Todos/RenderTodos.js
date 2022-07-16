import * as React from 'react';
import './style.scss';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { GetuserTodo } from '../../services/getApi';
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import PropTypes from 'prop-types';
import { PostTodoUser } from '../../services/postApi';
import { useNavigate } from 'react-router';
import OneTodo from './OneTodo';
import Panel from '../Dashboard/Panel';
import Dialog from '@mui/material/Dialog';
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='up' in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const MyTodo = () => {
  const [todo, setTodo] = React.useState(null);
  const [isloading, setIsLoading] = React.useState(false);
  const [change, setChange] = React.useState(new Date());
  const redirect = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token') == null) {
      redirect('/');
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    GetuserTodo().then((res) => {
      setTodo(res.todos);
      setIsLoading(false);
      setOpen(false);
    });
  }, [change]);

  const addTodoHandler = () => {
    const discriptionTodo = document.querySelector('.todo-description');
    const erorNull = document.querySelector('.error_null');
    if (discriptionTodo.value === '') {
      erorNull.style.visibility = 'visible';
      setTimeout(() => {
        erorNull.style.visibility = 'hidden';
      }, 2500);
    } else {
      PostTodoUser({
        text: discriptionTodo.value,
        completed: false,
        timeStart: new Date(),
        timeEnd: null,
      })
        .then(() => setChange(new Date()))
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    }
  };
  const complateHandler = (e) => {
    console.log(e);
  };
  // modal functions
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function LoadingPreview() {
    return (
      <div
        className='loading-skeleton'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
      </div>
    );
  }

  return (
    <>
      <Panel />
      <section className='container-todo'>
        {isloading ? (
          <>
            <LoadingPreview />
            <LoadingPreview />
            <LoadingPreview />
            <LoadingPreview />
          </>
        ) : todo == null ? (
          'nothing todo'
        ) : (
          todo.map((items) => (
            <OneTodo
              key={items.id}
              {...items}
              onComplate={complateHandler}
              setChange={setChange}
            />
          ))
        )}
        {/* button add todo for show Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            متن فعالیت خود را وارد کنید !
          </DialogTitle>
          <DialogContent>
            <textarea className='todo-description'></textarea>
            <p className='error_null'>لطفا توضیحات فعالیت خود را وارد کنید!</p>
          </DialogContent>
          <DialogActions>
            <Button
              size='small'
              color='primary'
              className='btn-addTodo'
              onClick={addTodoHandler}
              setChange={setChange}>
              {!isloading ? (
                <>اضافه کردن</>
              ) : (
                <>
                  لطفا صبر کنید &nbsp;
                  <CircularProgress sx={{ color: 'blue' }} size={22} />
                </>
              )}
            </Button>
          </DialogActions>
        </Dialog>
        {/* end of Dialog */}
        <HideOnScroll>
          <Stack
            direction='row'
            spacing={0}
            position='fixed'
            className='button-addTodo'>
            <Button
              variant='contained'
              endIcon={<AddIcon />}
              style={{
                backgroundImage:
                  'linear-gradient(-425deg, #77ffd2 0%, #6297db 20%, #1eecff 100%)',
              }}
              onClick={handleOpen}>
              اضافه کردن فعالیت
            </Button>
          </Stack>
        </HideOnScroll>
      </section>
    </>
  );
};

export default MyTodo;
