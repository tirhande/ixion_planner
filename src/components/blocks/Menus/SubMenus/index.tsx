import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import MaintenanceMenu from './Maintenance';
import SpaceMenu from './Space';
import FactoriesMenu from './Factories';
import PopulationMenu from './Population';
import FoodMenu from './Food';
import StabilityMenu from './Stability';
import { constructState } from 'core/states';
import { IWrapProps } from 'types/atoms';

const SubMenus = () => {
  const { t } = useTranslation();
  const setConstruct = useSetRecoilState(constructState);

  const onMenuClick = ({ id, width, height, isWall }: IWrapProps) => {
    setConstruct({ isConstruct: true, construct_id: id, width: width, height: height, isWall: isWall, degree: 0 });
  };

  const data = [
    {
      id: 0,
      title: t('maintenance'),
      contents: <MaintenanceMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 1,
      title: t('space'),
      contents: <SpaceMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 2,
      title: t('factories'),
      contents: <FactoriesMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 3,
      title: t('population'),
      contents: <PopulationMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 4,
      title: t('food'),
      contents: <FoodMenu onMenuClick={onMenuClick} />,
    },
    {
      id: 5,
      title: t('stability'),
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
  position: fixed;
  bottom: 10.5%;
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

  height: 20px;

  li {
    border-top: 1px solid #fff;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    padding: 1px 5px;
    margin: 0 0.3em;
    font-size: 0.8rem;

    cursor: pointer;
    &.active {
      background: #535353;
    }
  }
`;
