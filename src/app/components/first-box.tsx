import "./first-box.sass";

const FirstBoxSend = () => {
  return (
    <div className="first-box">
      <div className="first-box__upper">
        <div className="first-box__title">Recipient box</div>
        <div className="first-box__table">
          <div className="first-box__item">
            <div className="first-box__name">Amount</div>
            <div className="first-box__value">
              2,015.72
              <div className="first-box__units">ETH</div>
            </div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name">Founder</div>
            <div className="first-box__value">lsidhjdmc</div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name">Recipient (you)</div>
            <div className="first-box__value">lsidhjdmc</div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name">Secret hash</div>
            <div className="first-box__value">
              ushdjklkushdjklkushdjklkushdjklk
            </div>
          </div>
        </div>
        {/* <div className="first-box__table">
          <div className="first-box__item">
            <div className="first-box__name">Founder Timelock</div>
            <div className="first-box__value">2d, 15:15:26</div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name">Box address</div>
            <div className="first-box__value">lsidhjdmc</div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name"></div>
            <div className="first-box__value"></div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name"></div>
            <div className="first-box__value">
            </div>
          </div>
        </div> */}
      </div>
      <div className="first-box__bottom">
        <div className="first-box__title">Create your box</div>
        <div className="first-box__table">
          <div className="first-box__item">
            <div className="first-box__name">Amount to send</div>
            <div className="first-box__value">
              2,015.72
              <div className="first-box__units">ETH</div>
            </div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name">Target address</div>
            <div className="first-box__value">
              1.02
              <div className="first-box__units">BTC</div>
            </div>
          </div>
          <div className="first-box__item">
            <div className="first-box__name">Secret hash</div>
            <div className="first-box__value">
              ushdjklkushdjklkushdjklkushdjklk
            </div>
          </div>
        </div>
        <div className="first-box__form">
          <div className="first-box__form-inner">
            <span className="first-box__form-token-info">
              <input
                className="first-box__form-input"
                placeholder="Timelock seconds"
              ></input>
            </span>
          </div>
          <button
            className="first-box__form-button"
            placeholder="Send htlc transaction"
          >
            Send htlc transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstBoxSend;
