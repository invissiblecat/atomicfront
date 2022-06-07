import { Route, Switch } from "react-router-dom";
import MainPage from "./main.page";
import OrderPage from "./order.page";

function Pages() {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/order" exact>
        <OrderPage title="Your order was succesfully created" subtitle="After responding to your offer, you will go to the next page."/>
      </Route>
    </Switch>
  );
}

export default Pages;
