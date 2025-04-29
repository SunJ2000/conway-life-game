import Button from "../Button";
import Select from "../Select";
import "./style.css";

interface FunctionPanelProps {
  StartPauseHandler: (status?: boolean) => void;
  NextPrime: () => void;
  isRunning: boolean;
  InitValue: (mode: string) => void;
  setGridStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const FunctionPanel = (props: FunctionPanelProps) => {
  const { StartPauseHandler, NextPrime, isRunning, InitValue, setGridStatus } = props;

  const options = [
    { value: "random", label: "随机分布" },
    { value: "custom", label: "自定义" },
    { value: "beacon", label: "预定义-灯塔" },
  ];

  return (
    <div className="functionPanel">

      <Select
        onChange={(e) => {
          InitValue(e.target.value);
        }}
        title="初始化模式"
        options={options}
        disabled={isRunning}
      />
      <Button
        onClick={() => {
          StartPauseHandler(false);
          setGridStatus((prevStatus) => prevStatus.map(() => false));
        }}
        disabled={isRunning}
      >
        重 置
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
