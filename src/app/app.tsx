import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "./pages/main.page";


function App() {
  return (
    <div className="app">
        <Router>
          <MainPage />
        </Router>
    </div>
  );
}

export default App;
