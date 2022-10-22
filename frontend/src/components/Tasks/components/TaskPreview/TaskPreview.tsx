import React, { ReactElement } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { TaskPreviewProps } from '../../../../common/props';

import './style.css';

export function TaskPreview({
  id,
  title,
  description,
}: TaskPreviewProps): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="task-preview">
      <h3 className="task-preview__title">{title}</h3>
      <p className="task-preview__description">{description}</p>
      <Button
        className="task-preview__submit-btn"
        type="primary"
        htmlType="submit"
        onClick={() => navigate(`/task/${id}`)}
        block
      >
        Решить задание
      </Button>
    </div>
  );
}
