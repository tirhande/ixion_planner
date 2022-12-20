import { IFindBuilding, IRectangle } from "types/Ixion";
import { GRID_SIZE } from 'utils/GridEnum';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

export const isOverlap = ({ l1, r1, l2, r2 }: IRectangle) => {
  if (l1.x === r1.x || l1.y === r1.y || r2.x === l2.x || l2.y === r2.y) return false;
  if (l1.x >= r2.x || l2.x >= r1.x) return false;
  if (r1.y >= l2.y || r2.y >= l1.y) return false;
  return true;
};

export const isInsidePoint = ({x, y, bx, by, width, height}: IFindBuilding) => {
  const [x1, y1, x2, y2] = [bx, by + (height * GRID_HEIGHT), bx + (width * GRID_WIDTH), by];
  if (x > x1 && x < x2 && y < y1 && y > y2)
    return true;
  return false;
  // bx, by + (height * GRID_HEIGHT);
  // bx + (width * GRID_WIDTH), by
  // if (x > x1 && x < x2 && y > y1 && y < y2)
  //   return true;
  // const right = bx + (width * GRID_WIDTH), by
  // const left = bx, by + (height * GRID_HEIGHT)
  // x + (width * GRID_WIDTH), y + (height * GRID_HEIGHT)
}