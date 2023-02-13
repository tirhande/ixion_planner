import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { buildingState, sectionState } from 'core/states';
import { FACTORIES_BUILD } from 'utils/FactoriesEnum';
import { FOOD_BUILD } from 'utils/FoodEnum';
import { MAINTENANCE_BUILD } from 'utils/MaintenanceEnum';
import { POPULATION_BUILD } from 'utils/PopulationEnum';
import { SPACE_BUILD } from 'utils/SpaceEnum';
import { STABILITY_BUILD } from 'utils/StabilityEnum';

const Calculator = () => {
  const buildings = useRecoilValue(buildingState);
  const sector = useRecoilValue(sectionState);
  const [workers, setWorkers] = useState(0);
  const [power, setPower] = useState(0);
  const [housing, setHousing] = useState(0);
  const BUILDINGS = Object.assign(
    FACTORIES_BUILD,
    FOOD_BUILD,
    MAINTENANCE_BUILD,
    POPULATION_BUILD,
    SPACE_BUILD,
    STABILITY_BUILD
  );

  useEffect(() => {
    const currentWorkers: number = buildings[sector].reduce((acc, cv) => {
      return acc + BUILDINGS[cv.id].workers;
    }, 0);
    setWorkers(currentWorkers);
    const currentPower: number = buildings[sector].reduce((acc, cv) => {
      return acc + BUILDINGS[cv.id].power;
    }, 0);
    setPower(currentPower);
    const currentHousing: number = buildings[sector].reduce((acc, cv) => {
      if (BUILDINGS[cv.id].housing) return acc + BUILDINGS[cv.id].housing;
      return acc;
    }, 0);
    setHousing(currentHousing);
  }, [buildings, sector]);
  return (
    <CalculationBox>
      <Workers>Workers: {workers}</Workers>
      <Power>Power: {power}</Power>
      <Housing>Housing: {housing}</Housing>
    </CalculationBox>
  );
};

export default Calculator;

const CalculationBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 5px;
  width: 190px;
  height: 90px;
  border: solid;
`;

const Workers = styled.div`
  position: relative;
`;

const Power = styled.div`
  position: relative;
`;

const Housing = styled.div`
  position: relative;
`;
