import "./both-box.sass";
import Table from "./table";

const BothBoxSend = () => {
  return (
    <div className="both-box">
      <div className="both-box__addresses">
        <div className="both-box__item">
          <div className="both-box__name">Your box address</div>
          <div className="both-box__value">
            ushdjklkushdjklkushdjklkushdjklkidj...
          </div>
        </div>
        <div className="both-box__item">
          <div className="both-box__name">Partner’s box address</div>
          <div className="both-box__value">
            ushdjklkushdjklkushdjklkushdjklkidj...
          </div>
        </div>
      </div>
      <div className="both-box__state-loading">
        <div className="both-box__description-text">
          Looking for a partner...
        </div>
        <div className="both-box__time">15:23:16</div>
      </div>
      <Table size={4} title="Recipient box" type="create" />
      <Table size={5} title="Recipient box" type="" />
    </div>
  );
};

export default BothBoxSend;
