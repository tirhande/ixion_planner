import React, { useCallback, useEffect } from 'react';
import SectorPage from 'pages/Sector';
import { GlobalStyles } from './styles/global';
import { constructState } from 'core/states';
import { useRecoilState } from 'recoil';

const App = () => {
  const [{ degree }, setConstruct] = useRecoilState(constructState);

  const onRotate = useCallback((ev: (KeyboardEvent | MouseEvent)) => {
    if(ev instanceof KeyboardEvent) {
      if(ev.key.toLowerCase() === 'r' || ev.key.toLowerCase() === 'ㄱ') {
        const deg = degree === 270 ? 0 : degree + 90;
        setConstruct(prev => ({ ...prev, degree: deg }));
      }
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

  return (
    <>
      <GlobalStyles />
      <SectorPage />
    </>
  );
};

export default App;
