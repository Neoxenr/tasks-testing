// React
import React, { ReactElement, useMemo } from 'react';

// Router
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';

// MobX
import { observer } from 'mobx-react-lite';

// Stores
import tasksStore from 'stores/TasksStore';

// Types
import { TaskEditDto } from 'types/dto/task';
import { Task } from 'types/entity/task';

// Components
import Form from 'components/Form/Form';

function EditTask(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const { id } = useParams();

  const task: Task | undefined = useMemo(() => tasksStore.getTask(id), [id]);

  const editTask = (dto: TaskEditDto) => {
    tasksStore.editTask(id, dto);

    navigate('/');
  };

  return (
    <Form
      taskInitialValues={task}
      submitBtnText="Сохранить изменения"
      onFinish={editTask}
    />
  );
}

export default observer(EditTask);
