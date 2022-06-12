import { FC } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "redux/wallet.slice";
import "./header.sass";

type args = {
  links: string[];
};

const Header: FC<args> = ({ links }) => {
  const wallet = useSelector(selectWallet);

  return (
    <div className="header">
      <a className="header__item" href={`#${links[0]}`}>
        About
      </a>
      <a className="header__item" href={`#${links[1]}`}>
        Form
      </a>
      {/* {wallet.address && ( */}
              <a className="header__item">
             0xEfCbF2D32AEe89039ba337D967566A5537DbafE9
            </a>
      {/* )} */}
    </div>
  );
};

export default Header;
