import TitleSubtitle from "app/components/titles";
import { FC, useEffect } from "react";
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
    data: box  
  } = useGetBoxByIdQuery(boxId, {
    pollingInterval: 10000,
  });
  const [deleteBox, {isSuccess: isDeleteSuccess}] = useDeleteBoxMutation();

  useEffect(() => {
    if (box && box.reciever && box.reciever !== '') {
      history.push(`/deploySender/${boxId}`)
    }
  
  }, [box]);

  useEffect(() => {
    if (isDeleteSuccess) {
      history.push(`/`)
    }
  }, [isDeleteSuccess])

  
  return (
    <div className="order-page">
      <TitleSubtitle title={title} subtitle={subtitle}/>
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
