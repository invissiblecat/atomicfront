import BothBoxSend from "app/components/both-box";
import BoxSended from "app/components/box-sended";
import CreateOrder from "app/components/create-order";
import EndingStage from "app/components/ending-stage";
import FirstBoxSend from "app/components/first-box";
import SendTransaction from "app/components/send-transaction";
import { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetBoxByIdQuery } from "redux/project.api";
import "./order.page.sass";

type TProps = {
  title: string;
  subtitle: string;
};

const OrderCreatedPage: FC<TProps> = ({ title, subtitle }) => {
  const { boxId } = useParams<{ boxId: string }>();
  const history = useHistory();
  const {
    data: box,
    refetch: refetchProject,
  } = useGetBoxByIdQuery(boxId, {
    pollingInterval: 10000,
  });

  useEffect(() => {
    console.log(box)
    if (box && box.reciever && box.reciever !== '') {
      history.push(`/deploySender/${boxId}`)
    }
  }, [box]);

  
  return (
    <div className="order-page">
      <div className="order-page__title">
        {title}
      </div>
      <div className="order-page__subtitle">
        {subtitle}
      </div>
    </div>
  );
};

export default OrderCreatedPage;
