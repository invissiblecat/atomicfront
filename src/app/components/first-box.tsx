import { BigNumber, ethers } from "ethers";
import { setupNetwork, switchNetwork } from "lib/utilities";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery, usePatchBoxMutation } from "redux/project.api";
import { useCreateBoxMutation } from "redux/registry.api";
import {
  useApproveMutation,
  useGetAllowanceQuery,
} from "redux/token-contract.api";
import { selectWallet } from "redux/wallet.slice";
import { TCreateBox } from "services/registry.contract";
import DatePicker from "react-datepicker";
// import {
//   DateRangeInput,
//   DateSingleInput,
//   Datepicker,
//   OnDatesChangeProps,
// } from "@datepicker-react/styled";
import "./first-box.sass";
import Table from "./table";
import { time } from "console";

type TProps = {
  boxId: string;
  statusToUpdate: string;
  redirect: string;
};

const FirstBoxSend: FC<TProps> = ({ boxId, statusToUpdate, redirect }) => {
  const { data } = useGetBoxByIdQuery(boxId, { pollingInterval: 10000 });
  const [patchBox] = usePatchBoxMutation();
  const [createBox, {isError}] = useCreateBoxMutation();
  const [secret, setSecret] = useState("");
  const [timelock, setTimelock] = useState("");
  const wallet = useSelector(selectWallet);
  const history = useHistory();
  // const { data: allowanceSend, refetch: refetchAllowanceSend } =
  //   useGetAllowanceQuery(
  //     { owner: wallet.address, contractNetwork: data?.sendNetwork! },
  //     { skip: !data || data.status === "both deployed" }
  //   );
  // const { data: allowanceRecieve, refetch: refetchAllowanceRecieve } =
  //   useGetAllowanceQuery({
  //     owner: wallet.address,
  //     contractNetwork: data?.recieveNetwork!,
  //   });
  const [approve, {}] = useApproveMutation();
  const [buttonTitle, setButtonTitle] = useState('Deploy box');
  const [isDisabled, setDisabled] = useState(false);

  const deployBox = async () => {
    setButtonTitle('Loading...')
    setDisabled(true);
    let deployData;
    let network;
    let hashSecret;
    if (statusToUpdate === "both deployed") {
      deployData = {
        reciever: data?.sender!,
        token: data?.recieveToken!,
        amount: data?.recieveAmount!,
        secret: data?.hashSecret!,
        isHash: true,
        unlockTimestamp: +data?.unlockTimestamp! - 1000 * 60 * 60 * 1,
      };
      network = data?.recieveNetwork!;
      // console.log(network)
      await switchNetwork(network);
      // refetchAllowanceRecieve();
      // if (
      //   !allowanceRecieve ||
      //   allowanceRecieve.lt(BigNumber.from(deployData.amount))
      // )
        // await approve(network);
    } else {
      setTimelock((Date.now() + 1000 * 60 * 60 * 24).toString())
      deployData = {
        reciever: data?.reciever!,
        token: data?.sendToken!,
        amount: data?.sendAmount!,
        secret: secret,
        isHash: false,
        unlockTimestamp: +timelock
      };
      hashSecret = ethers.utils.id(secret);
      network = data?.sendNetwork!;
      await switchNetwork(network);
      // refetchAllowanceSend();
      // if (!allowanceSend || allowanceSend.lt(BigNumber.from(deployData.amount)))
      //   await approve(network);
      console.log(timelock)
      await patchBox({
        id: boxId,
        body: { secret: secret, hashSecret, unlockTimestamp: deployData.unlockTimestamp },
      });
    }
    await createBox({
      box: { ...deployData, offchainId: boxId },
      contractNetwork: network,
    });

    setButtonTitle('Box deployed. Wait for redirect...')
  };

  useEffect(() => {
    if (data && data.status === statusToUpdate) {
      history.push(`/${redirect}/${boxId}`);
    }
  }, [data]);

  return (
    <div className="first-box">
      <div className="first-box__bottom">
        <Table
          size={4}
          type="send"
          box={data}
          statusToUpdate={statusToUpdate}
        />
        {statusToUpdate !== "both deployed" && (
          <div className="first-box__form">
          <div className="first-box__form-inner">
              <span className="first-box__form-token-info">
                <input
                  className="first-box__form-input"
                  placeholder="Secret"
                  onChange={(e) => {
                    setSecret(e.target.value);
                  }}
                ></input>
              </span>
            </div>
          </div>
        )}
        <div className="first-box__form-inner">
        <button
          className="first-box__form-button"
          placeholder="Send htlc transaction"
          onClick={deployBox}
          disabled={isDisabled}
          >
          {buttonTitle}
        </button>
        </div>
      </div>
    </div>
  );
};

export default FirstBoxSend;
