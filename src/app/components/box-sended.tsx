import { ethers } from "ethers";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery } from "redux/project.api";
import "./box-sended.sass";

type TProps = {
  id: string,
  statusToUpdate: string
  redirect: string
};

const BoxSended: FC<TProps> = ({id, statusToUpdate, redirect}) => {
  const {data} = useGetBoxByIdQuery(id);

  const getTokenSymbol = (tokenAddress: string) => {
    switch (tokenAddress) {
      case process.env.REACT_APP_TETH: return 'tETH';
      case process.env.REACT_APP_TAVAX: return 'tAVAX'
      default: return 'unknwn tkn'
    }
  }
  const history = useHistory();

  useEffect(() => {
    if (data && data.status === statusToUpdate) {
        history.push(`/${redirect}/${id}`)
    }
  }, [data?.status]);
  
  return (
    <div className="box-sended">
      <div className="box-sended__state-success">
        <div className="box-sended__text">
          <span className="box-sended__text-special">Your box Id</span>
          (Will be displayed to your partner)
        </div>
        <div className="box-sended__text">{data!.id}</div>
      </div>
      <div className="box-sended__content">
          <span className="box-sended__text-special">Your box info</span>
        <div className="box-sended__row">
        <div className="box-sended__item">
            <div className="box-sended__name">Network</div>
            <div className="box-sended__value">{data?.sendNetwork}</div>
          </div>
          <div className="box-sended__item">
            <div className="box-sended__name">Amount</div>
            <div className="box-sended__value">
              {ethers.utils.formatUnits(data!.sendAmount)}
              <div className="box-sended__units">{getTokenSymbol(data?.sendToken!)}</div>
            </div>
          </div>
          <div className="box-sended__item">
            <div className="box-sended__name">Timelock</div>
            <div className="box-sended__value">{data?.unlockTimestamp}</div>
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Your address</div>
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
      <div className="box-sended__content">
          <span className="box-sended__text-special">Partner box info</span>
        <div className="box-sended__row">
        <div className="box-sended__item">
            <div className="box-sended__name">Network</div>
            <div className="box-sended__value">{data?.recieveNetwork}</div>
          </div>
          <div className="box-sended__item">
            <div className="box-sended__name">Amount</div>
            <div className="box-sended__value">
              {ethers.utils.formatUnits(data!.recieveAmount)}
              <div className="box-sended__units">{getTokenSymbol(data?.recieveToken!)}</div>
            </div>
          </div>
          <div className="box-sended__item">
            <div className="box-sended__name">Timelock</div>
            <div className="box-sended__value">{data?.unlockTimestamp! + 3600}</div>
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Partner address</div>
          <div className="box-sended__value">
            {data?.reciever}
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Your address</div>
          <div className="box-sended__value">
            {data?.sender}
          </div>
        </div>
      </div>
      <div className="box-sended__state-loading">
        <div className="box-sended__description-text">
          Waiting for partner to deploy their box...
        </div>
        <div className="box-sended__time">15:23:16</div>
      </div>
    </div>
  );
};

export default BoxSended;
