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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TestList />} />
        <Route path="/test/:id" element={<TestPage />} />
      </Routes>
    </Router>
  );
}
