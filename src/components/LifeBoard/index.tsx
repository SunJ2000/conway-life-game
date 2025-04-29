import Grid from "./grid";
import "./style.css";

interface LifeBoardProps {
  gridStatus: boolean[];
  setGridStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
  customMode: boolean;
}
const LifeBoard = (props: LifeBoardProps) => {
  const { gridStatus, setGridStatus, customMode } = props;
  const grids = gridStatus.map((status, index) => (
    <Grid key={index} status={status} onClick={() => {
      if (customMode) {
        const newGridStatus = [...gridStatus];
        newGridStatus[index] = !newGridStatus[index];
        setGridStatus(newGridStatus);
      }
    }} />
  ));

  return (
    <div className="lifeBoard">
      <div className="zone">{grids}</div>
    </div>
  );
};

export default LifeBoard;
