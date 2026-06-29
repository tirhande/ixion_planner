import React from 'react';
import styled from 'styled-components';

import { RESOURCES } from 'utils/ResourceEnum';

interface IResourcePicker {
  screenX: number;
  screenY: number;
  selected?: string;
  onSelect: (resourceId?: string) => void;
  onClose: () => void;
}

const ResourcePicker = ({ screenX, screenY, selected, onSelect, onClose }: IResourcePicker) => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <Popup x={screenX} y={screenY}>
        {RESOURCES.map(({ id, icon }) => (
          <ResourceButton
            key={id}
            title={id}
            active={id === selected}
            onClick={() => onSelect(id === selected ? undefined : id)}
          >
            <img src={icon} alt={id} width={32} height={32} draggable={false} />
          </ResourceButton>
        ))}
      </Popup>
    </>
  );
};

export default ResourcePicker;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const Popup = styled.div<{ x: number; y: number }>`
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  z-index: 11;
  display: grid;
  grid-template-columns: repeat(6, 36px);
  gap: 4px;
  padding: 6px;
  background: #2b2b2b;
  border: 1px solid black;
  border-radius: 6px;
`;

const ResourceButton = styled.button<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid ${({ active }) => (active ? '#dccaa4' : 'black')};
  border-radius: 4px;
  cursor: pointer;
  background: ${({ active }) => (active ? '#5a4a2c' : '#3c3c3c')};

  &:hover {
    background: #555;
  }
`;
