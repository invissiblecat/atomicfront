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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            faucibus porta libero, at porttitor elit congue eget. Nullam dictum,
            risus quis aliquet dictum, augue lacus lacinia augue, eget mattis
            elit diam id nulla. Vivamus pulvinar sapien a mauris vestibulum
            euismod. Curabitur vehicula ante gravida placerat rutrum.
            Suspendisse potenti. Maecenas quis accumsan lectus. In id odio
            congue, auctor enim in, ultricies lacus. Suspendisse potenti. Sed
            risus arcu, vehicula at nibh id, faucibus condimentum ex. Nullam at
            lobortis nisi. Integer lobortis tellus nec congue bibendum.
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
