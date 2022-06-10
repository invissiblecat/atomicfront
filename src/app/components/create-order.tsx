import Table from "./table";
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
      <Table size={4} title="" type="create" />
    </div>
  );
};

export default CreateOrder;
