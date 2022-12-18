import React, { useCallback } from 'react';
// import styled from 'styled-components';
import { GRID_SIZE } from 'utils/GridEnum';


interface IBuilding {
  construct_id: string;
  width: number;
  height: number;
  location: readonly number[];
  fillColor: string;
}

const { grid_width, grid_height } = GRID_SIZE;

export const Building = ({ construct_id, width, height, location, fillColor }: IBuilding) => {
  const [top, right, bottom, left] = location;

  const topDirection = useCallback(() => {
    const tmpArray = Array.from({ length: top }, (_, i) => i);
    return (<g transform={`translate(0, ${-grid_height})`}>
      <rect x="0" y="0" width={grid_width * width} height={grid_height} fill="#886a39" />
      {tmpArray.map((v, i) => {
        const tmp = (top < width) ? (v + ((width - top) / 2)): v;
        const x = tmp * grid_width;
        return (
          <polygon
            key={i}
            points={`${x} ${grid_height}, ${(tmp + 1) * grid_width} ${grid_height}, ${x + grid_width / 2} ${
              grid_height - 7
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
      <g transform={`translate(${grid_width * width}, 0)`}>
        <rect x="0" y="0" width={grid_width} height={grid_height * height} fill="#886a39" />
        {tmpArray.map((v, i) => {
          const y = v * grid_height;
          return <polygon key={i} points={`0 ${y}, 0 ${y + grid_height}, 7 ${y + grid_height / 2}`} fill="#d6b138" />;
        })}
      </g>)
  }, [right]);
  
  const bottomDirection = useCallback(() => {
    const tmpArray = Array.from({ length: bottom }, (_, i) => i);
    return (
      <g transform={`translate(0, ${grid_height * height})`}>
        <rect x="0" y="0" width={grid_width * width} height={grid_height} fill="#886a39" />
        {tmpArray.map((v, i) => {
          const tmp = (bottom < width) ? (v + ((width - bottom) / 2)): v;
          const x = tmp * grid_width;
          return <polygon key={i} points={`${x} 0, ${(tmp + 1) * grid_width} 0, ${x + grid_width / 2} 7`} fill="#d6b138" />;
        })}
      </g>)
  }, [bottom]);


  const leftDirection = useCallback(() => {
    const tmpArray = Array.from({ length: right }, (_, i) => i);
    return (
      <g transform={`translate(${-grid_width}, 0)`}>
        <rect x="0" y="0" width={grid_width} height={grid_height * height} fill="#886a39" />
        {tmpArray.map((v, i) => {
          const y = v * grid_height;
          return (
            <polygon
              key={i}
              points={`${grid_width} ${y}, ${grid_width} ${y + grid_height}, ${grid_width - 7} ${y + grid_height / 2}`}
              fill="#d6b138"
            />
          );
        })}
      </g>)
  }, [left]);

  const title = construct_id.match(/[A-Z]+(?![a-z])\d|[A-Z]?[a-z]+/g) || [];
  return (
    <g>
      <g id={`pre-${construct_id}`} fill={fillColor}>
        <rect x="0" y="0" width={grid_width * width} height={grid_height * height} fill="inherit" stroke='black' />
        <g>
          {top > 0 && topDirection()}
          {right > 0 && rightDirection()}
          {bottom > 0 && bottomDirection()}
          {left > 0 && leftDirection()}
        </g>
        <text
          x={(grid_width * width) / 2}
          y={(grid_height * height) / 2}
          fontSize="1em"
          fill="blue"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {title?.map((text, i) => {
            return (
              <tspan
                key={text}
                x={(grid_width * width) / 2}
                dy={i === 0 ? (title.length > 1 ? (title.length === 2 ? '-0.65em' : '-1.3em') : '0') : '1.3em'}
              >
                {text}
              </tspan>
            );
          })}
        </text>
      </g>
      <svg id={`construct-${construct_id}`} fill={fillColor}>
        <rect x="0" y="0" width={grid_width * width} height={grid_height * height} fill="inherit" stroke='black'/>
        <text
          x={(grid_width * width) / 2}
          y={(grid_height * height) / 2}
          fontSize="1em"
          fill="blue"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {title?.map((text, i) => {
            return (
              <tspan
                key={text}
                x={(grid_width * width) / 2}
                dy={i === 0 ? (title.length > 1 ? (title.length === 2 ? '-0.65em' : '-1.3em') : '0') : '1.3em'}
              >
                {text}
              </tspan>
            );
          })}
        </text>
      </svg>
    </g>
  )
}
