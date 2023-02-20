// React
import React, { ReactElement } from 'react';

// Router
import { useNavigate, NavigateFunction } from 'react-router-dom';

// MobX
import { observer } from 'mobx-react-lite';

// Antd
import { Form, Input, Select, Button } from 'antd';

// CodeMirror
import CodeMirror from '@uiw/react-codemirror';

// Language extensions
import { extensions } from 'config/extensions';

// Stores
import tasksStore from 'stores/TasksStore';

// Types
import { TaskCreateDto } from 'types/dto/task';

// SCSS
import styles from './Editor.module.scss';

function Editor(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const handleOnFinish = (task: TaskCreateDto): void => {
    tasksStore.addTask(task);

    navigate('/');
  };

  return (
    <Form
      name="editor"
      className={styles.editor}
      layout="vertical"
      initialValues={{ language: 'JS' }}
      onFinish={handleOnFinish}
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
          <Select.Option value="Java">Java</Select.Option>
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
        className={styles.code}
        label="Ответ"
        name="mainCode"
        initialValue="function isPalindrome(str) { for (let i = 0; i < str.length / 2; i++) { if (str.charAt(i) != str.charAt(str.length - i - 1)) { return false; } } return true; }

    module.exports = isPalindrome;"
        rules={[{ required: true, message: 'Пропущен ответ' }]}
      >
        <CodeMirror
          height="400px"
          extensions={[extensions.JS]}
          placeholder="Код для ответа"
        />
      </Form.Item>
      <Form.Item
        className={styles.code}
        label="Тесты"
        name="testCode"
        initialValue="var isPalindrome = require('./index');

    describe('String should be a palindrome', () => {
      it('Test 1', () => {
        const str = '11211';

        expect(isPalindrome(str)).toBeTruthy();
      });
      it('Test 2', () => {
        const str = 'abcghgcba';

        expect(isPalindrome(str)).toBeTruthy();
      });
      it('Test 3', () => {
        const str = '';

        expect(isPalindrome(str)).toBeTruthy();
      });
    });

    describe('String shouldnt be a palindrome', () => {
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
      });
    });
    "
        rules={[{ required: true, message: 'Пропущен код для тестов' }]}
      >
        <CodeMirror
          height="400px"
          extensions={[extensions.JS]}
          placeholder="Код для тестов"
        />
      </Form.Item>
      <Form.Item>
        <Button className={styles.btn} type="primary" htmlType="submit">
          Создать задание
        </Button>
      </Form.Item>
    </Form>
  );
}

export default observer(Editor);
