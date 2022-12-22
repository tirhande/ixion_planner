import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { useTranslation } from "react-i18next";
import styled from 'styled-components';

import i18next from "lang/i18n";
import { languageState, sectionState } from 'core/states';
import { ReactComponent as GithubLogoIcon } from 'assets/GithubLogo.svg';

const Header = () => {
  const sectionNumber = useRecoilValue(sectionState);
  const [language, setLanguage] = useRecoilState(languageState);

  const langChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lang = e.target.checked ? "en" : "ko";
    setLanguage(lang);
  };

  useEffect(() => {
    setTimeout(() => i18next.changeLanguage(language), 10);
  }, [language]);

  return (
    <StyledHeader>
      <div className="title">IXION Planner v0.4</div>
      <StyledTitle section={sectionNumber}>
        <div>SECTOR</div>
        <div className="sector-num">{sectionNumber}</div>
      </StyledTitle>
      <StyledHeaderRight>
        <div className="switch">
          <input
            id="language-toggle"
            className="check-toggle check-toggle-round-flat"
            type="checkbox"
            onChange={langChange}
            checked={language === 'en' ? true : false}
          />
          <label htmlFor="language-toggle" />
          <span className="on">KO</span>
          <span className="off">EN</span>
        </div>
        <div>
          <a href="https://github.com/tirhande/ixion_planner" target={'_blank'} rel="noopener noreferrer">
            <GithubLogoIcon width={30} height={30} />
          </a>
        </div>
      </StyledHeaderRight>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  height: 70px;

  display: flex;
  align-items: center;
  div.title {
    display: flex;
    justify-content: space-between;

    position: fixed;
    padding: 0 0.5em;
    left: 0;

    font-size: 28px;
    font-weight: bold;
  }
`;
const StyledHeaderRight = styled.div`
  position: fixed;
  padding: 0 0.5em;
  right: 0;
  display: flex;
  align-items: center;

  .switch {
    position: relative;
    display: inline-block;
    margin: 0 15px;
  }

  .switch > span {
    position: absolute;
    top: 12px;
    pointer-events: none;
    font-family: 'Helvetica', Arial, sans-serif;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    text-shadow: 0 1px 0 rgba(0, 0, 0, .06);
    width: 50%;
    text-align: center;
  }

  input.check-toggle-round-flat:checked ~ .off {
    color: #F36F25;
  }

  input.check-toggle-round-flat:checked ~ .on {
    color: #fff;
  }

  .switch > span.on {
    left: 0;
    padding-left: 4px;
    color: #F36F25;
  }

  .switch > span.off {
    right: 0;
    padding-right: 4px;
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
    background-color: #F36F25;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    -ms-border-radius: 60px;
    -o-border-radius: 60px;
    border-radius: 60px;
  }
  input.check-toggle-round-flat + label:before, input.check-toggle-round-flat + label:after {
    display: block;
    position: absolute;
    content: "";
  }

  input.check-toggle-round-flat + label:before {
    top: 2px;
    left: 2px;
    bottom: 2px;
    right: 2px;
    background-color: #F36F25;
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

const StyledTitle = styled.title<{section: number}>`
  height: 80%;
  margin: 0 auto;
  
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  font-size: 36px;
  background: ${({section}) => {
    if(section === 1) return '#dfc663'
    else if(section === 2) return '#e18089'
    else if(section === 3) return '#988be1'
    else if(section === 4) return '#59ced0'
    else if(section === 5) return '#b7d668'
    else if(section === 6) return '#cdcbc7'
  }};
  border-radius: 10px;

  div {
    padding: 0 0.5em;
    text-align: center;
  }

  .sector-num {
    font-size: 48px;
    padding: 0 0.5em;
  }
`;