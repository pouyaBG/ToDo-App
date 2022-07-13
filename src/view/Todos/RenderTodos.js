import * as React from 'react';
import './style.scss';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { GetuserTodo } from '../../services/getApi';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { Skeleton, Slide, TextField, useScrollTrigger } from '@mui/material';
import PropTypes from 'prop-types';
import { PostTodoUser } from '../../services/postApi';
import { useNavigate } from 'react-router';
import OneTodo from './OneTodo';
import Panel from '../Dashboard/Panel';
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
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #ccc',
    boxShadow: 30,
    p: 3,
    borderRadius: 2,
  };

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
        {/* button add todo for show modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              متن فعالیت خود را وارد کنید !
            </Typography>
            <textarea className='todo-description'></textarea>
            <p
              className='error_null'
              style={{ color: 'red', visibility: 'hidden' }}>
              لطفا توضیحات فعالیت خود را وارد کنید!
            </p>
            <Button
              size='small'
              color='primary'
              className='btn-addTodo'
              onClick={addTodoHandler}
              setChange={setChange}>
              اضافه کردن
            </Button>
          </Box>
        </Modal>
        {/* end of modal */}
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
