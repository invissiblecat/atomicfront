import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollLink } from "react-scroll";
import "./header.sass";
import { useActions } from "./hooks/use-actions";
import { useAuth } from "./hooks/use-auth";

type args = {
  links: string[];
};

const Header: FC<args> = ({ links }) => {
  const isAuth = useAuth();
  const { connect, disconnect } = useActions();

  const [defaultAccount, setDefaultAccount] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any) => {
          accountChangedHandler(result[0]);
        });
    } else {
      console.log("Need to install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount: any) => {
    setDefaultAccount(newAccount);
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="header">
      <a className="header__item" href={`#${links[0]}`}>
        About
      </a>
      <a className="header__item" href={`#${links[1]}`}>
        Form
      </a>
      <button
        onClick={() => {
          connect();
        }}
      >
        connect wallet
      </button>
      <button onClick={() => disconnect()}>disconnect</button>
      {/* {isAuth ? (
        <button
          onClick={() => {
            disconnect();
          }}
        >
          disconnect
        </button>
      ) : (
        <button onClick={connectWalletHandler}>connect wallet</button>
      )} */}
      <Link to="/order"></Link>
    </div>
  );
};

export default Header;
