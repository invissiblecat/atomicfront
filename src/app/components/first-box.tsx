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

type TProps = {
  boxId: string;
  statusToUpdate: string;
  redirect: string;
};

const FirstBoxSend: FC<TProps> = ({ boxId, statusToUpdate, redirect }) => {
  const { data } = useGetBoxByIdQuery(boxId, { pollingInterval: 10000 });
  const [patchBox, {}] = usePatchBoxMutation();
  const [createBox, { isSuccess }] = useCreateBoxMutation();
  const [secret, setSecret] = useState("");
  const [timelock, setTimelock] = useState("");
  const wallet = useSelector(selectWallet);
  const history = useHistory();
  const { data: allowanceSend, refetch: refetchAllowanceSend } =
    useGetAllowanceQuery(
      { owner: wallet.address, contractNetwork: data?.sendNetwork! },
      { skip: !data || data.status === "both deployed" }
    );
  const { data: allowanceRecieve, refetch: refetchAllowanceRecieve } =
    useGetAllowanceQuery({
      owner: wallet.address,
      contractNetwork: data?.recieveNetwork!,
    });
  const [approve, {}] = useApproveMutation();
  const [chosenDate, setChosenDate] = useState(new Date());
  // const [chosenDate, setChosenDate] = useState({
  //   startDate: null,
  //   endDate: null,
  //   focusedInput: new Date(),
  // });

  // const handleDatesChange = (data: OnDatesChangeProps) => {
  //   if (!data.focusedInput) {
  //     setChosenDate({ ...data, focusedInput:new Date() });
  //   } else {
  //     setChosenDate(data);
  //   }
  // };

  const deployBox = async () => {
    let deployData;
    let network;
    let hashSecret;
    if (statusToUpdate === "both deployed") {
      console.log("recieve");
      deployData = {
        reciever: data?.sender!,
        token: data?.recieveToken!,
        amount: data?.recieveAmount!,
        secret: data?.hashSecret!,
        unlockTimestamp: +data?.unlockTimestamp! + 3600,
      };
      await switchNetwork(data?.recieveNetwork!);
      network = data?.recieveNetwork!;
      refetchAllowanceRecieve();
      if (
        !allowanceRecieve ||
        allowanceRecieve.lt(BigNumber.from(deployData.amount))
      )
        await approve(network);
    } else {
      console.log("send");
      deployData = {
        reciever: data?.reciever!,
        token: data?.sendToken!,
        amount: data?.sendAmount!,
        secret: secret,
        unlockTimestamp: +timelock,
      };
      await switchNetwork(data?.sendNetwork!);
      hashSecret = ethers.utils.id(secret);
      network = data?.sendNetwork!;
      refetchAllowanceSend();
      if (!allowanceSend || allowanceSend.lt(BigNumber.from(deployData.amount)))
        await approve(network);
    }
    await createBox({
      box: { ...deployData, offchainId: boxId },
      contractNetwork: network,
    });
    if (hashSecret) {
      await patchBox({
        id: boxId,
        body: { secret: secret, hashSecret, unlockTimestamp: +timelock },
      });
    } else {
      await patchBox({ id: boxId, body: { unlockTimestamp: +timelock } });
    }
  };

  useEffect(() => {
    if (data && data.status === statusToUpdate) {
      console.log("redirect");
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
                {/* <input
                        className="first-box__form-input"
                        placeholder="Timelock in seconds"
                        onChange={(e) => {setTimelock(e.target.value)}}
                      ></input> */}
                <DatePicker
                  dateFormat={"dd/MM/yy"}
                  className="date-picker__calendar"
                  wrapperClassName="date-picker"
                  selected={chosenDate}
                  onChange={(chosenDate: Date) => setChosenDate(chosenDate)}
                />
                {/* <Datepicker
                  onDatesChange={handleDatesChange}
                  startDate={state.startDate} // Date or null
                  endDate={state.endDate} // Date or null
                  focusedInput={state.focusedInput}
                /> */}
              </span>
              <span className="first-box__form-token-info">
                <input
                  className="first-box__form-input"
                  placeholder="Secret"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSecret(e.target.value);
                  }}
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
