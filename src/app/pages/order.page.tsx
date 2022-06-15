import CreateOrder from "app/components/create-order";
import TitleSubtitle from "app/components/titles";
import { FC } from "react";
import { useParams } from "react-router-dom";
import "./order.page.sass";

type TProps = {
  title: string;
  subtitle: string;
  timerTitle: string
};

const OrderPage: FC<TProps> = ({ title, subtitle, timerTitle }) => {
  const { boxId } = useParams<{ boxId: string }>();
  
  return (
    <div className="order-page">
      <TitleSubtitle title={title} subtitle={subtitle}/>
      <CreateOrder timerTitle={timerTitle} id={boxId}/>
    </div>
  );
};

export default OrderPage;
