import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";

function BalanceProgressBar(props) {
  const [percent, setPercent] = useState(props.percent);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData(percent));
  }, [props]);

  const getData = (perc) => {
    return [
      { x: 1, y: perc },
      { x: 2, y: 100 - perc },
    ];
  };

  return (
    <div>
      <svg width="400" height="400">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={450}
          height={450}
          data={getData(percent)}
          innerRadius={150}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={props}>
          {(newProps) => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={225}
                y={225}
                text={`${Math.round(newProps.percent)}%\nREMAINING`}
                style={{ fontSize: 35 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
}

export default BalanceProgressBar;
