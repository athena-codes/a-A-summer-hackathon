import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import MaterialIcon from 'material-icons-react';
import { Grid, Button, Typography, Box, Container } from "@mui/material";

const ProfileDropdown = () => {

    const user = useSelector((state) => state.session.user);

    return (
        <nav>
            <Container sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2vw',
            }}>

                <NavLink to='/login' exact={true} activeClassName='active'>
                    <Button variant="contained">Log In</Button>
                </NavLink>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    <Button variant="contained">Sign Up</Button>
                </NavLink>

                {/* <LogoutButton /> */}
            </Container>
        </nav >
    );
}

export default ProfileDropdown;
