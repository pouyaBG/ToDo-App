import * as React from 'react';
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
import { useState } from 'react';
import { GetProfileImg, GetUserInfo } from '../../../services/getApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CreateIcon from '@mui/icons-material/Create';
import { postUpload } from '../../../services/postApi';
import { toast } from 'react-toastify';

import style from '../../../view/style/Profile.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Profile = () => {
  const [change, setChange] = useState('');
  const [UserInfo, setUserInfo] = useState({
    name: '',
    email: '',
    userId: '',
  });
  const [ProfileImage, setProfileImage] = useState(null);

  React.useEffect(() => {
    GetUserInfo().then((res) => {
      setUserInfo({
        name: res.data.fullname,
        email: res.data.email,
        userId: res.data.userid,
      });
    });
  }, [change]);

  React.useEffect(() => {
    GetProfileImg(UserInfo.userId).then((res) => {
      setProfileImage(res.data.base64Image);
    });
  }, [UserInfo.userId]);

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
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      postUpload(UserInfo.userId, {
        profile: reader.result,
      }).then((res) => {
        toast.success(res.message);
        setChange(new Date());
        window.location.reload();
      });
    };
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.cardColor}></div>
        <h1 className={style.fullName}>{UserInfo.name}</h1>
        <LazyLoadImage
          alt='demonstration1'
          className={style.imagePreview}
          // dynamic
          src={ProfileImage}
          effect='blur'
        />
        <div className={style.email}>{UserInfo.email}</div>
        <div className={style.edit}>
          <Tooltip title=' ویرایش'>
            <IconButton size='small' color='error' onClick={handleOpen}>
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
            <Avatar alt={UserInfo.name} src={ProfileImage} />
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
