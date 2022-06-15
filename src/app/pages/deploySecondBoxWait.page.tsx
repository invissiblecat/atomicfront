import BoxSended from "app/components/box-sended";
import TitleSubtitle from "app/components/titles";
import { FC } from "react";
import { useParams } from "react-router-dom";
import "./order.page.sass";

type TProps = {
  title: string;
  subtitle: string;
  statusToUpdate: string;
  redirect: string
};

const SecondBoxWait: FC<TProps> = ({ title, subtitle, statusToUpdate, redirect }) => {
  const { boxId } = useParams<{ boxId: string }>();
  
  return (
    <div className="order-page">
      <TitleSubtitle title={title} subtitle={subtitle}/>
      <BoxSended id={boxId} statusToUpdate={statusToUpdate} redirect={redirect}/>
    </div>
  );
};

export default SecondBoxWait;
