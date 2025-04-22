import Button from "../Button";
import "./style.css";

const FunctionPanel = () => {
  return (
    <div className="functionPanel">
      <Button
        onClick={() => {
          console.log("随机分布");
        }}
      >
        随机分布
      </Button>
      <Button
        onClick={() => {
          console.log("下一周期");
        }}
      >
        下一周期
      </Button>
      <Button>开始</Button>
    </div>
  );
};

export default FunctionPanel;
