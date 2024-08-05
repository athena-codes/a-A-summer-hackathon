import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MaterialIcon from 'material-icons-react';
import { Link, Menu, Box, Container, MenuItem, Typography } from "@mui/material";
import { styled } from '@mui/styles';
import LogoutButton from './auth/LogoutButton';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));


const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  console.log(user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            border: '2px solid #160e0e',
            "&:hover": {
              cursor: "pointer"
            }
          }}
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableelevation="true"
          onClick={handleClick}
        >
          <MaterialIcon icon="menu" size='medium' color='#f4f4f4' />
          <MaterialIcon icon="account_circle" size='medium' color='#f4f4f4' />
        </Box>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >

          {!user && <MenuItem>
            <Link href='/login'
              // exact={true}activeClassName='active'
              underline="none">
              <Typography
                color="primary"
              >
                Log In
              </Typography>

            </Link>
          </MenuItem>
          }
          {user &&
            <>
              <MenuItem>

                Hello, {user.email}

              </MenuItem>
              <MenuItem>
                <LogoutButton />
              </MenuItem>
            </>
          }
        </StyledMenu>
      </Container>
    </nav>
  );
}

export default NavBar;
