import { sliceAddress } from "app/utils";
import { ethers } from "ethers";
import { FC } from "react";
import { TProjectResponseData } from "lib/types";
import "./table.sass";

type TProps = {
  size: number;
  title?: string | undefined;
  type: string | undefined;
  box? : TProjectResponseData
  statusToUpdate?: string
};

const Table: FC<TProps> = ({ size, title, type, box, statusToUpdate }) => {
  const getTokenSymbol = (tokenAddress: string) => {
    switch (tokenAddress) {
      case process.env.REACT_APP_TETH: return 'tETH';
      case process.env.REACT_APP_TAVAX: return 'tAVAX'
      default: return 'unknwn tkn'
    }
  }

  let props;
  if (box) {
    if (statusToUpdate === 'first deployed') {
      props = {
        sendAmount: ethers.utils.formatUnits(box.sendAmount),
        sendSymbol: getTokenSymbol(box.sendToken),
        recieveAmount: ethers.utils.formatUnits(box.recieveAmount),
        recieveSymbol: getTokenSymbol(box.recieveToken),
        you: box.sender,
        reciever: box.reciever,
        sendNetwork: box.sendNetwork,
        recieveNetwork: box.recieveNetwork
      }
  } else {
    props = {
      sendAmount: ethers.utils.formatUnits(box.recieveAmount),
      sendSymbol: getTokenSymbol(box.recieveToken),
      recieveAmount: ethers.utils.formatUnits(box.sendAmount),
      recieveSymbol: getTokenSymbol(box.sendToken),
      you: box.reciever,
      reciever: box.sender,
      sendNetwork: box.recieveNetwork,
      recieveNetwork: box.sendNetwork
    }
  }
  }

  

  return ( 
    <div className="table">
      {title && <div className="table__title">{title}</div>}
      {size == 4 && type === "create" && box && (
        <div className="table__content">
          <div className="table__item">
            <div className="table__name">Amount</div>
            <div className="table__value">
             {ethers.utils.formatUnits(box.sendAmount)} 
              <div className="table__units">{getTokenSymbol(box.sendToken)}</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Founder</div>
            {box.sender && <div className="table__value">{sliceAddress(box.sender)}</div>}
          </div>
          <div className="table__item">
            <div className="table__name">Recipient (you)</div>
            {box.reciever && <div className="table__value">{sliceAddress(box.reciever)}</div>}
          </div>
          <div className="table__item">
            <div className="table__name">Network</div>
            <div className="table__value">{box.sendNetwork}</div>
          </div>
        </div>
      )}
      {size == 4 && type === "send" && box && (
        <div className="table__content">
          <div className="table__item">
            <div className="table__name">You’re selling</div>
            <div className="table__value">
              {props?.sendAmount}
              <div className="table__units">{props?.sendSymbol}</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">You’re buying</div>
            <div className="table__value">
            {props?.recieveAmount}
              <div className="table__units">{props?.recieveSymbol}</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Reciever address</div>
            <div className="table__value">{sliceAddress(props?.reciever!)}</div>
          </div>
          <div className="table__item">
            <div className="table__name">Send network</div>
            <div className="table__value">{props?.sendNetwork}</div>
          </div>
          <div className="table__item">
            <div className="table__name">Recieve network</div>
            <div className="table__value">{props?.recieveNetwork}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
