import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskEntity } from '../../common/entity';
import { setTasks } from '../../store/slices';
import { AppDispatch, RootState } from '../../store/store';

import './style.css';

import { Task } from './components';

export function Tasks(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const tasks: TaskEntity[] = useSelector(
    (state: RootState) => state.taskReducer.tasks,
  );

  useEffect(() => {
    fetch('http://localhost:8080/task', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(setTasks(json));
      });
  }, [dispatch]);

  return (
    <div className="task-container">
      {tasks.map((task: TaskEntity) => (
        <Task
          id={task.id}
          key={task.id}
          title={task.title}
          description={task.description}
          mainCode={task.mainCode}
        />
      ))}
    </div>
  );
}
