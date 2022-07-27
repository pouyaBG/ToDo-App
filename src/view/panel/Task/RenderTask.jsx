import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Slide,
  Stack,
  TextField,
  useScrollTrigger,
  Tooltip,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PropTypes from 'prop-types';

import style from '../../../view/style/task.module.scss';
import { useEffect } from 'react';
import { GetTask } from '../../../services/getApi';
import OneTask from '../../../components/pages/Task/OneTask';
import { PostTaskTodo } from '../../../services/postApi';
import LoadingPage from '../../../components/common/LoadingPage/LoadingPAge';

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

const RenderTask = () => {
  const [state, setState] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState({
    title: '',
    color: '',
  });
  const [isLoadingTask, setIsLoadingTask] = React.useState(false);
  const [change, setChange] = React.useState(new Date());

  const handleClose = () => setOpenModal(false);
  const changeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    GetTask().then((res) => {
      setState(res.data.reverse());
    });
  }, [change]);

  const addTaskTodo = () => {
    setIsLoadingTask(true);
    PostTaskTodo(value).then(() => {
      setChange(new Date());
      setIsLoadingTask(false);
      setOpenModal(false);
    });
  };

  return (
    <>
      <section className={style.container_task}>
        {/* modal */}
        {/* render task */}
        {state == null ? (
          <>
            <LoadingPage />
          </>
        ) : (
          state.map((items) => (
            <OneTask key={items._id} {...items} setChange={setChange} />
          ))
        )}
        {/* end render task */}
        <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id={style.alert_dialog_title}>
            مشخصات تسک خود را وارد کنید
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              color='primary'
              id='standard-basic'
              margin='dense'
              label='نام کارت'
              placeholder='نام کارت خود را وارد کنید'
              fullWidth
              variant='standard'
              name='title'
              onChange={changeInput}
            />
            <TextField
              autoFocus
              color='primary'
              id='standard-basic'
              type='color'
              margin='dense'
              label=' رنگ کارت'
              sx={{ marginTop: 2 }}
              placeholder='رنگ کارت خود را انتخاب کنید'
              fullWidth
              variant='standard'
              name='color'
              onChange={changeInput}
            />
          </DialogContent>
          <DialogActions>
            <Button
              size='small'
              color='primary'
              onClick={addTaskTodo}
              setChange={setChange}>
              {!isLoadingTask ? (
                <>اضافه کردن</>
              ) : (
                <>
                  لطفا صبر کنید &nbsp;
                  <CircularProgress sx={{ color: 'blue' }} size={22} />
                </>
              )}{' '}
            </Button>
          </DialogActions>
        </Dialog>
        {/* btn add */}
        <HideOnScroll>
          <Tooltip title='افزودن تسک'>
            <Stack
              direction='row'
              spacing={0}
              position='fixed'
              className={style.button_addTodo}>
              <Button
                variant='contained'
                className={style.btn}
                onClick={() => setOpenModal(true)}>
                <EditOutlinedIcon />
              </Button>
            </Stack>
          </Tooltip>
        </HideOnScroll>
      </section>
    </>
  );
};

export default RenderTask;
