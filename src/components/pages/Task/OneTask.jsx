import * as React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import style from '../../../view/style/task.module.scss';
import { DeleteTask } from '../../../services/deleteApi';
import { Link } from 'react-router-dom';
const OneTask = ({ title, color, progess, _id, setChange }) => {
  const DeleteTaskHandler = () => {
    DeleteTask(_id).then(() => setChange(new Date()));
  };

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
              <Tooltip title='ویرایش'>
                <EditOutlinedIcon color='primary' />
              </Tooltip>
            </IconButton>
          </Link>
          <IconButton>
            <Tooltip title='حدف'>
              <DeleteIcon color='error' onClick={DeleteTaskHandler} />
            </Tooltip>
          </IconButton>
        </div>
      </Card>
    </>
  );
};

export default OneTask;
