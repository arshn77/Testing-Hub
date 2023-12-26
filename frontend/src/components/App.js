import React from "react";
import TestList from "./TestList";
import TestPage from "./TestPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Redirect,
  Navigate,
  useRoutes,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<TestList />} />
          <Route path="/test/:id" element={<TestPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
