import "./send-transaction.sass";

const SendTransaction = () => {
  return (
    <div className="send-transaction">
      <div className="send-transaction__state-loading">
        <div className="send-transaction__description-text">
          Looking for a partner...
        </div>
        <div className="send-transaction__time">15:23:16</div>
      </div>
      <div className="send-transaction__table">
        <div className="send-transaction__item">
          <div className="send-transaction__name">Amount to send</div>
          <div className="send-transaction__value">
            2,015.72
            <div className="send-transaction__units">ETH</div>
          </div>
        </div>
        <div className="send-transaction__item">
          <div className="send-transaction__name">Target address</div>
          <div className="send-transaction__value">
            1.02
            <div className="send-transaction__units">BTC</div>
          </div>
        </div>
        <div className="send-transaction__item">
          <div className="send-transaction__name">Secret hash</div>
          <div className="send-transaction__value">
            ushdjklkushdjklkushdjklkushdjklk
          </div>
        </div>
      </div>
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
