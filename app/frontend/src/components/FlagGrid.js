import React from "react";
import { Grid, Button, Typography, Box } from "@mui/material";

const flagsArr = [
  {
    url: "/assets/flags/Flag_of_France.svg",
    language: "French",
    label: "Français",
  },
  {
    url: "/assets/flags/Flag_of_the_United_States.svg",
    language: "English",
    label: "English",
  },
  {
    url: "/assets/flags/Flag_of_South_Korea.svg",
    language: "Korean",
    label: "한국어",
  },
  {
    url: "/assets/flags/Flag_of_Spain.svg",
    language: "Spanish",
    label: "Español",
  },
  {
    url: "/assets/flags/Flag_of_Japan.svg",
    language: "Japanese",
    label: "日本語",
  },
  {
    url: "/assets/flags/Flag_of_Vietnam.svg",
    language: "Vietnamese",
    label: "Tiếng Việt",
  },
  {
    url: "/assets/flags/Flag_of_the_People's_Republic_of_China.svg",
    language: "Chinese",
    label: "中文",
  },
  {
    url: "/assets/flags/Flag_of_India.svg",
    language: "Hindi",
    label: "हिंदी",
  },
];

function FlagGrid() {
  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {flagsArr.map((flag, index) => (
        <Grid item xs={3} key={index}>
          <Box
            position="relative"
            textAlign="center"
            sx={{
              "& .overlay": {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust background color and transparency as needed
                opacity: 0,
                transition: "opacity 0.3s",
              },
              "&:hover .overlay": {
                opacity: 1,
              },
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: "200px", // Fixed height to ensure uniformity
                padding: 0,
                borderRadius: 0,
                position: "relative",
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              }}
            >
              <img src={flag.url} alt={`Flag of ${flag.language}`} />
              <Box className="overlay">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {flag.label}
                </Typography>
              </Box>
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default FlagGrid;
