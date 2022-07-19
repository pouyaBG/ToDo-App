import {
  Button,
  Skeleton,
  Slide,
  Stack,
  useScrollTrigger,
} from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GetUserWorkspase } from '../../../services/getApi';
import OneWorkSpase from './OneWorkSpase';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='up' in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const RenderWorkSpase = () => {
  const [state, setState] = useState(null);
  const [isloading, setIsLoading] = React.useState(false);
  const [change, setChange] = React.useState(new Date());

  const redirect = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token') === null) {
      redirect('/');
    }

    setIsLoading(true);
    GetUserWorkspase().then((res) => {
      setState(res.workspase);
      console.log(res.workspase);
      setIsLoading(false);
    });
  }, []);

  function LoadingPreview() {
    return (
      <div
        className={style.loading_skeleton}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
      </div>
    );
  }

  return (
    <>
      <section className={style.container_WorkSpase}>
        {isloading ? (
          <>
            <LoadingPreview />
            <LoadingPreview />
            <LoadingPreview />
            <LoadingPreview />
          </>
        ) : state == null ? (
          'nothing workSpase'
        ) : (
          state.map((items) => (
            <OneWorkSpase
              key={items.id}
              {...items}
              // setChange={setChange}
            />
          ))
        )}

        {/* button */}
        <HideOnScroll>
          <Stack
            direction='row'
            spacing={0}
            position='fixed'
            className={style.button_addTodo}>
            <Button
              variant='contained'
              endIcon={<AddIcon />}
              className={style.btn}
              // onClick={handleOpen}
            >
              افزودن میز کار
            </Button>
          </Stack>
        </HideOnScroll>
      </section>
    </>
  );
};

export default RenderWorkSpase;
