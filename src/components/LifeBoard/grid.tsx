import "./style.css";

interface GridProps {
  status: boolean;
  clickHandler?: () => void;
}
const Grid = (props: GridProps) => {
  const { status, clickHandler } = props;
  return (
    <div
      className={`grid ${status ? "liveGrid" : undefined}`}
      onClick={clickHandler}
    />
  );
};

export default Grid;
