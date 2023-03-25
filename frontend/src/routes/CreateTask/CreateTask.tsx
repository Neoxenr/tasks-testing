// React
import React, { ReactElement } from 'react';

// Router
import { useNavigate, NavigateFunction } from 'react-router-dom';

// MobX
import { observer } from 'mobx-react-lite';

// Stores
import tasksStore from 'stores/TasksStore';

// Types
import { TaskCreateDto } from 'types/dto/task';

// Components
import Form from 'components/Form/Form';

function CreateTask(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const createTask = (task: TaskCreateDto): void => {
    tasksStore.addTask(task);

    navigate('/');
  };

  return (
    <Form
      taskInitialValues={{ language: 'JS' }}
      submitBtnText="Создать задание"
      onFinish={createTask}
    />
  );
}

export default observer(CreateTask);
