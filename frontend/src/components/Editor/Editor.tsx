import React, { ReactElement, useState } from 'react';
import {
  Button, Form, Input, Select
} from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

import './style.css';
import { addTask } from '../../store/slices';

export function Editor(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      name="editor"
      className="editor"
      layout="vertical"
      initialValues={{ language: 'JS' }}
      onFinish={(formData) => {
        setIsLoading(true);
        fetch('http://localhost:8080/task', {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            userId: 'd577e0e8-877b-482f-a7ee-fca43e14aff6',
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            setIsLoading(false);
            dispatch(addTask(json));
          });
      }}
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
          allowClear
          placeholder="Описание задания"
          autoSize={{ minRows: 4, maxRows: 4 }}
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
        initialValue="neoxenr/typescript"
        rules={[{ required: true, message: 'Не указан Docker-образ' }]}
      >
        <Input placeholder="Название образа" />
      </Form.Item>
      <Form.Item
        className="editor__code"
        label="Ответ"
        name="mainCode"
        initialValue="export function isPalindrome(str) { /* Ваш ответ */ }"
        rules={[{ required: true, message: 'Пропущен ответ' }]}
      >
        <Input.TextArea
          showCount
          autoSize={{ minRows: 6, maxRows: 6 }}
          allowClear
          placeholder="Код"
        />
      </Form.Item>
      <Form.Item
        label="Тесты"
        className="editor__code"
        name="testCode"
        initialValue="describe('String should be a palindrome', () => {
          it('Test 1', () => {
            const str: string = '11211';

            expect(isPalindrome(str)).toBeTruthy();
          })
          it('Test 2', () => {
            const str: string = 'abcghgcba';

            expect(isPalindrome(str)).toBeTruthy();
          });
          it('Test 3', () => {
            const str: string = '';

            expect(isPalindrome(str)).toBeTruthy();
          });
        });

        describe('String shouldn't be a palindrome', () => {
          it('Test 1', () => {
            const str: string = '123456';

            expect(isPalindrome(str)).toBeFalsy();
          });
          it('Test 2', () => {
            const str: string = 'abaaabbb';

            expect(isPalindrome(str)).toBeFalsy();
          });
          it('Test 3', () => {
            const str: string = 'adsadadadaaaadaddad';

            expect(isPalindrome(str)).toBeFalsy();
          })
        });
        "
        rules={[{ required: true, message: 'Пропущен код для тестов' }]}
      >
        <Input.TextArea
          showCount
          allowClear
          autoSize={{ minRows: 6, maxRows: 6 }}
          placeholder="Код для тестов"
        />
      </Form.Item>
      {/* <Form.List name="tests">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'normal',
                }}
              >
                <Form.Item
                  {...restField}
                  initialValue="test"
                  name={[name, 'name']}
                  rules={[
                    {
                      required: true,
                      message: 'Пропущено наименование группы тестов',
                    },
                  ]}
                >
                  <Input placeholder="Наименование группы тестов" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  className="editor__code"
                  rules={[
                    { required: true, message: 'Пропущен код для тестов' },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    allowClear
                    autoSize={{ minRows: 6, maxRows: 6 }}
                    placeholder="Код для тестов"
                    defaultValue="it('test 1', () => {
                      const str: string = '11211';

                      expect(isPalindrome(str)).toBeTruthy();
                    })
                  "
                  />
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Form.Item>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Добавить тест
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List> */}
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
