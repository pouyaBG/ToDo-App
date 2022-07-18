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
<<<<<<< HEAD
import axios from "axios";
import { useEffect, useState } from 'react';
=======
>>>>>>> 54047d826f9dd6fca0096234388f311df4d13df4
import { GetUserInfo } from '../../services/getApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CreateIcon from '@mui/icons-material/Create';
import Panel from '../Dashboard/Panel';

import 'react-lazy-load-image-component/src/effects/blur.css';
<<<<<<< HEAD
import { width } from '@mui/system';
import { postUpload } from '../../services/postApi';
import { toast } from 'react-toastify';
=======
>>>>>>> 54047d826f9dd6fca0096234388f311df4d13df4

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
        userid: res.data.userid
      });
    });
  }, []);

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function uploadProfile(e) {

    const form = new FormData();
    form.append("UPLOADCARE_PUB_KEY", "7faf571ab3bc71e26eb6");
    form.append("file", e.target.files[0]);

    const options = {
      method: 'POST',
      url: 'https://upload.uploadcare.com/base',
      headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
      data: form
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    // var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = function () {
    //   // console.log(reader.result);
    //   postUpload({
    //     base64Image: reader.result
    //   }).then(res => {
    //     toast.success(res.message)
    //   })
    // };
  }

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
              <input type='file' hidden onChange={uploadProfile} />
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
