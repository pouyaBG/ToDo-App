import * as React from 'react';
import { Button, Slide, Stack, useScrollTrigger } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PropTypes from 'prop-types';

import style from '../../../view/style/task.module.scss';

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

const Task = () => {
  const [openModal, setOpenModal] = React.useState(false);

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
              className={style.btn}
              onClick={() => setOpenModal(true)}>
              <EditOutlinedIcon />
            </Button>
          </Stack>
        </HideOnScroll>
      </section>
    </>
  );
};

export default Task;
