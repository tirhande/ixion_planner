import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { buildingState, sectionState } from 'core/states';
import BUILDINGS from 'utils/BuildingsEnum';

const Calculator = () => {
  const { t } = useTranslation();
  const buildings = useRecoilValue(buildingState);
  const sector = useRecoilValue(sectionState);
  const [workers, setWorkers] = useState(0);
  const [power, setPower] = useState(0);
  const [housing, setHousing] = useState(0);

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
      <InnerBox>
        <Workers>
          {t('workers')}: {workers}
        </Workers>
        <Power>
          {t('power')}: {power}
        </Power>
        <Housing>
          {t('housing')}: {housing}
        </Housing>
      </InnerBox>
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
