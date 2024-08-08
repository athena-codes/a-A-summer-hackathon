import React from 'react'
import { useSelector } from 'react-redux';
import { Box, Button, Container, Grid, LinearProgress } from "@mui/material";


function HomePage() {
  const user = useSelector((state) => state.session.user);

  return (
    <Container>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <h1>Hello, {user.email}.</h1>
          <Button
            variant="contained"
            color="primary"
          >
            Start Learning Now!
          </Button>
          <p style={{ paddingTop: "16px" }}>Here is your latest Lingo.ai progress:</p>
        </Box>
        <Grid container columnSpacing={2} rowSpacing={12}>
          <Grid item xs={12} sm={4}>
            <p style={{ marginTop: 16 }}>Current English Proficiency Level:</p>
            <p style={{ marginTop: 16 }}>Proficiency Level Progress:</p>
            <p style={{ marginTop: 16 }}>Current Concept:</p>
            <p style={{ marginTop: 16 }}>Concept Progress:</p>
            <p style={{ marginTop: 16 }}>Topic Progress:</p>
            <p style={{ marginTop: 16 }}>Badges:</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <p style={{ marginTop: 16 }}>Intermediate</p>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 25 }}
              style={{ marginTop: 16 }}
            />
            <p style={{ marginTop: 16 }}>Basic Nouns</p>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 25 }}
              style={{ marginTop: 16 }}
            />
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 25 }}
              style={{ marginTop: 16 }}
            />

          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default HomePage
