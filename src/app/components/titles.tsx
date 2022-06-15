import { FC } from "react";
import "./titles.sass";

type TProps = {
  title: string;
  subtitle: string;
};

const TitleSubtitle: FC<TProps> = ({ title, subtitle}) => {
  
  return (
    <div className="titles-page">
      <div className="titles-page__title">
        {title}
      </div>
      <div className="titles-page__subtitle">
        {subtitle}
      </div>
    </div>
  );
};

export default TitleSubtitle;
