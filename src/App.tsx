import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ReactGA from "react-ga4";

import SectorPage from 'pages/Sector';
import { GlobalStyles } from './styles/global';
import { constructState, menuState, sectionState } from 'core/states';

const App = () => {
  const setClickMenu = useSetRecoilState(menuState);
  const setSectionNumber = useSetRecoilState(sectionState);
  const [{ degree }, setConstruct] = useRecoilState(constructState);

  const onRotate = useCallback((ev: (KeyboardEvent | MouseEvent)) => {
    if(ev instanceof KeyboardEvent) {
      if(ev.key.toLowerCase() === 'r' || ev.key.toLowerCase() === 'ㄱ') {
        const deg = degree === 270 ? 0 : degree + 90;
        setConstruct(prev => ({ ...prev, degree: deg }));
      }
      if(ev.key.toLowerCase() === 'c' || ev.key.toLowerCase() === 'ㅊ') setClickMenu(prev => prev === 'consBuilding' ? '' : 'consBuilding');
      else if(ev.key.toLowerCase() === 'q' || ev.key.toLowerCase() === 'ㅂ') setSectionNumber(prev => (prev === 1) ? 6 : prev - 1);
      else if(ev.key.toLowerCase() === 'e' || ev.key.toLowerCase() === 'ㄷ') setSectionNumber(prev => (prev === 6) ? 1 : prev + 1);
    } else {
      if(ev.buttons === 4) {
        const deg = degree === 270 ? 0 : degree + 90;
        setConstruct(prev => ({ ...prev, degree: deg }));
      }
    }
  }, [degree]);

  useEffect(() => {
    document.addEventListener('mousedown', onRotate);
    document.addEventListener('keydown', onRotate);

    return () => {
      document.removeEventListener('mousedown', onRotate);
      document.removeEventListener('keydown', onRotate);
    };
  }, [onRotate]);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRAKING_ID);
      ReactGA.send("pageview");
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <SectorPage />
    </>
  );
};

export default App;
