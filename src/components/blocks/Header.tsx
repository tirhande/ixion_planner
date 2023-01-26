import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import i18next from 'lang/i18n';
import { languageState, sectionState } from 'core/states';
import { ReactComponent as DolosLogoIcon } from 'assets/DolosLogo.svg';
import { ReactComponent as GithubLogoIcon } from 'assets/GithubLogo.svg';
import SelectMenu from 'components/atoms/SelectMenu';
import { LANGUAGES } from 'utils/LanguageEnum';
import { SingleValue } from 'react-select';

const Header = () => {
  const sectionNumber = useRecoilValue(sectionState);
  const [language, setLanguage] = useRecoilState(languageState);

  useEffect(() => {
    setTimeout(() => i18next.changeLanguage(language), 10);
  }, [language]);

  const options = Object.keys(LANGUAGES).map(key => LANGUAGES[key as keyof typeof LANGUAGES]);
  const defaultValue = LANGUAGES[language.toUpperCase() as keyof typeof LANGUAGES];

  const onLanguageChange = (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    setLanguage(newValue?.value || 'ko_KR');
  };

  return (
    <StyledHeader>
      <StyledHeaderLeft>
        <div>
          <DolosLogoIcon width={30} height={30} />
        </div>
        <div className="title">IXION Planner v0.55</div>
      </StyledHeaderLeft>
      <StyledHeaderCenter>
        <StyledTitle section={sectionNumber}>
          <div>SECTOR</div>
          <div className="sector-num">{sectionNumber}</div>
        </StyledTitle>
      </StyledHeaderCenter>
      <StyledHeaderRight>
        <SelectMenu defaultValue={defaultValue} options={options} onChange={onLanguageChange} />
        <div>
          <a href="https://github.com/tirhande/ixion_planner" target={'_blank'} rel="noopener noreferrer">
            <GithubLogoIcon width={30} height={30} />
          </a>
        </div>
      </StyledHeaderRight>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  height: 8%;
  display: flex;
  align-items: center;
`;

const StyledHeaderLeft = styled.div`
  width: 23%;
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;

  > div > svg {
    margin-right: 10px;
  }

  @media (max-width: 800px) {
    > svg {
      margin-right: 0;
    }
    .title {
      display: none;
    }
  }
`;
const StyledHeaderCenter = styled.div`
  width: 54%;
  height: 85%;

  @media (max-width: 800px) {
    width: 100%;
    height: 90%;
    padding: 0;
  }
`;
const StyledTitle = styled.title<{ section: number }>`
  width: 40%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 800px) {
    width: 80%;
  }
  font-size: 36px;
  background: ${({ section }) => {
    if (section === 1) return '#dfc663';
    else if (section === 2) return '#e18089';
    else if (section === 3) return '#988be1';
    else if (section === 4) return '#59ced0';
    else if (section === 5) return '#b7d668';
    else if (section === 6) return '#cdcbc7';
  }};
  border-radius: 10px;

  div {
    text-align: center;
  }

  .sector-num {
    font-size: 48px;
  }
`;
const StyledHeaderRight = styled.div`
  padding: 0 0.5em;
  width: 23%;

  display: flex;
  align-items: center;
  justify-content: center;

  > div:last-child {
    margin-left: 1em;
  }
`;
