import { IBounds, IDiffBounds, IDiffRectangle, IDimension, IFindBuilding } from 'types/Ixion';
import { GRID_SIZE, CANVAS_SIZE } from 'utils/GridEnum';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const isOverlap = ({ cur, diff }: IDiffRectangle) => {
  if (cur.x1 >= diff.x2 || diff.x1 >= cur.x2) return false;
  if (cur.y2 >= diff.y1 || diff.y2 >= cur.y1) return false;
  return true;
};

const adjustPoint = (rect: IBounds) => {
  if (rect.degree !== undefined && rect.degree !== 0) {
    const { x, y, width, height } = rect;

    const [centerX, centerY] = [x + (GRID_WIDTH * width) / 2, y + (GRID_HEIGHT * height) / 2];
    const [rotateCenterX, rotateCenterY] = [centerX + GRID_WIDTH / 2, centerY + GRID_HEIGHT / 2];

    if (rect.degree === 90 || rect.degree === 270) {
      if (!isRotateCorrect({ width, height })) {
        if (width > height) {
          if (width % 2 === 0 && height % 2 !== 0) {
            if (rect.degree === 90) rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2;
            else rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2 - GRID_HEIGHT;

            rect.y = rotateCenterY - (width * GRID_WIDTH) / 2;
          } else {
            if (rect.degree === 90) rect.y = rotateCenterY - (width * GRID_WIDTH) / 2 - GRID_WIDTH;
            else rect.y = rotateCenterY - (width * GRID_WIDTH) / 2;

            rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2;
          }
        } else {
          rect.x = rotateCenterX - (height * GRID_HEIGHT) / 2;

          if (rect.degree === 90) rect.y = rotateCenterY - (width * GRID_WIDTH) / 2 - GRID_WIDTH;
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
  return { x1: rect.x, y1: GRID_HEIGHT * rect.height + rect.y, x2: GRID_WIDTH * rect.width + rect.x, y2: rect.y };
};

export const isBuildingOverlap = ({ origin, diff }: IDiffBounds) => {
  const current = adjustPoint(origin);
  const other = adjustPoint(diff);

  return isOverlap({ cur: current, diff: other });
};

export const isBannerOverlap = ({ x, y, width, height }: IBounds) => {
  const building = { x1: x, y1: GRID_HEIGHT * height + y, x2: GRID_WIDTH * width + x, y2: y };
  const banner = { x1: GRID_WIDTH * 24, y1: GRID_HEIGHT, x2: GRID_WIDTH * 32, y2: 0 };

  return isOverlap({ cur: building, diff: banner });
};
export const isInsidePoint = ({ x, y, bx, by, width, height }: IFindBuilding) => {
  const [x1, y1, x2, y2] = [bx, by + height * GRID_HEIGHT, bx + width * GRID_WIDTH, by];
  if (x > x1 && x < x2 && y < y1 && y > y2) return true;
  return false;
};
export const isRotateCorrect = ({ width, height }: IDimension) => {
  if (width !== height) {
    if (!((width % 2 === 0 && height % 2 === 0) || (width % 2 === 1 && height % 2 === 1))) {
      return false;
    }
  }
  return true;
};
const getTopLeftPoint = ({ x, y, angle }: { x: number; y: number; angle: number }) => {
  let tmpX = x;
  let tmpY = y;
  if (x % GRID_WIDTH !== 0) {
    if (Math.abs(angle) === 90) {
      if (angle > 0) tmpX = x + GRID_WIDTH / 2;
      else tmpX = x - GRID_WIDTH / 2;
    } else {
      if (angle > 0) tmpX = x - GRID_WIDTH / 2;
      else tmpX = x + GRID_WIDTH / 2;
    }
  }
  if (y % GRID_HEIGHT !== 0) {
    tmpY = y + GRID_HEIGHT / 2;
  }

  return {
    x: tmpX,
    y: tmpY,
  };
};
export const rotatePoint = ({
  pointX,
  pointY,
  centerX,
  centerY,
  angle,
}: {
  pointX: number;
  pointY: number;
  centerX: number;
  centerY: number;
  angle: number;
}) => {
  const rad = (angle * Math.PI) / 180.0;
  const tmpX = Math.round(Math.cos(rad) * (pointX - centerX) - Math.sin(rad) * (pointY - centerY) + centerX);
  const tmpY = Math.round(Math.sin(rad) * (pointX - centerX) + Math.cos(rad) * (pointY - centerY) + centerY);
  return getTopLeftPoint({ x: tmpX, y: tmpY, angle });
};
const getDefaultZero = ({ width, height }: IDimension) => {
  return {
    minX: 0,
    minY: 0,
    maxX: CANVAS_WIDTH - width * GRID_WIDTH,
    maxY: CANVAS_HEIGHT - height * GRID_HEIGHT,
  };
}
const getNinety = ({ width, height }: IDimension) => {
  const [centerX, centerY] = [(height * GRID_WIDTH) / 2, (width * GRID_HEIGHT) / 2];
  const rotateX = isRotateCorrect({ width, height }) || centerX % GRID_WIDTH === 0 ? centerX : centerX - GRID_WIDTH / 2;
  const rotateY = isRotateCorrect({ width, height }) || centerY % GRID_HEIGHT === 0 ? centerY : centerY - GRID_HEIGHT / 2;

  const minPos = rotatePoint({
    pointX: GRID_WIDTH * height + (height % 2 === 0 ? 0 : GRID_WIDTH / 2),
    pointY: width % 2 === 0 ? 0 : -GRID_HEIGHT / 2,
    centerX: width % 2 === 0 ? centerX : rotateX,
    centerY: height % 2 === 0 ? centerY : rotateY,
    angle: -90,
  });
  const maxPos = rotatePoint({
    pointX: CANVAS_WIDTH + (height % 2 === 0 ? 0 : GRID_WIDTH / 2),
    pointY: CANVAS_HEIGHT - width * GRID_HEIGHT - (width % 2 === 0 ? 0 : GRID_HEIGHT / 2),
    centerX: CANVAS_WIDTH - (width % 2 === 0 ? centerX : rotateX),
    centerY: CANVAS_HEIGHT - (height % 2 === 0 ? centerY : rotateY),
    angle: -90,
  });
  if (width % 2 !== 0) {
    if (width === height) {
      minPos.x += GRID_WIDTH;
      maxPos.x += GRID_WIDTH;
    } else if (width > height) {
      if (width === 15) {
        maxPos.x += GRID_WIDTH * 4;
        maxPos.y += GRID_HEIGHT * 4;
      } else {
        if (width === 7) {
          minPos.x += GRID_WIDTH;
          maxPos.x += GRID_WIDTH;
        }
        maxPos.x += GRID_WIDTH;
        maxPos.y += GRID_HEIGHT;
      }
    } else {
      if (height % 2 === 0) {
        maxPos.x -= GRID_WIDTH * 2;
        maxPos.y -= GRID_HEIGHT * 2;
      } else {
        minPos.x += GRID_HEIGHT;
        maxPos.y -= GRID_HEIGHT;
      }
    }
  }
  return {
    minX: minPos.x,
    minY: minPos.y,
    maxX: maxPos.x,
    maxY: maxPos.y,
  };
};
const getTwoHundredSeventy = ({ width, height }: IDimension) => {
  // get -270 === 90
  const [centerX, centerY] = [(height * GRID_WIDTH) / 2, (width * GRID_HEIGHT) / 2];
  const rotateX = isRotateCorrect({ width, height }) || centerX % GRID_WIDTH === 0 ? centerX : centerX - GRID_WIDTH / 2;
  const rotateY = isRotateCorrect({ width, height }) || centerY % GRID_HEIGHT === 0 ? centerY : centerY - GRID_HEIGHT / 2;
  const minPos = rotatePoint({
    pointX: height % 2 === 0 ? 0 : -GRID_WIDTH / 2,
    pointY: GRID_WIDTH * width - (width % 2 === 0 ? 0 : GRID_HEIGHT / 2),
    centerX: width % 2 === 0 ? centerX : rotateX,
    centerY: height % 2 === 0 ? centerY : rotateY,
    angle: 90,  
  });
  const maxPos = rotatePoint({
    pointX: CANVAS_WIDTH - height * GRID_HEIGHT - (height % 2 === 0 ? 0 : GRID_WIDTH / 2),
    pointY: CANVAS_HEIGHT + (width % 2 === 0 ? 0 : GRID_HEIGHT / 2),
    centerX: CANVAS_WIDTH - (width % 2 === 0 ? centerX : rotateX),
    centerY: CANVAS_HEIGHT - (height % 2 === 0 ? centerY : rotateY),
    angle: 90,
  });
  if (width % 2 !== 0) {
    if (width === height) {
      minPos.x -= GRID_WIDTH;
    } else if (width > height) {
      minPos.x -= GRID_WIDTH;
      if(width !== 7) {
        minPos.y -= GRID_HEIGHT;
        maxPos.y -= GRID_HEIGHT;
      }
    } else {
      if (height % 2 === 0) {
        minPos.x -= GRID_WIDTH;
        minPos.y -= GRID_HEIGHT;
        maxPos.y -= GRID_HEIGHT;
      } else {
        minPos.x -= GRID_WIDTH;
      }
    }
  }
  return {
    minX: minPos.x,
    minY: minPos.y,
    maxX: maxPos.x,
    maxY: maxPos.y,
  };
}
const getHundredEighty  = ({ width, height }: IDimension) => {
  const [centerX, centerY] = [(width * GRID_WIDTH) / 2, (height * GRID_HEIGHT) / 2];
  const minPos = rotatePoint({
    pointX: width * GRID_WIDTH,
    pointY: height * GRID_HEIGHT,
    centerX: centerX,
    centerY: centerY,
    angle: 180,
  });
  const maxPos = rotatePoint({
    pointX: CANVAS_WIDTH,
    pointY: CANVAS_HEIGHT,
    centerX: CANVAS_WIDTH - centerX,
    centerY: CANVAS_HEIGHT - centerY,
    angle: 180,
  });

  if(width === 3 && height === 6) {
    minPos.x -= GRID_WIDTH;
    maxPos.x -= GRID_WIDTH;
  }
  return {
    minX: minPos.x,
    minY: minPos.y,
    maxX: maxPos.x,
    maxY: maxPos.y,
  };
}
export const getMinMaxPoint = ({ width, height, degree }: { degree: number } & IDimension) => {
  if(degree === 0) return getDefaultZero({ width, height });
  else if(degree === 90) return getNinety({ width, height });
  else if(degree === 270) return getTwoHundredSeventy({ width, height });
  else return getHundredEighty({ width, height });
};