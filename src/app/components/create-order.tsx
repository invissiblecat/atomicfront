import "./create-order.sass";

const CreateOrder = () => {
  return (
    <div className="create-order">
      <div className="create-order__state-loading">
        <div className="create-order__description-text">
          Looking for a partner...
        </div>
        <div className="create-order__time">15:23:16</div>
      </div>
      <div className="create-order__table">
        <div className="create-order__item">
          <div className="create-order__name">You’re selling</div>
          <div className="create-order__value">
            2,015.72
            <div className="create-order__units">ETH</div>
          </div>
        </div>
        <div className="create-order__item">
          <div className="create-order__name">You’re buying</div>
          <div className="create-order__value">
            1.02
            <div className="create-order__units">BTC</div>
          </div>
        </div>
        <div className="create-order__item">
          <div className="create-order__name">Target address</div>
          <div className="create-order__value">ushdjklk</div>
        </div>
        <div className="create-order__item">
          <div className="create-order__name">Backup address</div>
          <div className="create-order__value">ushdjklk</div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
