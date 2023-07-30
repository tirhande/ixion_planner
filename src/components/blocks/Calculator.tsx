import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { buildingState, sectionState } from 'core/states';
import { FACTORIES_BUILD } from 'utils/FactoriesEnum';
import { FOOD_BUILD } from 'utils/FoodEnum';
import { MAINTENANCE_BUILD } from 'utils/MaintenanceEnum';
import { POPULATION_BUILD } from 'utils/PopulationEnum';
import { SPACE_BUILD } from 'utils/SpaceEnum';
import { STABILITY_BUILD } from 'utils/StabilityEnum';
import { calculateSpecialisationLevel } from 'utils/SpecialsationEnum';

const Calculator = () => {
  const { t } = useTranslation();
  const buildings = useRecoilValue(buildingState);
  const sector = useRecoilValue(sectionState);

  const [currentInfo, setCurrentInfo] = useState({
    workers: 0,
    power: 0,
    housing: 0,
    battery: 0,
    industrySize: 0,
  });

  const BUILDINGS = Object.assign(
    {},
    FACTORIES_BUILD,
    FOOD_BUILD,
    MAINTENANCE_BUILD,
    POPULATION_BUILD,
    SPACE_BUILD,
    STABILITY_BUILD
  );

  useEffect(() => {
    const newInfo =
      buildings[sector].reduce(
        (acc, cv) => ({
          workers: acc.workers + BUILDINGS[cv.id].workers,
          power: acc.power + BUILDINGS[cv.id].power,
          housing: acc.housing + (BUILDINGS[cv.id].housing ? BUILDINGS[cv.id].housing : 0),
          battery: acc.battery + (BUILDINGS[cv.id].battery ?? 0),
          industrySize: acc.industrySize + (BUILDINGS[cv.id].specialisation?.industry ?? 0),
        }),
        {
          workers: 0,
          power: 0,
          housing: 0,
          battery: 0,
          industrySize: 0,
        }
      )
    if (calculateSpecialisationLevel(newInfo.industrySize, 'industry') >= 1) {
      newInfo.battery = newInfo.battery * 1.2;
    }
    setCurrentInfo(newInfo);
  }, [buildings, sector]);


  return (
    <CalculationBox>
      <InnerBox>
        <Workers>
          {t('workers')}: {currentInfo.workers}
        </Workers>
        <Power>
          {t('power')}: {currentInfo.power}
        </Power>
        <Housing>
          {t('housing')}: {currentInfo.housing}
        </Housing>
        <Battery>
          {t('battery')}: {calculateBattery(currentInfo.battery, currentInfo.power)} {t('cycles')} ({currentInfo.battery})
        </Battery>
      </InnerBox>
    </CalculationBox>
  );
};

export default Calculator;

function calculateBattery(battery: number, power: number): string {
  if (power === 0) {
    return "0";
  }
  const cycles = battery / power;
  return (Math.round(cycles * 10) / 10).toFixed(1);
}

const CalculationBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 5px;
  width: 230px;
  height: 90px;
  border: 2px solid #959685;
  border-radius: 3px;
  background-color: #000000;
  color: white;
`;

const InnerBox = styled.div`
  margin: 2px;
  width: auto;
  height: 95%;
  border: 1px solid #35392f;
  border-radius: 3px;
  padding: 5px;
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

const Battery = styled.div`
  position: relative;
`;
