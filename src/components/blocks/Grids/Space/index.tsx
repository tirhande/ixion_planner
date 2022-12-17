import React from 'react';
import ColonyTrainingCenter from './ColonyTrainingCenter';
import DockingBay from './DockingBay';
import EVAAirlock from './EVAAirlock';
import ProbeLauncher from './ProbeLauncher';

const Space = () => (
  <>
    <DockingBay />
    <EVAAirlock />
    <ProbeLauncher />
    <ColonyTrainingCenter />
  </>
);

export default Space;
