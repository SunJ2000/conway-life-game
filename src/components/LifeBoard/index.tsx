import Grid from "./grid";
import "./style.css";

interface LifeBoardProps {
  gridStatus: boolean[];

}
const LifeBoard = (props: LifeBoardProps) => {
  const { gridStatus } = props;
  const grids = gridStatus.map((status, index) => (
    <Grid key={index} status={status} />
  ));

  return (
    <div className="lifeBoard">
      <div className="zone">{grids}</div>
    </div>
  );
};

export default LifeBoard;
