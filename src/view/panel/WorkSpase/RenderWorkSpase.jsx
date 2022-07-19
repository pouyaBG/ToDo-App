import { Button, Slide, Stack, useScrollTrigger } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import style from './style.module.scss';
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
  return (
    <>
      <section>
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
              اضافه کردن میز کار
            </Button>
          </Stack>
        </HideOnScroll>
      </section>
    </>
  );
};

export default RenderWorkSpase;
