import {
  Avatar,
  AvatarGroup,
  Card,
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
          className={style.box_color}
          component='div'
          backgroundColor={color}></Typography>
        <CardContent>
          <Typography>{name}</Typography>
        </CardContent>
        <div className={style.avatar}>
          <AvatarGroup max={4}>
            {team_member.map((item) => (
              <Tooltip title={item.username}>
                <Avatar alt={item.username} src='?' />
              </Tooltip>
            ))}
          </AvatarGroup>
        </div>
        <IconButton>
          <DeleteIcon color='error' />
        </IconButton>
      </Card>
    </>
  );
};

export default OneWorkSpase;
