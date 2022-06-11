import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetBoxesQuery, usePatchBoxMutation,  } from "redux/project.api";
import { selectWallet } from "redux/wallet.slice";
import "./main.table.sass";

const MainTable = () => {
  const {data, isLoading}= useGetBoxesQuery(); //todo is loading
  const wallet = useSelector(selectWallet);
  const [setReciever, {}] =  usePatchBoxMutation();
  const history = useHistory();
  const idRows = [];
  const sendRows = [];
  const buyRows = [];
  const onClick = async (boxId: string) => {
    try {
      const res = await setReciever({id: boxId, body: {reciever: wallet.address}});
      if (Object.hasOwn(res, "data")) {
        // @ts-ignore
        history.push(`/orderSelected/${boxId}`)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTokenSymbol = (tokenAddress: string) => {
    switch (tokenAddress) {
      case process.env.REACT_APP_TETH: return 'tETH';
      case process.env.REACT_APP_TAVAX: return 'tAVAX'
      default: return 'unknwn tkn'
    }
  }

  if (data) {
    for (let i = 0; i < data.length; i++) {
      idRows.push(<div className="main-table__value" onClick={() => onClick(data[i].id)}>{data[i].id}</div>)
      sendRows.push(<div className="main-table__value">{ethers.utils.formatUnits(data[i].recieveAmount)} {getTokenSymbol(data[i].recieveToken)}</div>) //todo send token
      buyRows.push(<div className="main-table__value">{ethers.utils.formatUnits(data[i].sendAmount)} {getTokenSymbol(data[i].sendToken)}</div>)
    }

  }


  
//todo click on full row 
  return (
    <div className="main-table"> 
      <div className="main-table__row">
        <div className="main-table__name">Order id</div>
        {idRows}
      </div>
      <div className="main-table__row">
        <div className="main-table__name">Send</div>
        {sendRows}
      </div>
      <div className="main-table__row">
        <div className="main-table__name">Buy</div>
        {buyRows}
      </div>
    </div>
  );
};

export default MainTable;
