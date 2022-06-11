import BothBoxSend from "app/components/both-box";
import BoxSended from "app/components/box-sended";
import CreateOrder from "app/components/create-order";
import EndingStage from "app/components/ending-stage";
import FirstBoxSend from "app/components/first-box";
import SendTransaction from "app/components/send-transaction";
import { FC } from "react";
import { useParams } from "react-router-dom";
import "./order.page.sass";

type TProps = {
  title: string;
  subtitle: string;
};

const SecondBoxWait: FC<TProps> = ({ title, subtitle }) => {
  const { boxId } = useParams<{ boxId: string }>();
  
  return (
    <div className="order-page">
      <div className="order-page__title">
        {title}
      </div>
      <div className="order-page__subtitle">
        {subtitle}
      </div>
      {/* <FirstBoxSend boxId={boxId}/> */}
      {/* <BothBoxSend /> */}
      <BoxSended id={boxId} statusToUpdate='both deployed' redirect="firstClaim"/>
      {/* <EndingStage /> */}
    </div>
  );
};

export default SecondBoxWait;