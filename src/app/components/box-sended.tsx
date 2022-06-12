
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery } from "redux/project.api";
import { selectWallet } from "redux/wallet.slice";
import BoxInfo from "./box-info";
import "./box-sended.sass";
import { checkAddress } from "./utils/utils";

type TProps = {
  id: string,
  statusToUpdate: string
  redirect: string
};

const BoxSended: FC<TProps> = ({id, statusToUpdate, redirect}) => {
  const {data} = useGetBoxByIdQuery(id);
  const wallet = useSelector(selectWallet);
  console.log(wallet.address)
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
        unlockTimestamp: +data?.unlockTimestamp! + 3600,
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
        unlockTimestamp: +data?.unlockTimestamp! + 3600,
        sender: data?.reciever!,
        reciever: data?.sender!}); break;
      case "reciever": 
        setYourBox({  type: "Your",
          id: data?.recieveBlockchainId!,
          sendNetwork: data?.recieveNetwork!,
          sendAmount: data?.recieveAmount!,
          sendToken: data?.recieveToken!,
          unlockTimestamp: +data?.unlockTimestamp! + 3600,
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
    setBoxes();
  }, [])

  useEffect(() => {
    console.log(`/${redirect}/${id}`)
    if (data && data.status === statusToUpdate) {
      history.push(`/${redirect}/${id}`);
    }
  }, [data?.status]);
  
  console.log({data})
  return (
    <>
   <BoxInfo data={yourBox}></BoxInfo>
   <BoxInfo data={partnerBox}></BoxInfo>
   </>
  );
};

export default BoxSended;
