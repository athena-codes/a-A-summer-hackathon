import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#a97170",
      contrastText: "#160e0e",
    },
    secondary: {
      main: "#afcfc7",
      contrastText: "#160e0e",
    },
    divider: {
      main: "#8a97b7",
    },
    text: {
      main: "rgb(22, 14, 14)",
      secondary: "rgba(22, 14, 14, 0.6)",
      disabled: "rgba(22, 14, 14, 0.38)",
      hint: "rgb(138, 151, 183)",
    },
    background: {
      main: "#f5f5f5",
    },
    completion: {
      good: "#4caf50",
      poor: "#f44336",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#8f5856",
      contrastText: "#f1e9e9",
    },
    secondary: {
      main: "#305048",
      contrastText: "#f1e9e9",
    },
    divider: {
      main: "#485575",
    },
    text: {
      main: "#f1e9e9",
      secondary: "rgba(22, 14, 14, 0.6)",
      disabled: "rgba(22, 14, 14, 0.38)",
      hint: "rgb(138, 151, 183)",
    },
    background: {
      main: "#0a0a0a",
    },
    completion: {
      good: "#4caf50",
      poor: "#f44336",
    },
  },
});
