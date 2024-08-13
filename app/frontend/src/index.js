import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import configureStore from "./store";
import store from './store';
import { darkTheme, lightTheme } from "./theme/theme";
import messages from "./locales/messages.json"
import { CssBaseline, ThemeProvider } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Footer from "./components/Footer";

// const store = configureStore();


const Main = () => {
  const [locale, setLocale] = useState("en");
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')

  const theme = mode === 'light' ? lightTheme : darkTheme;
  const handleModeChange = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App setLocale={setLocale} locale={locale} />
            <div style={{ textAlign: "center", paddingTop: "100px" }}>
              <IconButton onClick={handleModeChange}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </div>
            <Footer />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </IntlProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
