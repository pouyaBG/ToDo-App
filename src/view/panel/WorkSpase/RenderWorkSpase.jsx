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
import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GetUserWorkspase } from '../../../services/getApi';
import OneWorkSpase from '../../../components/pages/WorkSpase/OneWorkSpase';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import style from '../../../view/style/workspase.module.scss';
import { PostWorkSpase } from '../../../services/postApi';
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

const RenderWorkSpase = () => {
  const [state, setState] = useState(null);
  const [isloading, setIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState({
    userCreate_id: 0,
    userCreate_name: '',
    name: '',
    color: '',
  });
  const [change, setChange] = React.useState(new Date());

  const redirect = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token') === null) {
      localStorage.removeItem('token');
      redirect('/');
    }

    setIsLoading(true);
    GetUserWorkspase().then((res) => {
      setState(res.workspase);
      setIsLoading(false);
    });
  }, []);
  React.useEffect(() => {
    setIsLoading(true);
    GetUserWorkspase().then((res) => {
      setState(res.workspase);
      setIsLoading(false);
    });
  }, [change]);

  const changeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const addWorkSpase = () => {
    if (value.name === null || value.color === null) {
      alert('Please select a color for you');
    } else {
      PostWorkSpase({
        value,
      }).then(() => setChange(new Date()));
    }
  };

  const handleClose2 = () => setOpenModal(false);

  return (
    <>
      <section className={style.container_WorkSpase}>
        {isloading ? (
          <>
            <LoadingPage />
          </>
        ) : state == null ? (
          'nothing workSpase'
        ) : (
          state.map((items) => (
            <OneWorkSpase key={items.id} {...items} setChange={setChange} />
          ))
        )}
        {/* modal */}
        <Dialog
          open={openModal}
          onClose={handleClose2}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id={style.alert_dialog_title}>
            مشخصات میزکار خود را وارد کنید !
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              color='primary'
              id='standard-basic'
              margin='dense'
              label='میزکار'
              placeholder='اسم میزکار خود را وارد کنید'
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
              label=' رنگ میزکار'
              sx={{ marginTop: 2 }}
              placeholder='زنگ میزکار خود را انتخاب کنید'
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
              onClick={addWorkSpase}
              setChange={setChange}>
              اضافه کردن
            </Button>
          </DialogActions>
        </Dialog>
        {/* button */}
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

export default RenderWorkSpase;
