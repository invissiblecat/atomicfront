import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery, usePatchBoxMutation } from "redux/project.api";
import { useCreateBoxMutation } from "redux/registry.api";
import { selectWallet } from "redux/wallet.slice";
import { TCreateBox } from "services/root.contract";
import "./first-box.sass";
import Table from "./table";

type TProps = {
  boxId: string;
  statusToUpdate: string;
  redirect: string
};

const FirstBoxSend: FC<TProps> = ({boxId, statusToUpdate, redirect}) => {
  const {data} = useGetBoxByIdQuery(boxId, {pollingInterval: 10000});
  const [patchBox, {}] = usePatchBoxMutation()
  const wallet = useSelector(selectWallet);
  const [createBox, {isSuccess}] = useCreateBoxMutation();
  const [secret, setSecret] = useState('');
  const [timelock, setTimelock] = useState('');
  const history = useHistory();

  const deployBox = async () => {
    let deployData;
    let network;
    if (statusToUpdate === 'both deployed') {
      deployData= {
        reciever: data?.sender!,
        token: data?.recieveToken!,
        amount: data?.recieveAmount!,
        secret: data?.secret!,
        unlockTimestamp: +data?.unlockTimestamp! + 3600
      }
      network = data?.recieveNetwork!
    } else {
      deployData= {
        reciever: data?.reciever!,
        token: data?.sendToken!,
        amount: data?.sendAmount!,
        secret: secret,
        unlockTimestamp: +timelock
      }
      network=data?.sendNetwork!
    }
    await createBox({box: {...deployData, offchainId: boxId}, contractNetwork: network});
    await patchBox({id: boxId, body: {secret, unlockTimestamp: +timelock}});
    console.log(isSuccess)
  }

  useEffect(() => {
    if (data && data.status === statusToUpdate) {
      history.push(`/${redirect}/${boxId}`)
    }
  }, [data?.status]);

  return (
    <div className="first-box">
      {/* <Table size={4} title="Recipient box" type="create" /> */}
      <div className="first-box__bottom">
        <Table size={4} type="send" box={data} statusToUpdate={statusToUpdate}/>
        {statusToUpdate !== 'both deployed' && (
                <div className="first-box__form">
                    <div className="first-box__form-inner">
                    <span className="first-box__form-token-info">
                      <input
                        className="first-box__form-input"
                        placeholder="Timelock in seconds"
                        onChange={(e) => {setTimelock(e.target.value)}}
                      ></input>
                    </span>
                    <span className="first-box__form-token-info">
                      <input
                        className="first-box__form-input"
                        placeholder="Secret"
                        onChange={(e) => {setSecret(e.target.value)}}
                      ></input>
                    </span>
                  </div>
                  </div>
        )} 
          <button
            className="first-box__form-button"
            placeholder="Send htlc transaction"
            onClick={deployBox}
          >
           Deploy box
          </button>
        </div>

    </div>
  );
};

export default FirstBoxSend;
