import { Link, Container, Box, Typography, LinearProgress } from "@mui/material";
import React from "react";

function MainPage() {
  return (
    <Box>
      <h1>Common nouns (or whatever topic selected)</h1>
      <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 25 }}
              style={{ marginTop: 30 }}
            />
      <Container>
        <Typography align="center" mt="50px" variant="h5">
        </Typography>
      </Container>
    </Box>
  );
}

export default MainPage;
