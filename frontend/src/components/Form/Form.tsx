import React, { ReactElement, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  Button, Col, Form, Input, Modal, Result, Row
} from 'antd';

import { BranchesOutlined, GithubOutlined } from '@ant-design/icons';

import './style.css';

export type VerifyDto = {
  repository: string;
  branch: string;
};

export function CheckoutForm(): ReactElement {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [isLogging, setIsChecking] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOnFinish = async (data: VerifyDto): Promise<void> => {
    setIsChecking(true);
    await fetch('http://localhost:8080/', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response: any) => setIsPassed(response))
      .then(() => setIsChecking(false))
      .then(() => setIsModalVisible(true));
  };

  const handleOnClick = async (): Promise<void> => {
    setIsModalVisible(false);
    setIsPassed(false);
    setIsChecking(false);

    navigate('/result');
  };

  useEffect(() => {
    form.setFieldsValue({
      repository: 'https://gitlab.com/graduate-work2/code-example.git',
      branch: 'test-task',
    });
  }, []);

  return (
    <Row
      itemType="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col className="test-form-wrapper">
        <Form
          form={form}
          name="test"
          layout="vertical"
          className="test-form"
          initialValues={{ remember: true }}
          onFinish={handleOnFinish}
        >
          <Form.Item className="test-form__task" label="Задание">
            По строке определите, является ли она палиндромом (то есть верно ли,
            что она одинаково читается слева направо и справа налево)
          </Form.Item>
          <Form.Item
            name="repository"
            rules={[{ required: true, message: 'Введите URL репозитория' }]}
          >
            <Input
              prefix={<GithubOutlined className="site-form-item-icon" />}
              placeholder="Ссылка на репозиторий"
            />
          </Form.Item>
          <Form.Item
            name="branch"
            rules={[{ required: true, message: 'Введите название ветки' }]}
          >
            <Input
              prefix={<BranchesOutlined className="site-form-item-icon" />}
              placeholder="Название ветки"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLogging}
              type="primary"
              htmlType="submit"
              className="test-form__button"
            >
              Проверить
            </Button>
          </Form.Item>
        </Form>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Result
            status={isPassed ? 'success' : 'error'}
            title="Тесты успешно пройдены"
            extra={[
              <Button onClick={handleOnClick} type="primary" key="console">
                Результаты
              </Button>,
            ]}
          />
        </Modal>
      </Col>
    </Row>
  );
}
