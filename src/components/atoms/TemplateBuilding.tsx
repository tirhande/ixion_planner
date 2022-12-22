import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import i18next from 'i18next';
import { GRID_SIZE } from 'utils/GridEnum';
import { ITemplateBuilding } from 'types/Ixion';
import { visibleState } from 'core/states';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const TemplateBuilding = ({ construct_id, width, height, location, fillColor, text }: ITemplateBuilding) => {
  const isVisible = useRecoilValue(visibleState);
  const [top, right, bottom, left] = location;

  const topDirection = useCallback(() => {
    const tmpArray = Array.from({ length: top }, (_, i) => i);
    return (<g transform={`translate(0, ${-GRID_HEIGHT})`}>
      <rect x="0" y="0" width={GRID_WIDTH * width} height={GRID_HEIGHT} fill="#886a39" />
      {tmpArray.map((v, i) => {
        const tmp = (top < width) ? (v + ((width - top) / 2)): v;
        const x = tmp * GRID_WIDTH;
        return (
          <polygon
            key={i}
            points={`${x} ${GRID_HEIGHT}, ${(tmp + 1) * GRID_WIDTH} ${GRID_HEIGHT}, ${x + GRID_WIDTH / 2} ${
              GRID_HEIGHT - 7
            }`}
            fill="#d6b138"
          />
        );
      })}
    </g>)
  }, [top]);

  const rightDirection = useCallback(() => {
    const tmpArray = Array.from({ length: right }, (_, i) => i);
    return (
      <g transform={`translate(${GRID_WIDTH * width}, 0)`}>
        <rect x="0" y="0" width={GRID_WIDTH} height={GRID_HEIGHT * height} fill="#886a39" />
        {tmpArray.map((v, i) => {
          const y = v * GRID_HEIGHT;
          return <polygon key={i} points={`0 ${y}, 0 ${y + GRID_HEIGHT}, 7 ${y + GRID_HEIGHT / 2}`} fill="#d6b138" />;
        })}
      </g>)
  }, [right]);
  
  const bottomDirection = useCallback(() => {
    const tmpArray = Array.from({ length: bottom }, (_, i) => i);
    return (
      <g transform={`translate(0, ${GRID_HEIGHT * height})`}>
        <rect x="0" y="0" width={GRID_WIDTH * width} height={GRID_HEIGHT} fill="#886a39" />
        {tmpArray.map((v, i) => {
          const tmp = (bottom < width) ? (v + ((width - bottom) / 2)): v;
          const x = tmp * GRID_WIDTH;
          return <polygon key={i} points={`${x} 0, ${(tmp + 1) * GRID_WIDTH} 0, ${x + GRID_WIDTH / 2} 7`} fill="#d6b138" />;
        })}
      </g>)
  }, [bottom]);


  const leftDirection = useCallback(() => {
    const tmpArray = Array.from({ length: right }, (_, i) => i);
    return (
      <g transform={`translate(${-GRID_WIDTH}, 0)`}>
        <rect x="0" y="0" width={GRID_WIDTH} height={GRID_HEIGHT * height} fill="#886a39" />
        {tmpArray.map((v, i) => {
          const y = v * GRID_HEIGHT;
          return (
            <polygon
              key={i}
              points={`${GRID_WIDTH} ${y}, ${GRID_WIDTH} ${y + GRID_HEIGHT}, ${GRID_WIDTH - 7} ${y + GRID_HEIGHT / 2}`}
              fill="#d6b138"
            />
          );
        })}
      </g>)
  }, [left]);

  const label = text.length > width * (i18next.language === 'ko' ? 1 : 1.5) ? text.split(' ') : [text];

  return (
    <g>
      <g id={`pre-${construct_id}`} fill={fillColor}>
        <rect x="0" y="0" width={GRID_WIDTH * width} height={GRID_HEIGHT * height} fill="inherit" stroke="black" />
        <g>
          {top > 0 && topDirection()}
          {right > 0 && rightDirection()}
          {bottom > 0 && bottomDirection()}
          {left > 0 && leftDirection()}
        </g>
        <text
          x={(GRID_WIDTH * width) / 2}
          y={(GRID_HEIGHT * height) / 2}
          fontSize="1em"
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSizeAdjust={1}
        >
          {label.map((text, i) => {
            return (
              <tspan
                key={text}
                x={(GRID_WIDTH * width) / 2}
                dy={i === 0 ? (label.length > 1 ? (label.length === 2 ? '-0.65em' : '-1.3em') : '0') : '1.3em'}
              >
                {text.replace(/\|/gi, " ")}
              </tspan>
            );
          })}
        </text>
      </g>
      <g id={`construct-${construct_id}`} fill={fillColor}>
        <rect x="0" y="0" width={GRID_WIDTH * width} height={GRID_HEIGHT * height} fill="inherit" stroke="black" />
        {isVisible ? (
          <g opacity={0.4}>
            {top > 0 && topDirection()}
            {right > 0 && rightDirection()}
            {bottom > 0 && bottomDirection()}
            {left > 0 && leftDirection()}
          </g>
        ) : (
          <></>
        )}
        <text
          x={(GRID_WIDTH * width) / 2}
          y={(GRID_HEIGHT * height) / 2}
          fontSize="1em"
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label?.map((text, i) => {
            return (
              <tspan
                key={text}
                x={(GRID_WIDTH * width) / 2}
                dy={i === 0 ? (label.length > 1 ? (label.length === 2 ? '-0.65em' : '-1.3em') : '0') : '1.3em'}
              >
                {text.replace(/\|/gi, " ")}
              </tspan>
            );
          })}
        </text>
      </g>
    </g>
  );
}

export default TemplateBuilding;