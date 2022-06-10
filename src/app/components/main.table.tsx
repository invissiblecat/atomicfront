import "./main.table.sass";

const MainTable = () => {
  return (
    <div className="main-table">
      <div className="main-table__row">
        <div className="main-table__name">Order id</div>
        <div className="main-table__value">593</div>
        <div className="main-table__value">593</div>
        <div className="main-table__value">593</div>
      </div>
      <div className="main-table__row">
        <div className="main-table__name">Sent</div>
        <div className="main-table__value">150 BTC</div>
        <div className="main-table__value">150 BTC</div>
        <div className="main-table__value">150 BTC</div>
      </div>
      <div className="main-table__row">
        <div className="main-table__name">Buy</div>
        <div className="main-table__value">585 ETH</div>
        <div className="main-table__value">585 ETH</div>
        <div className="main-table__value">585 ETH</div>
      </div>
    </div>
  );
};

export default MainTable;
