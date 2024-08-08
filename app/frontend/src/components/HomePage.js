import React from 'react'
import { useSelector } from 'react-redux';
import { Box, Button, Container, Grid, LinearProgress, Link } from "@mui/material";


function HomePage() {
  const user = useSelector((state) => state.session.user);

  return (
    <Container>
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <h1>Welcome, {user.email}.</h1>
          <Link href='/concepts'
            // exact={true}activeClassName='active'
            underline="none">
            <Button
              variant="contained"
              color="primary"
            >
              Start Learning Now!
            </Button>
          </Link>
          <p style={{ paddingTop: "16px" }}>Here is your latest Lingo.ai progress:</p>
        </Box>
        <Grid container columnSpacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} sm={4}>
            <p style={{ marginTop: 30 }}>Current English Proficiency Level:</p>
            <p style={{ marginTop: 30 }}>Proficiency Level Progress:</p>
            <p style={{ marginTop: 30 }}>Current Concept:</p>
            <p style={{ marginTop: 30 }}>Concept Progress:</p>
            <p style={{ marginTop: 30 }}>Topic Progress:</p>
            <p style={{ marginTop: 30 }}>Badges:</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <p style={{ marginTop: 30 }}>Intermediate</p>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 25 }}
              style={{ marginTop: 30 }}
            />
            <p style={{ marginTop: 30 }}>Basic Nouns</p>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 25 }}
              style={{ marginTop: 30 }}
            />
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 25 }}
              style={{ marginTop: 30 }}
            />

          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default HomePage
