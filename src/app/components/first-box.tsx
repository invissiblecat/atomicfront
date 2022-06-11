import "./first-box.sass";
import Table from "./table";

const FirstBoxSend = () => {
  return (
    <div className="first-box">
      <Table size={4} title="Recipient box" type="create" />
      <div className="first-box__bottom">
        <Table size={3} title="Create your box" type="" />
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
           Deploy box
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstBoxSend;
