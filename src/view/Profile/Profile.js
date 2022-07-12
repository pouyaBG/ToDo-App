import { IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetUserInfo } from '../../services/getApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CreateIcon from '@mui/icons-material/Create';
import Panel from '../Dashboard/Panel';
import style from './Profile.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Profile = () => {
  const [userName, setUserName] = useState({
    name: '',
    email: '',
    imageUser: '',
  });
  useEffect(() => {
    GetUserInfo().then((res) => {
      setUserName({
        name: res.data.fullname,
        email: res.data.email,
        imageUser: res.data.avatar,
      });
    });
  }, []);

  return (
    <>
      <Panel />
      <div className={style.container}>
        <div className={style.cardColor}></div>
        <h1 className={style.fullName}>{userName.name}</h1>
        <LazyLoadImage
          alt='demonstration1'
          className={style.imagePreview}
          // dynamic
          src={'http://assets.stickpng.com/images/585e4beacb11b227491c3399.png'}
          effect='blur'
        />
        <div className={style.email}>{userName.email}</div>
        <div className={style.edit}>
          <Tooltip title=' ویرایش'>
            <IconButton size='small' color='info'>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Profile;
