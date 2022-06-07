import CreateOrder from "app/components/create-order";
import EndingStage from "app/components/ending-stage";
import SendTransaction from "app/components/send-transaction";
import { FC } from "react";
import "./order.page.sass";

type TProps = {
  title: string;
};

const OrderPage: FC<TProps> = ({ title }) => {
  return (
    <div className="order-page">
      <div className="order-page__title">
        {title}
        {/* Your order was succesfully created */}
      </div>
      <div className="order-page__subtitle">
        After responding to your offer, you will go to the next page.
      </div>
      {/* <CreateOrder /> */}
      {/* <SendTransaction /> */}
      <EndingStage />
    </div>
  );
};

export default OrderPage;
