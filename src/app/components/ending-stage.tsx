import { useHistory } from "react-router-dom";
import "./ending-stage.sass";

const EndingStage = () => {
  const history = useHistory();
  return (
    <div className="ending-stage">
      <div className="ending-stage__text">Your swap is completed!</div>
      <div className="ending-stage__subtext">Can't wait to see you again.</div>
      <button className="ending-stage__button" onClick={() => {history.push(`/`);}}>Return to main page</button>
    </div>
  );
};

export default EndingStage;
