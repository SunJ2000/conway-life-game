import "./style.css";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  status: boolean;
}
const Grid = (props: GridProps) => {
  const { status, ...rest } = props;
  return (
    <div
      className={`grid ${status ? "liveGrid" : undefined}`}
      {...rest}
    />
  );
};

export default Grid;
