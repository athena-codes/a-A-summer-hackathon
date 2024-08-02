import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import MaterialIcon from 'material-icons-react';
import { Grid, Button, Typography, Box, Container } from "@mui/material";

const NavBar = () => {

  const user = useSelector((state) => state.session.user);

  return (
    <nav>
      <Container sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2vw',
      }}>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img src='../../logo.png' />
        </NavLink>
        <Box sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          padding: '10px',
          borderRadius: '20px',
          backgroundColor: '#a8716f',
        }}>
          {/* <NavLink to='/login' exact={true} activeClassName='active'>
            <Button variant="contained">Log In</Button>
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <Button variant="contained">Sign Up</Button>
          </NavLink> */}
          <MaterialIcon icon="menu" size='medium' color='#f4f4f4' />
          <MaterialIcon icon="account_circle" size='medium' color='#f4f4f4' />
        </Box>
        {/* <LogoutButton /> */}
      </Container>
    </nav >
  );
}

export default NavBar;
