import { FC } from "react";
import LoadingImg from "../assets/spinner.svg";
import "./state-loading.component.sass";

type TProps = {
  timerTitle: string;
  isLoading: boolean;
};

const StateLoading: FC<TProps> = ({ timerTitle, isLoading }) => {
  return (
    <div className="state-loading">
      <div className="state-loading__description-text">{timerTitle}</div>
      {isLoading && (
        <div className="state-loading__img">
          <img src={LoadingImg} alt="" />
        </div>
      )}
    </div>
  );
};

export default StateLoading;
