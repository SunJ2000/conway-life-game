import { useCallback, useEffect, useRef, useState } from "react";
import FunctionPanel from "../components/FunctionPanel";
import LifeBoard from "../components/LifeBoard";
import "./style.css";

const Main = () => {
  const [gridStatus, setGridStatus] = useState<boolean[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const size = useRef<number>(0);
  const [customMode, setCustomMode] = useState(false);

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

  const count_neighbors = useCallback(
    (index: number) => {
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
    },
    [gridStatus]
  );

  const NextPrime = useCallback(() => {
    const nextStatus = [...gridStatus];
    for (let i = 0; i < gridStatus.length; i++) {
      const neighbors = count_neighbors(i);
      if (neighbors == 3) {
        nextStatus[i] = true;
      } else if (neighbors == 2) {
        nextStatus[i] = gridStatus[i];
      } else {
        nextStatus[i] = false;
      }
      setGridStatus(nextStatus);
    }
  }, [gridStatus, count_neighbors]);

  const InitValue = (mode: string) => {
    switch (mode) {
      case "random": {
        const randomStatus = gridStatus.map(() => Math.random() < 0.1);
        setGridStatus(randomStatus);
        break;
      }
      case "custom": {
        setCustomMode(!customMode);
        break;
      }
      case "beacon": {
        const beaconStatus = gridStatus.map(() => false);
        const beaconSeed = 750;
        const beaconPattern = [
          beaconSeed, beaconSeed + 1,
          beaconSeed + size.current, beaconSeed + size.current + 1,
          beaconSeed + size.current * 2 - 2, beaconSeed + size.current * 2 - 1,
          beaconSeed + size.current * 3 - 2, beaconSeed + size.current * 3 - 1,
        ];
        for (let i = 0; i < beaconPattern.length; i++) {
          const index = beaconPattern[i];
          if (0 < index && index < gridStatus.length) {
            beaconStatus[index] = true;
          }
        }
        setGridStatus(beaconStatus);
        break;
      }
      default:
        break;
    }
  };
  const StartPauseHandler = (status: boolean = !isRunning) => {
    setIsRunning(status); // 切换状态
  };

  useEffect(() => {
    let timerId: number;
    if (isRunning) {
      timerId = setTimeout(() => {
        NextPrime();
      }, 500);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isRunning, NextPrime]);

  return (
    <div className="Main">
      <FunctionPanel
        StartPauseHandler={StartPauseHandler}
        isRunning={isRunning}
        NextPrime={NextPrime}
        InitValue={InitValue}
        setGridStatus={setGridStatus}
      />
      <LifeBoard gridStatus={gridStatus} setGridStatus={setGridStatus} customMode={customMode} />
    </div>
  );
};

export default Main;
