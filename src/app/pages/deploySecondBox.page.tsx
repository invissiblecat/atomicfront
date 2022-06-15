import FirstBoxSend from "app/components/first-box";
import TitleSubtitle from "app/components/titles";
import { FC } from "react";
import { useParams } from "react-router-dom";
import "./order.page.sass";

type TProps = {
  title: string;
  subtitle: string;
};

const DeploySecondBox: FC<TProps> = ({ title, subtitle }) => {
  const { boxId } = useParams<{ boxId: string }>();
  
  return (
    <div className="order-page">
      <TitleSubtitle title={title} subtitle={subtitle}/>
      <FirstBoxSend boxId={boxId} statusToUpdate='both deployed' redirect="claim"/>
    </div>
  );
};

export default DeploySecondBox;
