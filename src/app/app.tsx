import Pages from "./pages";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout";
import walletService, { web3Modal } from "services/wallet.service";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "redux/wallet.slice";
import { Connector } from "web3modal";
import { useActions } from "./components/hooks/use-actions";

function App() {
  const [inited, setInited] = useState(false);
  const wallet = useSelector(selectWallet);

  const { setAddress, setChainId, connect, disconnect } = useActions();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        disconnect();
      });
    }
  });
  useEffect(() => {
    walletService.initHandlers(
      async (accounts) => {
        setAddress(accounts[0]);
      },
      async (chainId) => {
        setChainId(chainId);
      },
      async () => {
        setAddress("");
        setChainId(0);
      }
    );
  }, []);
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
