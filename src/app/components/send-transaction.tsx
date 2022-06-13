import "./send-transaction.sass";
import StateLoading from "./state-loading.component";
import Table from "./table";

const SendTransaction = () => {
  return (
    <div className="send-transaction">
      <StateLoading
        timerTitle={"Waiting..."}
        // isLoading={false}
        isLoading={true}
        time={"15:23:16"}
      />
      <Table size={4} title="" type="send" />
      <div className="send-transaction__form">
        <div className="send-transaction__form-inner">
          <span className="send-transaction__form-token-info">
            <input
              className="send-transaction__form-input"
              placeholder="Secret"
            ></input>
          </span>
          <span className="send-transaction__form-token-info">
            <input
              className="send-transaction__form-input"
              placeholder="Timelock seconds"
            ></input>
          </span>
        </div>
        <button
          className="send-transaction__form-button"
          placeholder="Send htlc transaction"
        >
          Send htlc transaction
        </button>
      </div>
    </div>
  );
};

export default SendTransaction;
