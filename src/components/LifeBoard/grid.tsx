import "./style.css";

interface GridProps {
  status: boolean;
}
const Grid = (props: GridProps) => {
  const { status, ...rest } = props;
  return (
    <div className="grid" {...rest}>
      {status ? "ON" : "OFF"}
    </div>
  );
};

export default Grid;
