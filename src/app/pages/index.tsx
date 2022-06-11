import { useActions } from "app/components/hooks/use-actions";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { selectWallet } from "redux/wallet.slice";
import { web3Modal } from "services/wallet.service";
import DeployFirstBox from "./deployFirstBox.page";
import MainPage from "./main.page";
import OrderPage from "./order.page";
import OrderCreatedPage from "./orderCreated.page";

function Pages() {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route exact path="/orderCreated/:boxId" render={(props) => (
        <OrderCreatedPage title="Your order was succesfully created" subtitle="After responding to your offer, you will go to the next page."/>
      )}>   
      </Route>
      <Route path="/orderSelected/:boxId" exact>
        <OrderPage title="You selected an order" subtitle="Please wait for the partner to deploy first box." timerTitle="Waiting..."/>
      </Route>
      <Route path="/deploySender/:boxId" exact>
        <DeployFirstBox title="Trade partner found" subtitle="Please deploy your box first"/>
      </Route>
    </Switch>
  );
}

export default Pages;
