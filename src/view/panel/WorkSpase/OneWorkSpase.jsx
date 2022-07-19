import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
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
          </CardContent>
          <CardActions>
            <Button size='small'>حذف</Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default OneWorkSpase;
