import React, { memo } from 'react';

import { GRID_SIZE } from 'utils/GridEnum';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;
const Banner = () => <rect x={GRID_WIDTH * 24} y="0" width={GRID_WIDTH * 8} height={GRID_HEIGHT} fill="#ff0000" />;

export default memo(Banner);