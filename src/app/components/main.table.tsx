import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetBoxByIdQuery, useGetBoxesQuery, usePatchBoxMutation } from "redux/project.api";
import { selectWallet } from "redux/wallet.slice";
import "./main.table.sass";

const MainTable = () => {
  const { data, isLoading } = useGetBoxesQuery(
    { where: { status: "not deployed" } },
    { pollingInterval: 10000 }
  ); //todo is loading
  const wallet = useSelector(selectWallet);
  const [setReciever, {}] = usePatchBoxMutation();
  const history = useHistory();
  const [globalBoxId, setGlobalBoxId] = useState('');
  const rows = [];
  const {data: box, refetch: refetchBoxById} = useGetBoxByIdQuery(globalBoxId, {skip: !globalBoxId});
  const onClick = async (boxId: string) => {
    try {
      setGlobalBoxId(boxId);
      console.log(globalBoxId)
      console.log(box)
      if (wallet.address === box?.sender) {
        history.push(`/orderCreated/${boxId}`);
      } else {
        const res = await setReciever({
          id: boxId,
          body: { reciever: wallet.address },
        });
        if (Object.hasOwn(res, "data")) {
          history.push(`/orderSelected/${boxId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetchBoxById()
  }, [globalBoxId])

  const getTokenSymbol = (tokenAddress: string) => {
    switch (tokenAddress) {
      case process.env.REACT_APP_TETH:
        return "tETH";
      case process.env.REACT_APP_TAVAX:
        return "tAVAX";
      default:
        return "unknwn tkn";
    }
  };

  if (data) {
    for (let i = 0; i < data.length; i++) {
      rows.push(   
        <div className="main-table__row" onClick={async () => {await onClick(data[i].id)}}>
        <div className="main-table__value" >
          {data[i].id}
        </div>
        <div className="main-table__value">
          {ethers.utils.formatUnits(data[i].recieveAmount)}{" "}
          {getTokenSymbol(data[i].recieveToken)}
        </div>
        <div className="main-table__value">
          {ethers.utils.formatUnits(data[i].sendAmount)}{" "}
          {getTokenSymbol(data[i].sendToken)}
        </div>
        </div>
    )
    }
  }

  return (
    <div className="main-table">
      <div className="main-table__row">
        <div className="main-table__name">Order id</div>
        <div className="main-table__name">Send</div>
        <div className="main-table__name">Buy</div>
      </div>
        {rows}
    </div>
  );
};

export default MainTable;
