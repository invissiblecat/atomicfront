import NewOrderForm from "app/components/deploy/deploy.form";
import { useActions } from "app/components/hooks/use-actions";
import MainTable from "app/components/main.table";
import { useSelector } from "react-redux";
import { selectWallet } from "redux/wallet.slice";
import "./main.page.sass";

function MainPage() {
  const wallet = useSelector(selectWallet);
  const { connect, disconnect } = useActions();
  return (
    <>
      <div className="page">
        <div className="page__inner">
          <h1 className="page__title">Atomic Swap</h1>
          <div className="page__desc" id="about">
            Trustless technology for swapping your tokens between different netwotks. 
            Open-source: smart contracts, frontend, backend. Just a student's project but important technology.
            Currently exists only on testnets.
            Nice to meet you and have fun!
          </div>
        </div>
        <div className="page__line"> </div>

      <MainTable />
      {wallet.address ? ( 
      <div className="page__form" id="form">
        <NewOrderForm></NewOrderForm>
      </div>) 
      :
      (
        <div className="page__form" id="form">
          <div  className="page__info">
            <button className="page__button" onClick={() => {connect()}}>
              Connect wallet
            </button>
              to create your own swap.
          </div>
          </div>
      )}
    </div>
    </>
  );
}

export default MainPage;
