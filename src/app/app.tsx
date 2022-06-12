import Pages from "./pages";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout";
import { selectWallet } from "redux/wallet.slice";
import { useActions } from "./components/hooks/use-actions";

function App() {
  // const { connect, disconnect } = useActions();
  
  // useEffect(() => {
  //   connect()
  // }, [])
  return (
    <div className="app">
      <Router>
        <Layout>
          <Pages />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
