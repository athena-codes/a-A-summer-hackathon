import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid, LinearProgress, Link, Typography } from "@mui/material";
import { getSingleUser } from '../store/users';


function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currUser = useSelector((state) => state.users[user.uid]); // Get the current user's data from Redux


  const capitalizeLevel = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  useEffect(() => {
    if (user && user.uid) {
      dispatch(getSingleUser(user.uid)); // Fetch current user's detailed info
    }
  }, [dispatch, user]);

  console.log('this is the user', currUser)

  console.log("USER", user);
  const data = [
    {
      left: 'Current English Proficiency Level:',
      right: `${capitalizeLevel(currUser?.level)}`
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
      right: <img src="/assets/badges/beginner-badge.png"
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
          <h1>Welcome, {currUser?.first_name}.</h1>
          <Link href='/concepts'
            // exact={true}activeClassName='active'
            underline="none">
            <Button
              variant="contained"
              color="primary"
            >
              Start Learning Now
            </Button>
          </Link>
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
