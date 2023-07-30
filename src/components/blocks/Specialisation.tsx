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


const Specialisation = () => {
  const { t } = useTranslation();
  const buildings = useRecoilValue(buildingState);
  const sector = useRecoilValue(sectionState);

  const [currentInfo, setCurrentInfo] = useState({
    space: 0,
    food: 0,
    population: 0,
    industry: 0,
    recycling: 0,
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
    const newAmountSizes = buildings[sector].reduce(
      (acc, cv) => ({
        space: acc.space + (BUILDINGS[cv.id].specialisation?.space ?? 0),
        food: acc.food + (BUILDINGS[cv.id].specialisation?.food ?? 0),
        population: acc.population + (BUILDINGS[cv.id].specialisation?.population ?? 0),
        industry: acc.industry + (BUILDINGS[cv.id].specialisation?.industry ?? 0),
        recycling: acc.recycling + (BUILDINGS[cv.id].specialisation?.recycling ?? 0),
      }),
      {
        space: 0,
        food: 0,
        population: 0,
        industry: 0,
        recycling: 0,
      }
    )
    setCurrentInfo({
      food: calculateSpecialisationLevel(newAmountSizes.food, 'food'),
      space: calculateSpecialisationLevel(newAmountSizes.space, 'space'),
      population: calculateSpecialisationLevel(newAmountSizes.population, 'population'),
      industry: calculateSpecialisationLevel(newAmountSizes.industry, 'industry'),
      recycling: calculateSpecialisationLevel(newAmountSizes.recycling, 'recycling'),
    });
  }, [buildings, sector]);


  return (
    <CalculationBox>
      <InnerBox>
        {currentInfo.food !== 0 && <SpecialisationField>{t('foodSpecialisation')} {t('level')} {currentInfo.food}</SpecialisationField>}
        {currentInfo.space !== 0 && <SpecialisationField>{t('spaceSpecialisation')} {t('level')} {currentInfo.space}<br /></SpecialisationField>}
        {currentInfo.population !== 0 && <SpecialisationField>{t('populationSpecialisation')} {t('level')} {currentInfo.population}<br /></SpecialisationField>}
        {currentInfo.industry !== 0 && <SpecialisationField>{t('industrySpecialisation')} {t('level')} {currentInfo.industry}<br /></SpecialisationField>}
        {currentInfo.recycling !== 0 && <SpecialisationField>{t('recyclingSpecialisation')} {t('level')} {currentInfo.recycling}<br /></SpecialisationField>}
      </InnerBox>
    </CalculationBox>
  );
};

export default Specialisation;

const CalculationBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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

const SpecialisationField = styled.div`
  position: relative;
`;
