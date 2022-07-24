import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  TextField,
  useScrollTrigger,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PropTypes from 'prop-types';

import style from '../../../view/style/task.module.scss';
import { useEffect } from 'react';
import { GetTask } from '../../../services/getApi';

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
  const [state, setState] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState({
    userCreate_id: 0,
    userCreate_name: '',
    name: '',
    color: '',
  });
  const handleClose = () => setOpenModal(false);
  const changeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };
  useEffect(() => {
    GetTask().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <section>
        {/* modal */}
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
              label='تسک'
              placeholder='اسم تسک خود را وارد کنید'
              fullWidth
              variant='standard'
              name='name'
              onChange={changeInput}
            />
            <TextField
              autoFocus
              color='primary'
              id='standard-basic'
              type='color'
              margin='dense'
              label=' رنگ تسک'
              sx={{ marginTop: 2 }}
              placeholder='رنگ تسک خود را انتخاب کنید'
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
              // onClick={addWorkSpase}
              // setChange={setChange}
            >
              اضافه کردن
            </Button>
          </DialogActions>
        </Dialog>
        {/* btn add */}
        <HideOnScroll>
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
        </HideOnScroll>
      </section>
    </>
  );
};

export default RenderTask;
