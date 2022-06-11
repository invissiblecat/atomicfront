import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ScrollLink } from "react-scroll";
import { selectWallet } from "redux/wallet.slice";
import "./header.sass";
import { useActions } from "./hooks/use-actions";
import { useAuth } from "./hooks/use-auth";

type args = {
  links: string[];
};

const Header: FC<args> = ({ links }) => {
  const wallet = useSelector(selectWallet);
  const { connect, disconnect } = useActions();

  return (
    <div className="header">
      <a className="header__item" href={`#${links[0]}`}>
        About
      </a>
      <a className="header__item" href={`#${links[1]}`}>
        Form
      </a>
      {!wallet.address && (
        <button onClick={() => {
          connect()}}>connect wallet</button>
      )}
      <Link to="/order"></Link>
    </div>
  );
};

export default Header;
