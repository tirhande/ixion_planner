import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import styled from 'styled-components';

import MaintenanceMenu from './Maintenance';
import SpaceMenu from './Space';
import FactoriesMenu from './Factories';
import PopulationMenu from './Population';
import FoodMenu from './Food';
import StabilityMenu from './Stability';
import { constructState } from 'core/states';
import { IWrapProps } from 'types/atoms';

const SubMenus = () => {
  const setConstruct = useSetRecoilState(constructState);

  const onMenuClick = ({ id, width, height, isWall }: IWrapProps) => {
    setConstruct({ isConstruct: true, construct_id: id, width: width, height: height,isWall: isWall, degree: 0 });
  };

  const data = [
    {
      id: 0,
      title: '정비',
      contents: <MaintenanceMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 1,
      title: '우주',
      contents: <SpaceMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 2,
      title: '공장',
      contents: <FactoriesMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 3,
      title: '인구',
      contents: <PopulationMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 4,
      title: '식량',
      contents: <FoodMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 5,
      title: '안정성',
      contents: <StabilityMenu onMenuClick={onMenuClick} />,
    },
  ];

  const [index, setIndex] = useState(0);
  
  return (
    <SubMenusSection>
      <SubMenusUl>
        {data.map(item => (
          <li key={item.id} className={index === item.id ? 'active' : ''} onClick={() => setIndex(item.id)}>
            {item.title}
          </li>
        ))}
      </SubMenusUl>
      {data.filter(item => index === item.id)[0].contents}
    </SubMenusSection>
  );
};

export default SubMenus;

const SubMenusSection = styled.section`
  color: #fff;
  background: #00000070;
  padding: 5px 10px;
  border-radius: 5px;

  > div {
    border: 1px solid #fff;
    border-radius: 5px;

    > button {
      margin: 0 0.4em;

      > svg:hover > path,
      > svg:hover {
        fill: #dccaa445;
      }
    }
  }
`;

const SubMenusUl = styled.ul`
  display: flex;
  justify-content: center;

  height: 25px;

  li {
    border-top: 1px solid #fff;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    padding: 3px 10px;
    margin: 0 0.3em;

    cursor: pointer;
    &.active {
      background: #535353;
    }
  }
`;
