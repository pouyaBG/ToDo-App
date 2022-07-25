import * as React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';

import style from '../../../view/style/task.module.scss';
import { DeleteTask } from '../../../services/deleteApi';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const OneTask = ({ title, color, progess, _id, setChange }) => {
  const [deleteState, setDeleteState] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const DeleteTaskHandler = () => {
    setIsLoading(true);
    DeleteTask(_id).then(() => {
      setChange(new Date());
      setIsLoading(false);
    });
  };
  function handleDelete() {
    setDeleteState(true);
    setTimeout(() => {
      setDeleteState(false);
    }, 5000);
  }
  return (
    <>
      <Card className={style.box_task}>
        <div
          className={style.progress}
          style={{ backgroundColor: `${color}`, width: `${progess}%` }}
        />
        <div
          className={style.sub_progress}
          style={{ backgroundColor: `${color}`, width: `${progess}%` }}
        />
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
        <div className={style.box_btn}>
          <Link to={`./${_id}`}>
            <IconButton>
              <Tooltip title='وارد شدن'>
                <RemoveRedEyeIcon color='primary' />
              </Tooltip>
            </IconButton>
          </Link>
          {!deleteState ? (
            <Tooltip title='حدف'>
              <IconButton>
                <DeleteIcon onClick={handleDelete} color='error' />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='مطمئن هستید'>
              <IconButton>
                {!isLoading ? (
                  <GppMaybeRoundedIcon onClick={DeleteTaskHandler} />
                ) : (
                  <CircularProgress sx={{ color: 'red' }} size={22} />
                )}
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Card>
    </>
  );
};

export default OneTask;
