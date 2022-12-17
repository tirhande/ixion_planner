import React, { useState } from 'react';
import styled from 'styled-components';

import { ImageButton } from 'components/atoms/ImageButton';
import { ReactComponent as Workshop } from 'assets/Menus/Maintenance/Workshop.svg';

const SubMenusSection = styled.section`
  height: 153px;
  color: #fff;
  
  > div {
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 1.25px 4em;

    > button {
      margin: 0 0.4em;

      > svg:hover > path,
      > svg:hover {
        fill: #dccaa445;
      }
    }
  }
`;

const SubMenusUl = styled.ul`
  display: flex;
  justify-content: center;

  height: 25px;

  li {
    border-top: 1px solid #fff;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    padding: 3px 10px;
    margin: 0 0.3em;

    cursor: pointer;
    &.active {
      background: #535353;
    }
  }
`

const SubMenus = () => {
  const data = [
    {
      id: 0,
      title: "정비",
      contents: "작업장 창고 창고 창고"
    },
    {
      id: 1,
      title: "우주",
      contents: ""
    },
    {
      id: 2,
      title: "공장",
      contents: ""
    },
    {
      id: 3,
      title: "인구",
      contents: ""
    },
    {
      id: 4,
      title: "식량",
      contents: ""
    },
    {
      id: 5,
      title: "안정성",
      contents: ""
    }
  ];
  const [index, setIndex] = useState(0);

  return (
    <SubMenusSection>
      <SubMenusUl>
        {data.map(item => (
          <li 
          key={item.id}
          className={index === item.id ? 'active' : ''}
          onClick={() => setIndex(item.id)}>{item.title}</li>
        ))}
      </SubMenusUl>
      <div>
        <ImageButton>
          <Workshop />
        </ImageButton>
      </div>
      {/* {data.filter(item => index === item.id).map(item => (
        <div key={item.title}>{item.contents}</div>
      ))} */}
    </SubMenusSection>
  );
};

export default SubMenus;
