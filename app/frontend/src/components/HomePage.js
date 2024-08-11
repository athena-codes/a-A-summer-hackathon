import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser, fetchUsers } from '../store/actions/usersActions';
import { Box, Button, Container, Grid, LinearProgress, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom';


function HomePage() {
  const user = useSelector((state) => state.session.user);
  console.log("user info", user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.uid) { // Only fetch if user is logged in
      dispatch(fetchSingleUser(user.uid)); 
    }
  }, [dispatch, user]);

  const data = [
    {
      left: 'Current English Proficiency Level:',
      right: `${user.level}`
    },
    {
      left: 'Proficiency Level Progress:',
      right: <LinearProgress
        variant="determinate"
        value={50}
        sx={{ height: 25 }}
      />
    },
    {
      left: 'Current Concept:',
      right: 'Basic Nouns'
    },
    {
      left: 'Concept Progress:',
      right: <LinearProgress
        variant="determinate"
        value={50}
        sx={{ height: 25 }}
      />
    },
    {
      left: 'Topics Progress:',
      right: <LinearProgress
        variant="determinate"
        value={50}
        sx={{ height: 25 }}
      />
    },
    {
      left: 'Badges:',
      right: <img src="/assets/badges/beginner-badge.png" alt='Beginner Badge'
        style={{
          width: "25%"
        }}
      />
    },
  ]

  return (
    <Container>
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <h1>Welcome, {user.username}.</h1>
            <Button
              variant="contained"
              color="primary"
              component={NavLink} to='/concepts'
            >
              Start Learning Now
            </Button>
          <h2 style={{ padding: "16px 0px", }}>Your Latest Lingo.ai Progress</h2>
        </Box>
        <Grid container rowSpacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <Typography fontWeight="bold">{row.left}</Typography>
              </Grid>
              <Grid item xs={6}>
                {row.right}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default HomePage
