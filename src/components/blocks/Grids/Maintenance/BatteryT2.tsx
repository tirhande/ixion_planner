import React from 'react';

const W_GRID = 25;
const H_GRID = 22.5;
const WIDTH = 5;
const HEIGHT = 5;

const BatteryT2 = () => {
  const triAngles = Array.from({ length: WIDTH }, (_, i) => i);

  return (
    <>
      <g id="pre-battery-t2">
        <rect x="0" y="0" width={W_GRID * WIDTH} height={H_GRID * HEIGHT} fill="red" />
        {/* triangles */}
        <g>
          {/* top-direction */}
          <g transform={`translate(0, ${-H_GRID})`}>
            <rect x="0" y="0" width={W_GRID * WIDTH} height={H_GRID} fill="#886a39" />
            {triAngles.map((v, i) => {
              const x = v * W_GRID;
              return <polygon key={i} points={`${x} ${H_GRID}, ${(v + 1) * W_GRID} ${H_GRID}, ${x + W_GRID / 2} ${H_GRID - 7}`} fill="#d6b138" />;
            })}
          </g>
          {/* right-direction */}
          <g transform={`translate(${W_GRID * WIDTH}, 0)`}>
            <rect x="0" y="0" width={W_GRID} height={H_GRID * HEIGHT} fill="#886a39" />
            {triAngles.map((v, i) => {
              const y = v * H_GRID;
              return <polygon key={i} points={`0 ${y}, 0 ${y + H_GRID}, 7 ${y + H_GRID / 2}`} fill="#d6b138" />;
            })}
          </g>
          {/* bottom-direction */}
          <g transform={`translate(0, ${H_GRID * HEIGHT})`}>
            <rect x="0" y="0" width={W_GRID * WIDTH} height={H_GRID} fill="#886a39" />
            {triAngles.map((v, i) => {
              const x = v * W_GRID;
              return <polygon key={i} points={`${x} 0, ${(v + 1) * W_GRID} 0, ${x + W_GRID / 2} 7`} fill="#d6b138" />;
            })}
          </g>
          {/* left-direction */}
          <g transform={`translate(${-W_GRID}, 0)`}>
            <rect x="0" y="0" width={W_GRID} height={H_GRID * HEIGHT} fill="#886a39" />
            {triAngles.map((v, i) => {
              const y = v * H_GRID;
              return <polygon key={i} points={`${W_GRID} ${y}, ${W_GRID} ${y + H_GRID}, ${W_GRID - 7} ${y + H_GRID / 2}`} fill="#d6b138" />;
            })}
          </g>
        </g>
        <text x={(W_GRID * WIDTH)/2} y={((H_GRID * HEIGHT)/2)} fontSize="18" fill="blue" dominantBaseline="central" textAnchor="middle">
          <tspan x={(W_GRID * WIDTH)/2} dy="0">Battery T2</tspan>
        </text>
      </g>
      <g id="battery-t2">
        <rect x="0" y="0" width={W_GRID * WIDTH} height={H_GRID * HEIGHT} fill="red" />
        <text x={(W_GRID * WIDTH)/2} y={((H_GRID * HEIGHT)/2)} fontSize="18" fill="blue" dominantBaseline="central" textAnchor="middle">
          <tspan x={(W_GRID * WIDTH)/2} dy="0">Battery T2</tspan>
        </text>
      </g>
    </>
  );
};

export default BatteryT2;
