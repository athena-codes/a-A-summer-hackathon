import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import theme from "./theme/theme"
import enMessages from "./locales/en.json";
import frMessages from "./locales/fr.json";
import esMessages from "./locales/es.json";
import hiMessages from "./locales/hi.json";
import jaMessages from "./locales/ja.json";
import koMessages from "./locales/ko.json";
import viMessages from "./locales/vi.json";
import zhMessages from "./locales/zh.json";
import { ThemeProvider } from "@mui/material";

const store = configureStore();

const messages = {
  en: enMessages,
  fr: frMessages,
  es: esMessages,
  hi: hiMessages,
  ja: jaMessages,
  ko: koMessages,
  vi: viMessages,
  zh: zhMessages,
};

const Main = () => {
  const [locale, setLocale] = useState("en");

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App setLocale={setLocale} />
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
