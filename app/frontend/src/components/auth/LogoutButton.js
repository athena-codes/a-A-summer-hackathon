import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <Button
    variant="contained"
    color='primary'
    onClick={onLogout}
    fullWidth
  >
    Logout
  </Button>;
};

export default LogoutButton;
