import {
  Link,
  Container,
  Box,
  Typography,
  LinearProgress,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import DeckSample from "./Decks/DeckSample";

function MainPage() {
  return (
    <Container
      sx={{
        height: "calc(100vh - 250px)",
      }}
    >
      <Box>
        <Typography variant="h5" textAlign="center">
          Common nouns
        </Typography>
        <Box sx={{ px: 50, mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{ height: 25 }}
          />
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mx: 5, mt: 5 }}>
        <Grid item xs={3} sx={{ px: 4 }}>
          <Box
            sx={{
              "& .MuiTypography-root": {
                // Apply styles to all Typography components except nested ones
                color: "text.secondary",
                marginBottom: "8px",
                textAlign: "center",
              },
              "& .MuiTypography-root.MuiTypography-h6": {
                // Exclude h6 variant from the color change
                color: "inherit",
              },
            }}
          >
            <Typography variant="h6" textAlign="center" color="primary">
              Completed Decks
            </Typography>

            <DeckSample
              title="Deck 1"
              subtitle="explanation"
              sx={{ height: "120px" }}
            />
            <Typography>Completion Date:</Typography>
            <Typography>MM/DD/YYYY</Typography>
            <Typography>
              Score: <span style={{ color: "#4caf50" }}>80%</span>
            </Typography>

            <DeckSample
              title="Deck 2"
              subtitle="explanation"
              sx={{ height: "120px" }}
            />
            <Typography>Completion Date:</Typography>
            <Typography>MM/DD/YYYY</Typography>
            <Typography>
              Score: <span style={{ color: "#f44336" }}>70%</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <DeckSample
            title="start new deck"
            subtitle="explanation"
            sx={{ height: "300px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainPage;
