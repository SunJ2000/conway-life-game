import { useEffect, useRef, useState } from "react";
import FunctionPanel from "../components/FunctionPanel";
import LifeBoard from "../components/LifeBoard";
import "./style.css";

const Main = () => {
  const [gridStatus, setGridStatus] = useState<boolean[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const size = useRef<number>(0);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const zoneElement = document.querySelector(".Main");
    if (zoneElement) {
      const computedStyle = getComputedStyle(zoneElement);
      const gridSizeValue =
        600 / parseFloat(computedStyle.getPropertyValue("--grid-size"));
      setGridStatus(
        Array.from({ length: gridSizeValue * gridSizeValue }, () => false)
      );
      size.current = gridSizeValue;
    }
  }, []);

  const count_neighbors = (index: number) => {
    let count = 0;
    const row = Math.floor(index / size.current);
    const col = index % size.current;
    const neighbors = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ];
    for (let i = 0; i < neighbors.length; i++) {
      const [r, c] = neighbors[i];
      if (r < 0 || r >= size.current || c < 0 || c >= size.current) {
        continue;
      }
      const neighborIndex = r * size.current + c;
      if (gridStatus[neighborIndex]) {
        count++;
      }
    }

    return count;
  }

  const NextPrime = () => {
    const nextStatus = [...gridStatus];
    for (let i = 0; i < gridStatus.length; i++) {
      const neighbors = count_neighbors(i);
      if (neighbors == 3) {
        nextStatus[i] = true;
      } else if (neighbors == 2) {
        nextStatus[i] = gridStatus[i];
      }
      else {
        nextStatus[i] = false;
      }
      setGridStatus(nextStatus);
    }
  }

  const InitValue = (mode: string) => {

    switch (mode) {
      case "random":
        {
          const randomStatus = gridStatus.map(() => Math.random() < 0.1);
          setGridStatus(randomStatus);
          break;
        }
      default:
        break;
    }

  }
  const StartPauseHandler = () => {
    if (isRunning) {
      clearInterval(timerRef.current); // 停止定时器
    } else {
      timerRef.current = setInterval(() => {
        NextPrime();
      }, 1000);
    }
    setIsRunning(!isRunning); // 切换状态
  };
  return (
    <div className="Main">
      <FunctionPanel StartPauseHandler={StartPauseHandler} isRunning={isRunning} NextPrime={NextPrime} InitValue={InitValue} />
      <LifeBoard gridStatus={gridStatus} />
    </div>
  );
};

export default Main;
