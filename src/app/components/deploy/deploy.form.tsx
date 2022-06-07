import "./deploy.form.sass";

const NewOrderForm = () => {
  return (
    <>
      <div className="new-order">
        <div className="new-order__title">Create your own swap</div>
        <div className="new-order__form-inner">
          <span className="new-order__form-token-info">
            <input className="new-order__form-input" placeholder="From"></input>
            <select className="new-order__form-select"></select>
          </span>
          <span className="new-order__form-token-info">
            <input className="new-order__form-input" placeholder="To"></input>
            <select className="new-order__form-select"></select>
          </span>
        </div>
        <button className="new-order__form-button" placeholder="Create order">
          Create new order
        </button>
      </div>
    </>
  );
};

export default NewOrderForm;
