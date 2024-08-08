import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
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
  },
});
