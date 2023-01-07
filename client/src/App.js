import React from "react";
import "./App.css";
import { CookiesProvider, withCookies } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import theme from "./assets/theme";
import Wrapper from "./wrapper/wrapper";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CookiesProvider>
          <Wrapper />
        </CookiesProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
