import { useActions } from "app/components/hooks/use-actions";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { selectWallet } from "redux/wallet.slice";
import { web3Modal } from "services/wallet.service";
import ClaimPage from "./claim.page";
import DeployFirstBox from "./deployFirstBox.page";
import DeploySecondBox from "./deploySecondBox.page";
import SecondBoxWait from "./deploySecondBoxWait.page";
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
      <Route path="/waitForRecieverDeploy/:boxId" exact>
        <SecondBoxWait title="Your box deployed" subtitle="Wait for reciever to deploy his box"/>
      </Route>
      <Route path="/deployReciever/:boxId" exact>
        <DeploySecondBox title="First box deployed" subtitle="Now it's your turn to deploy"/>
      </Route>
      <Route path="/firstClaim/:boxId" exact>
        <ClaimPage title="Both box deployed" subtitle="You can claim your money" timerTitle=''/>
      </Route>
      <Route path="/waitFirstClaim/:boxId" exact>
        <ClaimPage title="Both box deployed" subtitle="Wait for your partner to claim" timerTitle=''/>
      </Route>
    </Switch>
  );
}

export default Pages;
