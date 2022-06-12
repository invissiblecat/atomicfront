import { BigNumber } from "ethers";
import { setupNetwork, switchNetwork } from "lib/utilities";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery, usePatchBoxMutation } from "redux/project.api";
import { useCreateBoxMutation } from "redux/registry.api";
import { useApproveMutation, useGetAllowanceQuery } from "redux/token-contract.api";
import { selectWallet } from "redux/wallet.slice";
import { TCreateBox } from "services/registry.contract";
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
  const [createBox, {isSuccess}] = useCreateBoxMutation();
  const [secret, setSecret] = useState('');
  const [timelock, setTimelock] = useState('');
  const wallet = useSelector(selectWallet);
  const history = useHistory();
  const {data: allowanceSend, refetch: refetchAllowanceSend} = useGetAllowanceQuery({owner: wallet.address, contractNetwork: data?.sendNetwork!}, {skip: !data || data.status === 'both deployed'});
  const {data: allowanceRecieve, refetch: refetchAllowanceRecieve} = useGetAllowanceQuery({owner: wallet.address, contractNetwork: data?.recieveNetwork!});
  const [approve, {}] = useApproveMutation();
  
  const deployBox = async () => {
    let deployData;
    let network;
    if (statusToUpdate === 'both deployed') {
      console.log('recieve')
      deployData= {
        reciever: data?.sender!,
        token: data?.recieveToken!,
        amount: data?.recieveAmount!,
        secret: data?.secret!,
        unlockTimestamp: +data?.unlockTimestamp! + 3600
      }
      await switchNetwork(data?.recieveNetwork!);
      network = data?.recieveNetwork!
      refetchAllowanceRecieve();
      console.log(allowanceRecieve)
      if (!allowanceRecieve || allowanceRecieve.lt(BigNumber.from(deployData.amount))) await approve(network);
    } else {
      console.log('send')
      deployData= {
        reciever: data?.reciever!,
        token: data?.sendToken!,
        amount: data?.sendAmount!,
        secret: secret,
        unlockTimestamp: +timelock
      }
      await switchNetwork(data?.sendNetwork!);
      network=data?.sendNetwork!
      refetchAllowanceSend()
      if (!allowanceSend || allowanceSend.lt(BigNumber.from(deployData.amount))) await approve(network);
    }
    await createBox({box: {...deployData, offchainId: boxId}, contractNetwork: network});
    await patchBox({id: boxId, body: {secret: secret, unlockTimestamp: +timelock}});
  }

  useEffect(() => {
    if (data && data.status === statusToUpdate) {
      console.log('redirect')
      history.push(`/${redirect}/${boxId}`)
    }
  }, [data]);
  
  return (
    <div className="first-box">
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
                        onChange={(e) => {console.log(e.target.value); setSecret(e.target.value)}}
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
