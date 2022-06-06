import Pages from "./pages";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Pages />
      </Router>
    </div>
  );
}

export default App;
