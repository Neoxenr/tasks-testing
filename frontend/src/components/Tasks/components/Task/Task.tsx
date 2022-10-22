/* eslint-disable no-nested-ternary */
import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, Form, Input, Spin
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { TaskVerifyDto } from '../../../../common/dto';
import { TaskEntity } from '../../../../common/entity';

import './style.css';

export function Task(): ReactElement {
  const { id } = useParams();

  const [taskRequest, setTaskRequest] = useState<{
    task: TaskEntity | null;
    isLoading: boolean;
  }>({ task: null, isLoading: true });

  const [taskVerifyRequest, setTaskVerifyRequest] = useState<{
    verifyResult: { success: boolean } | null;
    isChecking: boolean;
  }>({ verifyResult: null, isChecking: false });

  const { task, isLoading } = taskRequest;
  const { verifyResult, isChecking } = taskVerifyRequest;

  const handleOnFinish = async (formData: any) => {
    setTaskVerifyRequest({ verifyResult: null, isChecking: true });

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
      } as TaskVerifyDto),
    })
      .then((response) => response.json())
      .then((json) => setTaskVerifyRequest({ verifyResult: json, isChecking: false }));
  };

  useEffect(() => {
    fetch(`http://localhost:8080/task/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((json) => setTaskRequest({ task: json, isLoading: false }));
  }, [id]);

  return isLoading ? (
    <Spin
      className="spinner"
      indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
    />
  ) : (
    <div className="task">
      <h3 className="task__title">{task ? task.title : ''}</h3>
      <p className="task__description">{task ? task.description : ''}</p>
      <Form
        className="task__solution-form"
        name="solution"
        layout="vertical"
        onFinish={handleOnFinish}
      >
        <Form.Item
          label="Решение"
          name="solutionCode"
          initialValue={task ? task.mainCode : ''}
        >
          <Input.TextArea
            style={{ height: 400 }}
            allowClear
            placeholder="Ваше решение"
          />
        </Form.Item>
        <Form.Item>
          {verifyResult === null ? (
            <Button
              className="task__submit-btn"
              type="primary"
              htmlType="submit"
              loading={isChecking}
              block
            >
              Проверить задание
            </Button>
          ) : verifyResult.success ? (
            <div>good</div>
          ) : (
            <div>not good</div>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
