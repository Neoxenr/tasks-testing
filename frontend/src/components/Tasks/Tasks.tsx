import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Button, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { TaskEntity } from '../../common/entity';
import { setTasks } from '../../store/slices';
import { AppDispatch, RootState } from '../../store/store';

import { TaskPreview } from './components';

import './style.css';

export function Tasks(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const tasks: TaskEntity[] = useSelector(
    (state: RootState) => state.taskReducer.tasks,
  );

  useEffect(() => {
    fetch('http://localhost:8080/task', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(setTasks(json));
        setIsLoading(false);
      });
  }, [dispatch]);

  return isLoading ? (
    <Spin
      className="spinner"
      indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
    />
  ) : (
    <div className="task-container">
      <Space className="task-container__btn-group btn-group">
        <Button
          className="btn-group__item"
          type="primary"
          htmlType="submit"
          onClick={() => navigate('/editor')}
        >
          Создать задание
        </Button>
      </Space>
      {tasks.map((task: TaskEntity) => (
        <TaskPreview
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
}
