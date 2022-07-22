import {
  Avatar,
  AvatarGroup,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import style from '../../../view/style/workspase.module.scss';

const OneWorkSpase = ({ name, color, team_member }) => {
  return (
    <>
      <Card className={style.box_ws}>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          width='100%'
          height='100%'
          backgroundColor={'red'}></Typography>
        <div>s</div>
        <div>s</div>
        <div>s</div>
      </Card>
    </>
  );
};

export default OneWorkSpase;
