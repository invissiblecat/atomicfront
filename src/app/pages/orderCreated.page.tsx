import BothBoxSend from "app/components/both-box";
import BoxSended from "app/components/box-sended";
import CreateOrder from "app/components/create-order";
import EndingStage from "app/components/ending-stage";
import FirstBoxSend from "app/components/first-box";
import SendTransaction from "app/components/send-transaction";
import { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteBoxMutation, useGetBoxByIdQuery } from "redux/project.api";
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
    isError
  } = useGetBoxByIdQuery(boxId, {
    pollingInterval: 10000,
  });
  const [deleteBox, {}] = useDeleteBoxMutation();

  useEffect(() => {
    if (box && box.reciever && box.reciever !== '') {
      history.push(`/deploySender/${boxId}`)
    }
    if (isError) {
      history.push(`/`)
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
      <div  className="order-page__info">
        If you have changed your mind, you can
      <button className="order-page__button" onClick={() => {deleteBox({id: boxId})}}>
        delete your box.
      </button>
      </div>
    </div>
  );
};

export default OrderCreatedPage;
