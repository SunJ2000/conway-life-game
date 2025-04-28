import Button from "../Button";
import "./style.css";

interface FunctionPanelProps {
  StartPauseHandler: () => void;
  NextPrime: () => void;
  isRunning: boolean;
  InitValue: (mode: string) => void;
}

const FunctionPanel = (props: FunctionPanelProps) => {
  const { StartPauseHandler, NextPrime, isRunning, InitValue } = props;

  return (
    <div className="functionPanel">
      <Button
        onClick={() => {
          InitValue("random");
        }}
      >
        随机分布
      </Button>
      <Button
        onClick={() => {
          NextPrime();
        }}
        disabled={isRunning}
      >
        下一周期
      </Button>
      <Button onClick={() => StartPauseHandler()}>{isRunning ? "暂  停" : "开  始"}</Button>
    </div>
  );
};

export default FunctionPanel;
