import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/global";

import Routes from "./routes";

import AppProvider from "./context";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
