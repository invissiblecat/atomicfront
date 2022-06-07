import "./box-sended.sass";

const BoxSended = () => {
  return (
    <div className="box-sended">
      <div className="box-sended__state-success">
        <div className="box-sended__text">
          <span className="box-sended__text-special">Your box address</span>{" "}
          (Will be displayed to your partner)
        </div>
        <div className="box-sended__text">ushdjklkushdjklkushdjklkushdjklk</div>
      </div>
      <div className="box-sended__content">
        <div className="box-sended__row">
          <div className="box-sended__item">
            <div className="box-sended__name">Amount</div>
            <div className="box-sended__value">
              2,015.72
              <div className="box-sended__units">ETH</div>
            </div>
          </div>
          <div className="box-sended__item">
            <div className="box-sended__name">Founder Timelock</div>
            <div className="box-sended__value">2,015.72</div>
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Founder</div>
          <div className="box-sended__value">
            ushdjklkushdjklkushdjklkushdjklk
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Recipient (you)</div>
          <div className="box-sended__value">
            ushdjklkushdjklkushdjklkushdjklk
          </div>
        </div>
        <div className="box-sended__item">
          <div className="box-sended__name">Hash secret</div>
          <div className="box-sended__value">
            ushdjklkushdjklkushdjklkushdjklk
          </div>
        </div>
      </div>
      <div className="box-sended__state-loading">
        <div className="box-sended__description-text">
          Looking for a partner...
        </div>
        <div className="box-sended__time">15:23:16</div>
      </div>
    </div>
  );
};

export default BoxSended;
