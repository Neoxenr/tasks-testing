// React
import React, { ReactElement, useMemo, useState } from 'react';

// React router
import { useParams } from 'react-router-dom';

// MobX
import { observer } from 'mobx-react-lite';

// CodeMirror
import CodeMirror from '@uiw/react-codemirror';

// Language extensions
import { extensions } from 'config/extensions';

// Antd
import { Button, Form } from 'antd';

// Stores
import tasksStore from 'stores/TasksStore';

// DTOs
import {
  VerificationRequestDto,
  VerificationResponseDto
} from 'types/dto/verification';

// Entities
import { Task as TaskType } from 'types/entity/task';
import { Verification } from 'types/entity/verification';

// Components
import TaskModal from 'components/TaskModal/TaskModal';

// Config
import envs from '../../config/environments';

// SCSS
import styles from './Task.module.scss';

function Task(): ReactElement {
  const { id } = useParams();

  const [verification, setVerification] = useState<VerificationResponseDto>({
    result: null,
    isLoading: false
  });

  const task: TaskType | undefined = useMemo(
    () => tasksStore.getTask(id),
    [id]
  );

  const { result, isLoading } = verification;

  const handleOnFinish = ({
    solutionCode
  }: Pick<VerificationRequestDto, 'solutionCode'>): void => {
    setVerification({ result: null, isLoading: true });

    fetch(`${envs.baseApiUrl}/verify`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        solutionCode,
        language: task?.language,
        testCode: task?.testCode,
        dockerImageName: task?.dockerImageName
      })
    })
      .then((response) => response.json())
      .then((json: Verification) => {
        setVerification({ result: json, isLoading: false });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{task?.title}</h2>
      <p className={styles.description}>{task?.description}</p>
      <Form
        className={styles.solution}
        onFinish={handleOnFinish}
        name="solution"
        layout="vertical"
      >
        <Form.Item
          className={styles.code}
          label="Решение"
          name="solutionCode"
          initialValue={task?.mainCode}
        >
          <CodeMirror
            height="400px"
            extensions={[extensions.JS]}
            placeholder="Ваше решение"
          />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Проверить задание
          </Button>
        </Form.Item>
      </Form>
      <TaskModal isOpen={result !== null}>
        <div>{`PASSED: ${result?.passed.toString()}`}</div>
        <div>{`OUTPUT: ${result?.output}`}</div>
        <div>{`RESULT: ${result?.result}`}</div>
        <div>{`STATUS: ${result?.status}`}</div>
      </TaskModal>
    </div>
  );
}

export default observer(Task);
