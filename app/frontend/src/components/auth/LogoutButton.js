import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/sessionAction';
import { Button } from "@mui/material";

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
