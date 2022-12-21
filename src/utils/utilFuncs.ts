import { IBounds, IDiffBounds, IDiffRectangle, IFindBuilding } from "types/Ixion";
import { GRID_SIZE } from 'utils/GridEnum';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

// export const isOverlap = ({ l1, r1, l2, r2 }: IRectangle) => {
//   if (l1.x === r1.x || l1.y === r1.y || r2.x === l2.x || l2.y === r2.y) return false;
//   if (l1.x >= r2.x || l2.x >= r1.x) return false;
//   if (r1.y >= l2.y || r2.y >= l1.y) return false;
//   return true;
// };

// l1: { x: x, y: GRID_HEIGHT * height + y },
// r1: { x: GRID_WIDTH * width + x, y: y },
// l2: { x: GRID_WIDTH * 24, y: GRID_HEIGHT },
// r2: { x: GRID_WIDTH * 32, y: 0 }

const isOverlap = ({cur, diff}: IDiffRectangle) => {
  if (cur.x1 >= diff.x2 || diff.x1 >= cur.x2) return false;
  if (cur.y2 >= diff.y1 || diff.y2 >= cur.y1) return false;
  return true;
}

export const isBuildingOverlap = ({ origin, diff }: IDiffBounds) => {
  const building = { x1: origin.x, y1: GRID_HEIGHT * origin.height + origin.y, x2: GRID_WIDTH * origin.width + origin.x, y2: origin.y };
  const other = { x1: diff.x, y1: GRID_HEIGHT * diff.height + diff.y, x2: GRID_WIDTH * diff.width + diff.x, y2: diff.y };

  return isOverlap({ cur: building, diff: other });
}

export const isBannerOverlap = ({ x, y, width, height }: IBounds) => {
  const building = { x1: x, y1: GRID_HEIGHT * height + y, x2: GRID_WIDTH * width + x, y2: y };
  const banner = { x1: GRID_WIDTH * 24, y1: GRID_HEIGHT, x2: GRID_WIDTH * 32, y2: 0 };
  
  return isOverlap({ cur: building, diff: banner });
};
export const isInsidePoint = ({x, y, bx, by, width, height}: IFindBuilding) => {
  const [x1, y1, x2, y2] = [bx, by + (height * GRID_HEIGHT), bx + (width * GRID_WIDTH), by];
  if (x > x1 && x < x2 && y < y1 && y > y2) return true;
  return false;
}