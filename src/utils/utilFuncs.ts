import { IBounds, IDiffBounds, IDiffRectangle, IDimension, IFindBuilding } from "types/Ixion";
import { GRID_SIZE } from 'utils/GridEnum';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const isOverlap = ({cur, diff}: IDiffRectangle) => {
  if (cur.x1 >= diff.x2 || diff.x1 >= cur.x2) return false;
  if (cur.y2 >= diff.y1 || diff.y2 >= cur.y1) return false;
  return true;
}

const adjustPoint = (rect: IBounds) => {
  if(rect.degree !== undefined && rect.degree !== 0) {
    const { x, y, width, height } = rect;

    const [centerX, centerY] = [x + (GRID_WIDTH * width) / 2, y + (GRID_HEIGHT * height) / 2];
    const [rotateCenterX, rotateCenterY] = [centerX + (GRID_WIDTH / 2), centerY + (GRID_HEIGHT / 2)];

    if(rect.degree === 90 || rect.degree === 270) {
      if(!isRotateCorrect({ width, height })) {
        if(width > height) {
          if(width % 2 === 0 && height % 2 !== 0) {

            if(rect.degree === 90) rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2;
            else rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2 - GRID_HEIGHT;
            
            rect.y = rotateCenterY - (width * GRID_WIDTH) / 2;
          } else {

            if(rect.degree === 90) rect.y = rotateCenterY - (width * GRID_WIDTH) / 2 - GRID_WIDTH;
            else rect.y = rotateCenterY - (width * GRID_WIDTH) / 2;

            rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2;
          }
        } else {
          rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2;

          if(rect.degree === 90) rect.y = rotateCenterY - (width * GRID_WIDTH) / 2 - GRID_WIDTH;
          else rect.y = rotateCenterY - (width * GRID_WIDTH) / 2;
        }
      } else {
        rect.x = centerX - (height * GRID_WIDTH) / 2;
        rect.y = centerY - (width * GRID_WIDTH) / 2;
      }
      
      rect.width = height;
      rect.height = width;
    }
  }
  return { x1: rect.x, y1: GRID_HEIGHT * rect.height + rect.y, x2: GRID_WIDTH * rect.width + rect.x, y2: rect.y }
}

export const isBuildingOverlap = ({ origin, diff }: IDiffBounds) => {
  const current = adjustPoint(origin);
  const other = adjustPoint(diff);

  return isOverlap({ cur: current, diff: other });
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

export const isRotateCorrect = ({width, height} : IDimension) => {
  if(width !== height) {
    if(!((width % 2 === 0 && height % 2 === 0) || (width % 2 === 1 && height % 2 === 1))) {
      return false;
    }
  }
  return true;
}