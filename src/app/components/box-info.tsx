import { BigNumber, ethers } from "ethers";
import { getChainId, NODES } from "lib/utilities";
import { startCase } from "lodash";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useGetBoxByIdQuery } from "redux/project.api";
import { useClaimMutation, useGetBoxQuery } from "redux/registry.api";
import { TProjectResponseData } from "redux/types";
import { selectWallet } from "redux/wallet.slice";
import { TClaim } from "services/registry.contract";
import "./box-sended.sass";
import { getTokenSymbol } from "./utils/utils";

type TProps = {
  data: {
    status: string,
    type: string,
    id: number,
    sendNetwork: string;
    sendAmount: string;
    sendToken: string;
    unlockTimestamp: number;
    sender: string;
    reciever: string;
    claimProps: TClaim & {claimNetwork: string}
  }
};

const BoxInfo: FC<TProps> = ({data}) => {
  const {data: blockchainData} = useGetBoxQuery({boxId: data.id, contractNetwork: data.sendNetwork}, {pollingInterval: 30000});
  const [boxStatus, setBoxStatus] = useState('');
  const wallet = useSelector(selectWallet);
  const [claim, {}] = useClaimMutation();
  const history = useHistory();
  const { boxId } = useParams<{ boxId: string }>();

  useEffect(() => {
    if (data) {
      if(data.status === 'both deployed' || data.status === 'sender claimed' || data.status === 'reciever claimed') {
        if (data.status === 'sender claimed' && data.type === 'Your' || data.status === 'reciever claimed' && data.type === 'Your') setBoxStatus('Сlaimed')
        else setBoxStatus('Claim is availible')
      } else if (data.status === 'first deployed') {
        setBoxStatus('Wait for both boxes deploy')
      } 
    } else {
      history.push(`/waitForRecieverDeploy/${boxId}`);
    }
  })


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
            <div className="box-sended__name">Status</div>
            <div className="box-sended__value">{boxStatus}</div>
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
            <div className="box-sended__value">{new Date(data?.unlockTimestamp).toLocaleString()}</div>
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
        {boxStatus && boxStatus === 'Refund is availible' && (
        <div className="box-sended__item">
          <button>
            Refund
          </button>
        </div>
        )}
        {boxStatus && boxStatus == 'Claim is availible' && wallet.address === data.reciever && (
             <button className="box-sended__button" onClick={() => {claim({props: data.claimProps, contractNetwork: data.claimProps.claimNetwork})}}>
             Claim
           </button>
        )}
      </div>
      </div>)
};

export default BoxInfo;
