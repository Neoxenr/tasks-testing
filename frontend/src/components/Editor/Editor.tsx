import React, { ReactElement, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select
} from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addTask } from '../../store/slices';
import { TaskDto } from '../../common/dto';

import './style.css';

export function Editor(): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleOnFish = async (formData: any) => {
    setIsLoading(true);
    fetch('http://localhost:8080/task', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        ...formData,
        userId: 'd577e0e8-877b-482f-a7ee-fca43e14aff6',
      } as TaskDto),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        dispatch(addTask(json));
        navigate('/');
      });
  };

  return (
    <Form
      name="editor"
      className="editor"
      layout="vertical"
      initialValues={{ language: 'JS' }}
      onFinish={handleOnFish}
    >
      <Form.Item
        label="Наименование"
        name="title"
        initialValue="Title for test task"
      >
        <Input placeholder="Название задания" />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        initialValue="Description for test task"
      >
        <Input.TextArea
          style={{ height: 120 }}
          allowClear
          placeholder="Описание задания"
        />
      </Form.Item>
      <Form.Item label="Выберите язык программирования" name="language">
        <Select>
          <Select.Option value="JS">JS</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Docker-образ"
        name="dockerImageName"
        initialValue="neoxenr/js"
        rules={[{ required: true, message: 'Не указан Docker-образ' }]}
      >
        <Input placeholder="Название образа" />
      </Form.Item>
      <Form.Item
        className="editor__code"
        label="Ответ"
        name="mainCode"
        initialValue="function isPalindrome(str) { for (let i = 0; i < str.length / 2; i++) { if (str.charAt(i) != str.charAt(str.length - i - 1)) { return false; } } return true; }

        module.exports = isPalindrome;"
        rules={[{ required: true, message: 'Пропущен ответ' }]}
      >
        <Input.TextArea style={{ height: 200 }} allowClear placeholder="Код" />
      </Form.Item>
      <Form.Item
        label="Тесты"
        className="editor__code"
        name="testCode"
        initialValue="var isPalindrome = require('./index');

        describe('String should be a palindrome', () => {
          it('Test 1', () => {
            const str = '11211';

            expect(isPalindrome(str)).toBeTruthy();
          })
          it('Test 2', () => {
            const str = 'abcghgcba';

            expect(isPalindrome(str)).toBeTruthy();
          });
          it('Test 3', () => {
            const str = '';

            expect(isPalindrome(str)).toBeTruthy();
          });
        });

        describe('String shouldn't be a palindrome', () => {
          it('Test 1', () => {
            const str = '123456';

            expect(isPalindrome(str)).toBeFalsy();
          });
          it('Test 2', () => {
            const str = 'abaaabbb';

            expect(isPalindrome(str)).toBeFalsy();
          });
          it('Test 3', () => {
            const str = 'adsadadadaaaadaddad';

            expect(isPalindrome(str)).toBeFalsy();
          })
        });
        "
        rules={[{ required: true, message: 'Пропущен код для тестов' }]}
      >
        <Input.TextArea
          style={{ height: 200 }}
          allowClear
          placeholder="Код для тестов"
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          className="editor__submit-btn"
          type="primary"
          htmlType="submit"
          block
        >
          Создать задание
        </Button>
      </Form.Item>
    </Form>
  );
}
