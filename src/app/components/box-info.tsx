import { BigNumber, ethers } from "ethers";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery } from "redux/project.api";
import { TProjectResponseData } from "redux/types";
import "./box-sended.sass";
import { getTokenSymbol } from "./utils/utils";

type TProps = {
  data: {
    type: string,
    id: number,
    sendNetwork: string;
    sendAmount: string;
    sendToken: string;
    unlockTimestamp: number;
    sender: string;
    reciever: string;
  }
};

const BoxInfo: FC<TProps> = ({data}) => {
  return (
    <div className="box-sended">
        {data && data.type === 'Your' && (
          <div className="box-sended__text">
            <div className="box-sended__state-success">
            <span className="box-sended__text-special">{data.type} box Id</span>
            (Will be displayed to your partner)
          <div className="box-sended__text">{data!.id}</div>
          </div>
        </div>
          )}
      <div className="box-sended__content">
          <span className="box-sended__text-special">{data.type} box info</span>
        <div className="box-sended__row">
        <div className="box-sended__item">
            <div className="box-sended__name">Network</div>
            <div className="box-sended__value">{data?.sendNetwork}</div>
          </div>
          <div className="box-sended__item">
            <div className="box-sended__name">Amount</div>
            <div className="box-sended__value">
              {ethers.utils.formatUnits(BigNumber.from(data!.sendAmount))}
              <div className="box-sended__units">{getTokenSymbol(data?.sendToken!)}</div>
            </div>
          </div>
          <div className="box-sended__item">
            <div className="box-sended__name">Timelock</div>
            <div className="box-sended__value">{data?.unlockTimestamp}</div>
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Sender address</div>
          <div className="box-sended__value">
            {data?.sender}
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Reciever address</div>
          <div className="box-sended__value">
            {data?.reciever}
          </div>
        </div>
      </div>
      </div>)
};

export default BoxInfo;
