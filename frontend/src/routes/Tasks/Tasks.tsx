// React
import React, { ReactElement } from 'react';

// Router
import { useNavigate, NavigateFunction } from 'react-router-dom';

// MobX
import { observer } from 'mobx-react-lite';

// Antd
import { Button, Empty } from 'antd';

// Stores
import tasksStore from 'stores/TasksStore';

// Entities
import { Task as TaskEntity } from 'types/entity/task';

// Components
import Task from 'components/Task/Task';

// SCSS
import styles from './Tasks.module.scss';

function Tasks(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const { tasks } = tasksStore;

  return (
    <div className={styles.page}>
      <Button
        className={styles.btn}
        type="primary"
        htmlType="submit"
        onClick={() => navigate('/editor')}
      >
        Создать задание
      </Button>
      {tasks.length ? (
        <div className={styles.tasks}>
          {tasks.map((item: TaskEntity) => (
            <Task
              key={item.id}
              id={item.id}
              title={item.title}
              language={item.language}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <Empty className={styles.empty} description="Задачи отсутствуют" />
      )}
    </div>
  );
}

export default observer(Tasks);
