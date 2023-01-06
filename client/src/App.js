import React from "react";
import { CookiesProvider, withCookies } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

import Wrapper from "./wrapper/wrapper";

const App = () => {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Wrapper />
      </CookiesProvider>
    </BrowserRouter>
  );
};

export default App;
