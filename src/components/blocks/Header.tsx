import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import i18next from 'lang/i18n';
import { languageState, sectionState, perspectiveState } from 'core/states';
import { ReactComponent as DolosLogoIcon } from 'assets/DolosLogo.svg';
import { ReactComponent as GithubLogoIcon } from 'assets/GithubLogo.svg';
import SelectMenu from 'components/atoms/SelectMenu';
import { LANGUAGES } from 'utils/LanguageEnum';
import { SingleValue } from 'react-select';

const Header = () => {
  const sectionNumber = useRecoilValue(sectionState);
  const [isPerspective, setIsPerspective] = useRecoilState(perspectiveState);
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
        <div className="title">IXION Planner v0.8</div>
      </StyledHeaderLeft>
      <StyledHeaderCenter>
        <StyledTitle section={sectionNumber}>
          <div>SECTOR</div>
          <div className="sector-num">{sectionNumber}</div>
        </StyledTitle>
      </StyledHeaderCenter>
      <StyledHeaderRight>
        <StyledSwitchDiv>
          <input
            id="language-toggle"
            className="check-toggle check-toggle-round-flat"
            type="checkbox"
            onChange={() => setIsPerspective(!isPerspective)}
            checked={isPerspective}
          />
          <label htmlFor="language-toggle" />
          <span className="on">🙂</span>
          <span className="off">😎</span>
        </StyledSwitchDiv>
        <SelectMenu defaultValue={defaultValue} options={options} onChange={onLanguageChange} />
        <StyledLinkDiv>
          <a href="https://github.com/tirhande/ixion_planner" target={'_blank'} rel="noopener noreferrer">
            <GithubLogoIcon width={30} height={30} />
          </a>
          <a href="https://github.com/tirhande/ixion_planner#patch-note" target={'_blank'} rel="noopener noreferrer">
            Patch Notes
          </a>
        </StyledLinkDiv>
      </StyledHeaderRight>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  height: 8%;
  display: flex;
  align-items: center;
  z-index: 2;
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
`;

const StyledLinkDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-left: 1em;
`;
const StyledSwitchDiv = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 15px;

  > span {
    position: absolute;
    top: 6px;
    pointer-events: none;
    font-family: 'Helvetica', Arial, sans-serif;
    font-weight: bold;
    font-size: 24px;
    text-transform: uppercase;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    width: 50%;
    text-align: center;
  }
  input.check-toggle-round-flat:checked ~ .off {
    color: #f36f25;
  }
  input.check-toggle-round-flat:checked ~ .on {
    color: #fff;
  }
  > span.on {
    left: 0;
    padding-left: 6px;
    color: #f36f25;
  }
  > span.off {
    right: 0;
    padding-right: 6px;
    color: #fff;
  }
  .check-toggle {
    position: absolute;
    margin-left: -9999px;
    visibility: hidden;
  }
  .check-toggle + label {
    display: block;
    position: relative;
    cursor: pointer;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  input.check-toggle-round-flat + label {
    padding: 2px;
    width: 97px;
    height: 35px;
    background-color: #f36f25;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    -ms-border-radius: 60px;
    -o-border-radius: 60px;
    border-radius: 60px;
  }
  input.check-toggle-round-flat + label:before,
  input.check-toggle-round-flat + label:after {
    display: block;
    position: absolute;
    content: '';
  }
  input.check-toggle-round-flat + label:before {
    top: 2px;
    left: 2px;
    bottom: 2px;
    right: 2px;
    background-color: #f36f25;
    -webkit--moz-border-radius: 60px;
    -ms-border-radius: 60px;
    -o-border-radius: 60px;
    border-radius: 60px;
  }
  input.check-toggle-round-flat + label:after {
    top: 4px;
    left: 4px;
    bottom: 4px;
    width: 48px;
    background-color: #fff;
    -webkit-border-radius: 52px;
    -moz-border-radius: 52px;
    -ms-border-radius: 52px;
    -o-border-radius: 52px;
    border-radius: 52px;
    -webkit-transition: margin 0.2s;
    -moz-transition: margin 0.2s;
    -o-transition: margin 0.2s;
    transition: margin 0.2s;
  }
  input.check-toggle-round-flat:checked + label {
  }
  input.check-toggle-round-flat:checked + label:after {
    margin-left: 41px;
  }
`;
