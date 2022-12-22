// React
import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Antd
import { Button, Form, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// CodeMirror
import CodeMirror from '@uiw/react-codemirror';

// Languages extension
import { languagesExtension } from '../../../../config';

// Dto
import {
  TaskGetRequestDto,
  TaskVerifyRequestDto,
  TaskVerifyResponseDto,
} from '../../../../common/dto';

// Components
import { TaskModal } from '../TaskModal/TaskModal';

// CSS
import './style.css';

export function Task(): ReactElement {
  const { id } = useParams();

  const [taskGetRequest, setGetTaskRequest] = useState<TaskGetRequestDto>({
    task: null,
    isLoading: true,
  });

  const [taskVerifying, setTaskVerifying] = useState<{
    taskVerifyingResponse: TaskVerifyResponseDto | null;
    isLoading: boolean;
  }>({ taskVerifyingResponse: null, isLoading: false });

  const { task, isLoading: isTaskLoading } = taskGetRequest;
  const { taskVerifyingResponse, isLoading: isTaskSolutionVerifying } = taskVerifying;

  const handleOnFinish = async (formData: TaskVerifyRequestDto) => {
    setTaskVerifying({ taskVerifyingResponse: null, isLoading: true });

    fetch(`http://localhost:8080/verify/${task?.userId}/${task?.id}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        ...formData,
        testCode: task?.testCode,
        language: task?.language,
        dockerImageName: task?.dockerImageName,
      } as TaskVerifyRequestDto),
    })
      .then((response) => response.json())
      .then((json) => {
        setTaskVerifying({ taskVerifyingResponse: json, isLoading: false });
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/task/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((json) => setGetTaskRequest({ task: json, isLoading: false }));
  }, [id]);

  return isTaskLoading ? (
    <Spin
      className="spinner"
      indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
    />
  ) : (
    <>
      <div className="task">
        <h3 className="task__title">{task?.title}</h3>
        <p className="task__description">{task?.description}</p>
        <Form
          className="task__solution-form"
          name="solution"
          layout="vertical"
          onFinish={handleOnFinish}
        >
          <Form.Item
            label="Решение"
            name="solutionCode"
            initialValue={task?.mainCode}
          >
            <CodeMirror
              height="400px"
              extensions={[
                languagesExtension[task !== null ? task.language : 'JS'],
              ]}
              placeholder="Ваше решение"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isTaskSolutionVerifying}
            >
              Проверить задание
            </Button>
          </Form.Item>
        </Form>
      </div>
      <TaskModal isOpened={taskVerifyingResponse !== null}>
        <div>{`PASSED: ${taskVerifyingResponse?.passed}`}</div>
        <div>{`OUTPUT: ${taskVerifyingResponse?.output}`}</div>
        <div>{`RESULT: ${taskVerifyingResponse?.result}`}</div>
        <div>{`STATUS: ${taskVerifyingResponse?.status}`}</div>
      </TaskModal>
    </>
  );
}
