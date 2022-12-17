import React from 'react';

const W_GRID = 25;
const H_GRID = 22.5;
const WIDTH = 9;
const HEIGHT = 9;

const ColonyTrainingCenter = () => {
  const triAngles = Array.from({ length: WIDTH }, (_, i) => i);

  return (
    <>
      <g id="pre-colony-traning-center">
        <rect x="0" y="0" width={W_GRID * WIDTH} height={H_GRID * HEIGHT} fill="red" />
        <g id="colony-direction" transform={`translate(0, ${H_GRID * HEIGHT})`}>
          <rect x="0" y="0" width={W_GRID * WIDTH} height={H_GRID} fill="#886a39" />
          {/* bottom */}
          {triAngles.map((v, i) => {
            const x = v * W_GRID;
            return <polygon key={i} points={`${x} 0, ${(v + 1) * W_GRID} 0, ${x + W_GRID / 2} 7`} fill="#d6b138" />;
          })}
        </g>
        <text x={(W_GRID * WIDTH)/2} y={((H_GRID * HEIGHT)/3) + HEIGHT} fontSize="22" fill="blue" dominantBaseline="central" textAnchor="middle">
          <tspan x={(W_GRID * WIDTH)/2} dy="0">Colony</tspan>
          <tspan x={(W_GRID * WIDTH)/2} dy="1.2em">Training</tspan>
          <tspan x={(W_GRID * WIDTH)/2} dy="1.2em">Center</tspan>
        </text>
      </g>
      <g id="colony-traning-center">
        <rect x="0" y="0" width={W_GRID * WIDTH} height={H_GRID * HEIGHT} fill="red" />
        <text x={(W_GRID * WIDTH)/2} y={((H_GRID * HEIGHT)/3) + HEIGHT} fontSize="22" fill="blue" dominantBaseline="central" textAnchor="middle">
          <tspan x={(W_GRID * WIDTH)/2} dy="0">Colony</tspan>
          <tspan x={(W_GRID * WIDTH)/2} dy="1.2em">Training</tspan>
          <tspan x={(W_GRID * WIDTH)/2} dy="1.2em">Center</tspan>
        </text>
      </g>
    </>
  );
};

export default ColonyTrainingCenter;
