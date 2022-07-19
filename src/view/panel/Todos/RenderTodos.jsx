import * as React from 'react';
import style from './style.module.scss';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { GetuserTodo } from '../../../services/getApi';
import {
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Skeleton,
  Slide,
  TextField,
  useScrollTrigger,
} from '@mui/material';
import PropTypes from 'prop-types';
import { PostTodoUser } from '../../../services/postApi';
import { useNavigate } from 'react-router';
import OneTodo from '../../../components/common/Todos/OneTodo';
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
  const [state, setState] = React.useState(null);
  const [isloading, setIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [loadAddTodo, setLoadAddTodo] = React.useState(false);
  const [change, setChange] = React.useState(new Date());
  const [isPointTime, setIsPointTime] = React.useState(false);
  const [valueTime, setValueTime] = React.useState(null);
  // modal functions
  const [open, setOpen] = React.useState(false);

  const redirect = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token') == null) {
      redirect('/');
    }
    setIsLoading(true);
    GetuserTodo().then((res) => {
      setOpen(false);
      setIsLoading(false);
      setState(res.todos);
    });
  }, []);

  React.useEffect(() => {
    GetuserTodo().then((res) => {
      setOpenModal(false);
      setLoadAddTodo(false);
      setState(res.todos);
    });
  }, [change]);

  const addTodoHandler = () => {
    const discriptionTodo = document.querySelector('#todo-description');
    let timePointValue;
    if (isPointTime) {
      const timeType = document.getElementById('timeType').value;
      const timeNumber = document.getElementById('timeNumber').value;
      timePointValue = timeNumber + timeType;
    }

    const erorNull = document.querySelector('#error_null');
    if (discriptionTodo.value === '') {
      erorNull.style.visibility = 'visible';
      setTimeout(() => {
        erorNull.style.visibility = 'hidden';
      }, 2500);
    } else {
      setLoadAddTodo(true);
      PostTodoUser({
        text: discriptionTodo.value,
        completed: false,
        timeStart: null,
        timeEnd: null,
        pointTime: !isPointTime ? null : timePointValue,
      })
        .then(() => setChange(new Date()))
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  const complateHandler = (e) => {
    // console.log(e);
  };

  const handleClose2 = () => setOpenModal(false);

  function LoadingPreview() {
    return (
      <div
        className={style.loading_skeleton}
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
      <section className={style.container_todo}>
        {isloading ? (
          <>
            <LoadingPreview />
            <LoadingPreview />
            <LoadingPreview />
            <LoadingPreview />
          </>
        ) : state == null ? (
          'nothing todo'
        ) : (
          state.map((items) => (
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
          open={openModal}
          onClose={handleClose2}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id={style.alert_dialog_title}>
            متن فعالیت خود را وارد کنید !
          </DialogTitle>
          <DialogContent>
            <div>
              <textarea
                id='todo-description'
                className={style.todo_description}></textarea>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              {!isPointTime ? (
                <FormControlLabel
                  label='زمان هدف کار ثبت شود ؟'
                  onClick={() => setIsPointTime(true)}
                  control={<Checkbox defaultChecked={isPointTime} />}
                />
              ) : (
                <>
                  <FormControlLabel
                    label='زمان هدف کار ثبت شود ؟'
                    onClick={() => setIsPointTime(false)}
                    control={<Checkbox defaultChecked={isPointTime} />}
                  />
                  <input
                    id='timeNumber'
                    type='number'
                    defaultValue={0}
                    style={{
                      height: 40,
                      width: 60,
                      marginLeft: 10,
                      textAlign: 'center',
                      padding: 5,
                    }}
                  />
                  <select
                    id='timeType'
                    style={{
                      height: 40,
                      width: 80,
                      marginLeft: 10,
                      textAlign: 'center',
                      padding: 5,
                    }}>
                    <option value='ساعت'>ساعت</option>
                    <option value='دقیقه'>دقیقه</option>
                  </select>
                </>
              )}
            </div>
            <p id='error_null' className={style.error_null}>
              لطفا توضیحات فعالیت خود را وارد کنید!
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              size='small'
              color='primary'
              onClick={addTodoHandler}
              setChange={setChange}>
              {!loadAddTodo ? (
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
            className={style.button_addTodo}>
            <Button
              variant='contained'
              endIcon={<AddIcon />}
              className={style.btn}
              onClick={() => setOpenModal(true)}>
              افزدون فعالیت
            </Button>
          </Stack>
        </HideOnScroll>
      </section>
    </>
  );
};

export default React.memo(MyTodo);
