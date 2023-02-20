// React
import React, { ReactElement } from 'react';

// React router dom
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Antd
import { Button, Result } from 'antd';

function NotFound(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const handleOnClick = (): void => {
    navigate('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Данная страница не существует"
      extra={
        <Button type="primary" onClick={handleOnClick}>
          Вернуться на главную страницу
        </Button>
      }
    />
  );
}

export default NotFound;
