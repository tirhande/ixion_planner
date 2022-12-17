import React from 'react';
import { Button } from 'components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { NotFoundDiv } from './styles';

const NotFound = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  return (
    <NotFoundDiv>
      <div className="fof">
        <h1>ERROR 404</h1>
        <h1 className="animate">페이지를 찾을수 없습니다.</h1>
      </div>
      <div>
        <Button type="button" text="메인 화면으로 >" onClick={navigateHome} />
      </div>
    </NotFoundDiv>
  );
};

export default NotFound;
