import React from 'react'
import { useSelector } from 'react-redux';
import { Box, Button, Container, Grid, LinearProgress, Link, Typography } from "@mui/material";


function HomePage() {
  const user = useSelector((state) => state.session.user);

  const data = [
    {
      left: 'Current English Proficiency Level:',
      right: 'Intermediate'
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
          <h1>Welcome, {user.email}!</h1>
          <Link href='/'
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
