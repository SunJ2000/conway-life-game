import FunctionPanel from "../components/FunctionPanel";
import LifeBoard from "../components/LifeBoard";
import "./style.css";

const Main = () => {
  return (
    <div className="Main">
      <FunctionPanel />
      <LifeBoard />
    </div>
  );
};

export default Main;
