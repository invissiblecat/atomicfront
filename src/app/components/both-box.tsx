import "./both-box.sass";

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
      <div className="both-box__upper">
        <div className="both-box__title">Recipient box</div>
        <div className="both-box__table">
          <div className="both-box__item">
            <div className="both-box__name">Amount</div>
            <div className="both-box__value">
              2,015.72
              <div className="both-box__units">ETH</div>
            </div>
          </div>
          <div className="both-box__item">
            <div className="both-box__name">Founder</div>
            <div className="both-box__value">lsidhjdmc</div>
          </div>
          <div className="both-box__item">
            <div className="both-box__name">Recipient (you)</div>
            <div className="both-box__value">lsidhjdmc</div>
          </div>
          <div className="both-box__item">
            <div className="both-box__name">Secret hash</div>
            <div className="both-box__value">
              ushdjklkushdjklkushdjklkushdjklk
            </div>
          </div>
        </div>
      </div>
      <div className="both-box__upper">
        <div className="both-box__title">Recipient box</div>
        <div className="both-box__table">
          <div className="both-box__item">
            <div className="both-box__name">Amount</div>
            <div className="both-box__value">
              2,015.72
              <div className="both-box__units">ETH</div>
            </div>
          </div>
          <div className="both-box__item">
            <div className="both-box__name">Founder</div>
            <div className="both-box__value">lsidhjdmc</div>
          </div>
          <div className="both-box__item">
            <div className="both-box__name">Recipient (you)</div>
            <div className="both-box__value">lsidhjdmc</div>
          </div>
          <div className="both-box__item">
            <div className="both-box__name">Secret hash</div>
            <div className="both-box__value">
              ushdjklkushdjklkushdjklkushdjklk
            </div>
          </div>
          <div className="both-box__item">
            <div className="both-box__name">Timelock, seconds</div>
            <div className="both-box__value">10555</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BothBoxSend;
