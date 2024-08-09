import { createTheme, ThemeOptions } from '@mui/material/styles';    

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#a97170',
      contrastText: '#160e0e',
    },
    secondary: {
      main: '#afcfc7',
      contrastText: '#160e0e',
    },
    divider: '#8a97b7',
    text: {
      primary: 'rgb(22, 14, 14)',
      secondary: 'rgba(22, 14, 14, 0.6)',
      disabled: 'rgba(22, 14, 14, 0.38)',
      hint: 'rgb(138, 151, 183)',
    },
    background: {
      default: '#f5f5f5',
    },
    completion: {
      good: "#4caf50",
      poor: "#f44336",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
