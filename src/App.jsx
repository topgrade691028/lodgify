import React from "react";
import { ThemeProvider } from "@mui/material";
import { myTheme } from "./theme/myTheme";
import Home from "./page/Home";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
