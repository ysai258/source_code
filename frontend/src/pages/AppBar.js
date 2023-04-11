import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { height } from '@mui/system';

import '../assets/css/custom.css';
import { useAuth } from '../contexts/auth';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Logout'];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  console.log("yash 38",currentUser)

  useEffect(() => {
    return () => {

    };
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigatepage = (page) => {
    navigate(page);
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    props.handleSignout();
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // <Avatar sx={{ width: 56, height: 56 }} alt="Scanner App" src={logo} />
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          
          <Link to='/'><img src = '/logo192.png' style={{height : "80px"}}></img></Link>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

   
                <Link to="/third-party" className='linkTag'>Third Party API</Link>
                <Link to="/inventory" className='linkTag'>Inventory</Link>
                {!currentUser &&  <Link to="/login" className='linkTag'>Login</Link> }              

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2}>
              
              <div>
                <img src = '/img/nav_pic.jpg' style={{width : "50px", height : '50px', borderRadius : '50%'}}></img>
                <Button

                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  style={{ color: 'white', marginTop : '-40px', fontSize : ' 20px'  }}
                  
                >
                  NedtID
                </Button>
                
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                // style = {{background : '#1976d2'}}
                >
                  <MenuItem style={{ color: '#1976d2' }} onClick={() => {
                      handleClose();
                      
                    }}>
                    Username
                  </MenuItem>
                  <MenuItem style={{ color: '#1976d2' }} onClick={() => {
                      handleClose();
                    }}>Email
                  </MenuItem>

                </Menu>

              </div>
              
            </Stack>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
