import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcon from 'material-icons-react';
import { Grid, Button, Typography, Box, Container } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  profileDropdown: {
    position: 'absolute',
    top: '120px',
    right: '20px',
    width: '200px',
    marginTop: '5px',
    backgroundColor: '#fff',
    // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    border: '2px solid #000',
    padding: '10px',
    zIndex: 1000,
  },
  hidden: {
    display: 'none'
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ulRef = useRef()
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    if (!showMenu || !ulRef.current) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  return (
    <nav>
      <Container sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2vw',
      }}>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img src='../../logo.png' alt="Lingo.ai" />
        </NavLink>
        <Box
          sx={{
            display: 'flex',
            columnGap: '10px',
            alignItems: 'center',
            padding: '10px',
            borderRadius: '20px',
            backgroundColor: '#a8716f',
            position: 'relative',
            "&:hover": {
              cursor: "pointer"
            }

          }}
          onClick={toggleMenu}
        >
          <MaterialIcon icon="menu" size='medium' color='#f4f4f4' />
          <MaterialIcon icon="account_circle" size='medium' color='#f4f4f4' />

        </Box>
        <div className={`${classes.profileDropdown} ${!showMenu ? classes.hidden : ''}`} ref={ulRef}>
          <Box
            sx={{
              display: 'grid'
            }}
          >
            <NavLink to='/login' exact={true} activeClassName='active'>
              Log In
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </Box>
        </div>
        {/* <LogoutButton /> */}
      </Container>
    </nav >
  );
}

export default NavBar;
