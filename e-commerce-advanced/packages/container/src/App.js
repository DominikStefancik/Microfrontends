import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import MarketingApp from "./components/MarketingApp";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <MarketingApp />
      </BrowserRouter>
    </div>
  );
}
