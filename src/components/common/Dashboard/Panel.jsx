import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListAltIcon from '@mui/icons-material/ListAlt';
// style
import style from './panel.module.scss';
import { GetUserInfo } from '../../../services/getApi';
import { Stack } from '@mui/material';

const pages = ['فعالیت', 'کار تیمی'];
const settings = ['پروفایل', 'تنظیمات'];

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Panel(props) {
  const redirect = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userName, setUserName] = React.useState('');
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handelOpenPagePhone = (e) => {
    switch (e.target.innerText) {
      case 'فعالیت ':
        redirect('/panel/todos');
        break;
      case 'کار تیمی':
        redirect('/panel/workspase');
        break;

      default:
        break;
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    switch (e.target.innerHTML) {
      case 'پروفایل':
        redirect('/panel/profile');
        break;

      default:
        break;
    }
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    GetUserInfo().then((res) => {
      setUserName(res.data.fullname);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    redirect('/');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar position='fixed'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <ListAltIcon
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              />
              <Typography
                variant='h6'
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                TODO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handelOpenPagePhone}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}>
                  <div className={style.Box_Menu_main}>
                    <MenuItem>
                      <Typography>
                        <NavLink className={style.Box_Menu} to='./todos'>
                          کار های من
                        </NavLink>
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography>
                        <NavLink className={style.Box_Menu} to='./workspase'>
                          کار تیمی
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  </div>
                  {/* {pages.map((page) => (
                    <MenuItem key={page} onClick={handelOpenPagePhone}>
                      <Typography textAlign='center' value={page}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))} */}
                </Menu>
              </Box>
              <ListAltIcon
                sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              />
              <Typography
                variant='h5'
                noWrap
                component='a'
                href=''
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                LOGO
              </Typography>
              <Box
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                className={style.menus}
                id='menus1'>
                <NavLink to='./todos'>کار های من</NavLink>
                <NavLink to='./workspase'>کار تیمی</NavLink>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <div className={style.userName_Box}>
                  <span className={style.userName} style={{ color: '#fff' }}>
                    سلام {userName} عزیز !
                  </span>
                  <Tooltip title='تنظیمات'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Stack>
                        <Avatar
                          alt={userName}
                          // !TODO: add src here
                          src='/static/images/avatar/1.jpg'
                        />
                      </Stack>
                    </IconButton>
                  </Tooltip>
                </div>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logout}>
                    <Typography textAlign='center'>خارج شدن</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>{props.children}</Box>
      </Container>
    </React.Fragment>
  );
}
