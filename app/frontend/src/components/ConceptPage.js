import { Box, Button, Container, Grid, LinearProgress } from "@mui/material";
import React from "react";

function ConceptPage() {
  return (
    <Container>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <h1>Select a Beginner Concept</h1>
          <p>
            These are the recommended concepts based on your selected
            proficiency level.
          </p>

          <p>Pass all the concepts to unlock the next proficiency level.</p>
        </Box>
        <Box px={50}>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{ height: 25 }}
          />
        </Box>
      </Box>

      <Grid container spacing={10} justifyContent="center" py={5}>
        <Grid item>
          <Button>
            <Box display="flex" flexDirection="column">
              <p>basic vocab</p>
              <p>explanation</p>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ height: 15 }}
              />
            </Box>
          </Button>
        </Grid>

        <Grid item>
          <Button>
            <Box display="flex" flexDirection="column">
              <p>basic vocab</p>
              <p>explanation</p>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ height: 15 }}
              />
            </Box>
          </Button>
        </Grid>
        <Grid item>
          <Button>
            <Box display="flex" flexDirection="column">
              <p>basic vocab</p>
              <p>explanation</p>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ height: 15 }}
              />
            </Box>
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={10} justifyContent="center" py={5}>
        <Grid item>
          <Button>
            <Box display="flex" flexDirection="column">
              <p>basic vocab</p>
              <p>explanation</p>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ height: 15 }}
              />
            </Box>
          </Button>
        </Grid>
        <Grid item>
          <Button>
            <Box display="flex" flexDirection="column">
              <p>basic vocab</p>
              <p>explanation</p>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ height: 15 }}
              />
            </Box>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ConceptPage;
