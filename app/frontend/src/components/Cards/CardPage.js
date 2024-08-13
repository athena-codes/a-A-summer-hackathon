import { Container, Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Card } from "@mui/material";
import React from "react";
import { useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function CardPage() {
  const theme = useTheme();

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

      <Grid container spacing={2}>
        {/* QUESTION CARD */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            display: "flex",
            flexDirection: "column",
            width: "325px",
            height: "450px",
            borderRadius: "3px",
            border: `1.5px solid ${theme.palette.mode === 'light' ? '#160e0e' : '#f1e9e9'}`,
          }}>
            <Box sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              height: "300px",
              padding: "20px",
              overflow: "auto",
            }}>
              <h2>Don't eat the rotten apple.</h2>
            </Box>
            <Box sx={{
              backgroundColor: `${theme.palette.background.main}`,
              padding: "20px",
              borderTop: `1.5px solid ${theme.palette.mode === 'light' ? '#160e0e' : '#f1e9e9'}`,
            }}>
              <FormControl sx={{ width: "100%", overflow: "auto", }}>
                <FormLabel disabled>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    Identify the common noun in this sentence.
                  </Typography>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{ paddingTop: "15px" }}
                >
                  <FormControlLabel
                    value="Rotten"
                    control={<Radio sx={{ color: theme.palette.primary.main }} />}
                    label="Rotten" />
                  <FormControlLabel
                    value="Eat"
                    control={<Radio sx={{ color: theme.palette.primary.main }} />}
                    label="Eat" />
                  <FormControlLabel
                    value="Apple"
                    control={<Radio sx={{ color: theme.palette.primary.main }} />}
                    label="Apple" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Card>
        </Grid>

        {/* CORRECT ANSWER */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            display: "flex",
            flexDirection: "column",
            width: "325px",
            height: "450px",
            borderRadius: "3px",
            border: `1.5px solid ${theme.palette.mode === 'light' ? '#160e0e' : '#f1e9e9'}`,
          }}>
            <Box sx={{
              backgroundColor: `${theme.palette.secondary.main}`,
              height: "300px",
              padding: "20px",
            }}>
              <h2>Don't eat the rotten apple.</h2>
            </Box>
            <Box sx={{
              backgroundColor: `${theme.palette.background.main}`,
              padding: "20px",
              height: "150px",
              borderTop: `1.5px solid ${theme.palette.mode === 'light' ? '#160e0e' : '#f1e9e9'}`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckIcon sx={{ color: theme.palette.completion.good }} /> <Typography sx={{ ml: 2 }}>Apple</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* INCORRECT ANSWER */}
        <Grid item xs={12} md={4}>
          <Card sx={{
            display: "flex",
            flexDirection: "column",
            width: "325px",
            height: "450px",
            borderRadius: "3px",
            border: `1.5px solid ${theme.palette.mode === 'light' ? '#160e0e' : '#f1e9e9'}`,
          }}>
            <Box sx={{
              backgroundColor: `${theme.palette.secondary.main}`,
              height: "300px",
              padding: "20px",
            }}>
              <h2>Don't eat the rotten apple.</h2>
            </Box>
            <Box sx={{
              backgroundColor: `${theme.palette.background.main}`,
              padding: "20px",
              height: "150px",
              borderTop: `1.5px solid ${theme.palette.mode === 'light' ? '#160e0e' : '#f1e9e9'}`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CloseIcon sx={{ color: theme.palette.completion.poor }} />
                <Typography sx={{ ml: 2 }}>Eat</Typography>
              </Box>
              <p><span style={{ fontWeight: "bold" }}>Correct Answer:</span> Apple</p>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CardPage;
