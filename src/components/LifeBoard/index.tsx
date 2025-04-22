import { useEffect, useState } from "react";
import Grid from "./grid";
import "./style.css";
const LifeBoard = () => {
  const [gridCount, setGridCount] = useState<number>(0);
  useEffect(() => {
    const zoneElement = document.querySelector(".zone");
    if (zoneElement) {
      const computedStyle = getComputedStyle(zoneElement);
      const gridSizeValue =
        600 / parseFloat(computedStyle.getPropertyValue("--grid-size"));
      setGridCount(gridSizeValue * gridSizeValue);
    }
  }, []);
  const grids = Array.from({ length: gridCount }, (_, index) => (
    <Grid key={index} status={false} />
  ));
  return (
    <div className="lifeBoard">
      <div className="zone">{grids}</div>
    </div>
  );
};

export default LifeBoard;
