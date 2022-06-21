
import { getChainId, NODES } from "lib/utilities";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery } from "redux/project.api";
import { useClaimMutation, useGetBoxQuery } from "redux/registry.api";
import { selectWallet } from "redux/wallet.slice";
import { TClaim, TCreateBox } from "services/registry.contract";
import BoxInfo from "./box-info";
import "./box-sended.sass";
import { useActions } from "./hooks/use-actions";
import { checkAddress } from "../../lib/utilities";

type TProps = {
  id: string,
  statusToUpdate: string
  redirect: string
};

const BoxSended: FC<TProps> = ({id, statusToUpdate, redirect}) => {
  const wallet = useSelector(selectWallet);
  const { connect, disconnect } = useActions();
  const {data, refetch} = useGetBoxByIdQuery(id, {pollingInterval: 10000});
  const [yourBox, setYourBox] = useState({  type: "Your",
          id: data?.sendBlockchainId!,
          sendNetwork: data?.sendNetwork!,
          sendAmount: data?.sendAmount!,
          sendToken: data?.sendToken!,
          unlockTimestamp: data?.unlockTimestamp!,
          sender: data?.sender!,
          reciever: data?.reciever!});
  const [partnerBox, setPartnerBox] = useState({  type: "Partner",
        id: data?.recieveBlockchainId!,
        sendNetwork: data?.recieveNetwork!,
        sendAmount: data?.recieveAmount!,
        sendToken: data?.recieveToken!,
        unlockTimestamp: +data?.unlockTimestamp! - 1000 * 60 * 60 * 1,
        sender: data?.reciever!,
        reciever: data?.sender!});
  const history = useHistory();

  const setBoxes = () => {
    const validate = checkAddress(wallet.address, data?.sender!, data?.reciever!);
    switch (validate) {
      case 'sender': 
        setYourBox({  type: "Your",
          id: data?.sendBlockchainId!,
          sendNetwork: data?.sendNetwork!,
          sendAmount: data?.sendAmount!,
          sendToken: data?.sendToken!,
          unlockTimestamp: data?.unlockTimestamp!,
          sender: data?.sender!,
          reciever: data?.reciever!}); 
        setPartnerBox({  type: "Partner",
        id: data?.recieveBlockchainId!,
        sendNetwork: data?.recieveNetwork!,
        sendAmount: data?.recieveAmount!,
        sendToken: data?.recieveToken!,
        unlockTimestamp: +data?.unlockTimestamp! - 1000 * 60 * 60 * 1,
        sender: data?.reciever!,
        reciever: data?.sender!}); break;
      case "reciever": 
        setYourBox({  type: "Your",
          id: data?.recieveBlockchainId!,
          sendNetwork: data?.recieveNetwork!,
          sendAmount: data?.recieveAmount!,
          sendToken: data?.recieveToken!,
          unlockTimestamp: +data?.unlockTimestamp! - 1000 * 60 * 60 * 1,
          sender: data?.reciever!,
          reciever: data?.sender!});
        setPartnerBox({  type: "Partner",
          id: data?.sendBlockchainId!,
          sendNetwork: data?.sendNetwork!,
          sendAmount: data?.sendAmount!,
          sendToken: data?.sendToken!,
          unlockTimestamp: data?.unlockTimestamp!,
          sender: data?.sender!,
          reciever: data?.reciever!}); break;
        case "redirect": history.push(`/`); break;
        default: break;
    }
  }
  useEffect(() => {
    if (data) {
      const isSender = data.status === 'sender claimed' && wallet.address === data.sender
      const isReciever = data.status === 'reciever claimed' && wallet.address === data.reciever
      setBoxes();
      if (data.status === statusToUpdate || isSender || isReciever) {
        history.push(`/${redirect}/${id}`);
      } 
    }
  }, [data]);

  useEffect(() => {
    if (!wallet.address) {
      connect();
    }
    refetch();
  }, [wallet.address]);
  
  const claimProps: TClaim = {
    boxId: partnerBox.id,
    secret: data?.secret!,
    offchainId: id
  }
  return (
    <span className="box-sended__wrapper">
    {data && (
    <>
   <BoxInfo data={{...yourBox, status: data?.status!, claimProps: {...claimProps, claimNetwork: partnerBox.sendNetwork}}}></BoxInfo>
   <BoxInfo data={{...partnerBox, status: data?.status!, claimProps: {...claimProps, claimNetwork: partnerBox.sendNetwork}}}></BoxInfo>
    </> 
    )}
   </span>
  );
};

export default BoxSended;
