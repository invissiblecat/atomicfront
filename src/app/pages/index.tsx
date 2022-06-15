import { Route, Switch } from "react-router-dom";
import ClaimPage from "./claim.page";
import DeployFirstBox from "./deployFirstBox.page";
import DeploySecondBox from "./deploySecondBox.page";
import SecondBoxWait from "./deploySecondBoxWait.page";
import EndingPage from "./ending.page";
import MainPage from "./main.page";
import OrderPage from "./order.page";
import OrderCreatedPage from "./orderCreated.page";

function Pages() {
  
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/orderCreated/:boxId" exact>
        <OrderCreatedPage title="Your order was succesfully created" subtitle="After responding to your offer, you will go to the next page."/>
      </Route>
      <Route path="/orderSelected/:boxId" exact>
        <OrderPage title="You selected an order" subtitle="Please wait for the partner to deploy first box." timerTitle="Waiting..."/>
      </Route>
      <Route path="/deploySender/:boxId" exact>
        <DeployFirstBox title="Trade partner found" subtitle="Please deploy your box first"/>
      </Route>
      <Route path="/waitForRecieverDeploy/:boxId" exact>
        <SecondBoxWait title="Your box deployed" subtitle="Wait for reciever to deploy his box" statusToUpdate="both deployed" redirect="claim"/>
      </Route>
      <Route path="/deployReciever/:boxId" exact>
        <DeploySecondBox title="First box deployed" subtitle="Now it's your turn to deploy"/>
      </Route>
      <Route path="/claim/:boxId" exact>
        <ClaimPage title="Both box deployed" subtitle="You can claim your money" timerTitle='' statusToUpdate="both claim" redirect="ending"/>
      </Route>
      <Route path="/ending/:boxId" exact>
        <EndingPage/>
      </Route>
    </Switch>
  );
}

export default Pages;
