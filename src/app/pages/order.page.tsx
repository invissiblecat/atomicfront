const OrderPage = () => {
  return (
    <div className="order-page">
      <div className="order-page__title">Your order was succesfully created</div>
      <div className="order-page__subtitle"></div>
      <div className="order-page__state-loading">
        <div className="order-page__description-text"></div>
        <div className="order-page__time"></div>
      </div>
      <div className="order-page__table">
        <div className="order-page__item">
          <div className="order-page__name"></div>
          <div className="order-page__value">
            <div className="order-page__units"></div>
          </div>
        </div>
        <div className="order-page__item">
          <div className="order-page__name"></div>
          <div className="order-page__value">
            <div className="order-page__units"></div>
          </div>
        </div>
        <div className="order-page__item">
          <div className="order-page__name"></div>
          <div className="order-page__value"></div>
        </div>
        <div className="order-page__item">
          <div className="order-page__name"></div>
          <div className="order-page__value"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
