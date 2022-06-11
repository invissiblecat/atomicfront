import BothBoxSend from "app/components/both-box";
import BoxSended from "app/components/box-sended";
import CreateOrder from "app/components/create-order";
import EndingStage from "app/components/ending-stage";
import FirstBoxSend from "app/components/first-box";
import SendTransaction from "app/components/send-transaction";
import { FC } from "react";
import { useParams } from "react-router-dom";
import "./order.page.sass";


const EndingPage = () => {
  const { boxId } = useParams<{ boxId: string }>();
  // console.log({boxId})
  
  return (
    <div className="order-page">
      <EndingStage />
    </div>
  );
};

export default EndingPage;
