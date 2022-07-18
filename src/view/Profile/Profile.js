import React from 'react';
import { useEffect, useState } from 'react';
import style from './Profile.module.scss';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { GetUserInfo } from '../../services/getApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CreateIcon from '@mui/icons-material/Create';
import Panel from '../Dashboard/Panel';

import 'react-lazy-load-image-component/src/effects/blur.css';

const Profile = () => {
  const [UserInfo, setUserInfo] = useState({
    name: '',
    email: '',
    imageUser: '',
  });
  useEffect(() => {
    GetUserInfo().then((res) => {
      setUserInfo({
        name: res.data.fullname,
        email: res.data.email,
        // imageUser: res.data.avatar,
      });
    });
  }, []);

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Panel />
      <div className={style.container}>
        <div className={style.cardColor}></div>
        <h1 className={style.fullName}>{UserInfo.name}</h1>
        <LazyLoadImage
          alt='demonstration1'
          className={style.imagePreview}
          // dynamic
          src={'http://assets.stickpng.com/images/585e4beacb11b227491c3399.png'}
          effect='blur'
        />
        <div className={style.email}>{UserInfo.email}</div>
        <div className={style.edit}>
          <Tooltip title=' ویرایش'>
            <IconButton size='small' color='info' onClick={handleOpen}>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>مشخصات شما</DialogTitle>
        <DialogContent>
          <Stack
            direction='column'
            spacing={1}
            style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={UserInfo.name} src={UserInfo.imageUser} />
            <Button variant='outlined' component='label' size='small'>
              بارگذاری عکس
              <input type='file' hidden />
            </Button>
          </Stack>
          <TextField
            fullWidth
            sx={{ paddingY: 1 }}
            id='standard-basic'
            label='نام کاربری'
            variant='standard'
            placeholder={UserInfo.name}
          />
          <TextField
            fullWidth
            id='standard-basic'
            label='ایمیل'
            variant='standard'
            placeholder={UserInfo.email}
          />

          <DialogActions>
            <Button
              size='small'
              sx={{ marginTop: 4 }}
              color='primary'
              variant='outlined'>
              دخیره تغیرات
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
