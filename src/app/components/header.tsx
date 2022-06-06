import { FC } from "react";
import { ScrollLink } from "react-scroll";
import "./header.sass"

type args={
    links:string[]
}

const Header :FC<args> =({links}) => {
  return (
    <div className="header">
      <a className="header__item" href={`#${links[0]}`}>About</a>
      <a className="header__item"href={`#${links[1]}`}>Form</a>
    </div>
  );
};

export default Header;
