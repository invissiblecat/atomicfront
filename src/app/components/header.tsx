import { FC } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "redux/wallet.slice";
import "./header.sass";
import { useActions } from "./hooks/use-actions";

type args = {
  links: string[];
};

const Header: FC<args> = ({ links }) => {
  const { connect, disconnect } = useActions();
  const wallet = useSelector(selectWallet);

  return (
    <div className="header">
      <a className="header__item" href="https://github.com/invissiblecat/atomicfront">
        Front-end source
      </a>
      <a className="header__item" href="https://github.com/invissiblecat/atomicback">
        Back-end source
      </a>
      <a className="header__item" href="https://github.com/invissiblecat/atomicback">
        Contracts source
      </a>
      {wallet.address && (
        <>
              <a className="header__item">
              Connected wallet address: {wallet.address}
            </a>
          <button className="header-button" onClick={() => {disconnect()}}>
              Disconnect
          </button>

        </>
      )}
      {!wallet.address && (
              <button className="header-button" onClick={() => {connect()}}>
                  Connect
              </button>
      )}
    </div>
  );
};

export default Header;
