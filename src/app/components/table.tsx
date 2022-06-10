import { FC } from "react";
import "./table.sass";

type TProps = {
  size: number;
  title: string | undefined;
  type: string | undefined;
};

const Table: FC<TProps> = ({ size, title, type }) => {
  return (
    <div className="table">
      {title ? <div className="table__title">{title}</div> : ""}
      {size == 4 && type === "create" && (
        <div className="table__content">
          <div className="table__item">
            <div className="table__name">Amount</div>
            <div className="table__value">
              2,015.72
              <div className="table__units">ETH</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Founder</div>
            <div className="table__value">lsidhjdmc</div>
          </div>
          <div className="table__item">
            <div className="table__name">Recipient (you)</div>
            <div className="table__value">lsidhjdmc</div>
          </div>
          <div className="table__item">
            <div className="table__name">Secret hash</div>
            <div className="table__value">ushdjklkushdjklkushdjklkushdjklk</div>
          </div>
        </div>
      )}
      {size == 4 && type === "send" && (
        <div className="table__content">
          <div className="table__item">
            <div className="table__name">You’re selling</div>
            <div className="table__value">
              2,015.72
              <div className="table__units">ETH</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">You’re buying</div>
            <div className="table__value">
              1.02
              <div className="table__units">BTC</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Target address</div>
            <div className="table__value">ushdjklk</div>
          </div>
          <div className="table__item">
            <div className="table__name">Backup address</div>
            <div className="table__value">ushdjklk</div>
          </div>
        </div>
      )}
      {size == 3 && (
        <div className="table__content">
          <div className="table__item">
            <div className="table__name">Amount to send</div>
            <div className="table__value">
              2,015.72
              <div className="table__units">ETH</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Target address</div>
            <div className="table__value">
              1.02
              <div className="table__units">BTC</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Secret hash</div>
            <div className="table__value">ushdjklkushdjklkushdjklkushdjklk</div>
          </div>
        </div>
      )}
      {size == 5 && (
        <div className="table__content">
          <div className="table__item">
            <div className="table__name">Amount to send</div>
            <div className="table__value">
              2,015.72
              <div className="table__units">ETH</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Target address</div>
            <div className="table__value">
              1.02
              <div className="table__units">BTC</div>
            </div>
          </div>
          <div className="table__item">
            <div className="table__name">Secret hash</div>
            <div className="table__value">ushdjklkushdjklkushdjklkushdjklk</div>
          </div>
          <div className="table__item">
            <div className="table__name">Timelock, seconds</div>
            <div className="table__value">10555</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
