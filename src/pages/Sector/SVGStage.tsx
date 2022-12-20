import React, { memo } from 'react';

import ConstructsGrid from 'components/blocks/ConstructsGrid';
import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';

const { CANVAS_WIDTH } = CANVAS_SIZE;
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const SVGStage = () => {
  return (
    <svg>
      <defs>
        <pattern id="grid" width={GRID_WIDTH} height={GRID_HEIGHT} patternUnits="userSpaceOnUse">
          <path
            d={`M ${GRID_WIDTH} 0 L 0 0 0 ${GRID_HEIGHT}`}
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity={0.5}
          />
        </pattern>
        <g id="passage" opacity={0.8} fill="#d6b138">
          {[4, 13, 16, 25].map(v => {
            return (
              <g key={v}>
                <polygon
                  points={`0 ${GRID_WIDTH * v}, 8 ${GRID_WIDTH * v + GRID_WIDTH / 2}, 0 ${GRID_WIDTH * (v + 1)}`}
                />
                <polygon
                  points={`${CANVAS_WIDTH} ${GRID_WIDTH * v}, ${CANVAS_WIDTH - 8} ${
                    GRID_WIDTH * v + GRID_WIDTH / 2
                  }, ${CANVAS_WIDTH} ${GRID_WIDTH * (v + 1)}`}
                />
              </g>
            );
          })}
        </g>
        <ConstructsGrid />
      </defs>
    </svg>
  );
};

export default memo(SVGStage);
