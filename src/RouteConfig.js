import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Header from "./components/Header";
import Invoice from "./components/Invoice";

const RouteConfig = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </Router>
    </>
  );
};

export default RouteConfig;
