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

import style from './style.module.scss';

const OneWorkSpase = ({ name, color, team_member }) => {
  return (
    <>
      <div className={style.box_ws}>
        <Card sx={{ minWidth: 275, maxWidth: 325 }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            height={40}
            backgroundColor={color}></Typography>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {name}
            </Typography>
            <div className={style.box_team}>
              <AvatarGroup max={4}>
                {team_member.map((item) => (
                  
                  <Avatar key={item._id} alt={item.username.toUpperCase()} src="?" />
                ))}
              </AvatarGroup>
              <CardActions>
                <IconButton size='small' color='error'>
                  <Tooltip title='حدف'>
                    <DeleteIcon color='red' />
                  </Tooltip>
                </IconButton>
              </CardActions>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OneWorkSpase;
