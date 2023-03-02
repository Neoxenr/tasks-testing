// React
import React, { ReactElement } from 'react';

// Router
import { useNavigate, NavigateFunction } from 'react-router-dom';

// MobX
import { observer } from 'mobx-react-lite';

// Antd
import { Form, Input, Select, Button } from 'antd';

// Stores
import tasksStore from 'stores/TasksStore';

// Types
import { TaskCreateDto } from 'types/dto/task';

// Components
import Code from 'components/Code/Code';

// SCSS
import styles from './Editor.module.scss';

function Editor(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const [form] = Form.useForm();

  const handleOnFinish = (task: TaskCreateDto): void => {
    tasksStore.addTask(task);

    navigate('/');
  };

  return (
    <Form
      form={form}
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
      <Code
        value="export function isPalindrome(str) {for (let i = 0; i < str.length / 2; i++) { if (str.charAt(i) != str.charAt(str.length - i - 1)) {return false;}}return true;}"
        label="Ответ"
        name="mainCode"
        ruleMessage="Пропущен ответ"
        placeholder="Код для ответа"
        callback={form.setFieldValue}
      />
      <Code
        value="import assert from 'assert'; import {    isPalindrome} from './index.js';describe('String should be a palindrome', () => {    it('Test 1', () => {        const str = '11211';        assert.ok(isPalindrome(str));    });    it('Test 2', () => {        const str = 'abcghgcba';        assert.ok(isPalindrome(str));    });    it('Test 3', () => {        const str = '';        assert.ok(isPalindrome(str));    });});describe('String shouldnt be a palindrome', () => {    it('Test 1', () => {        const str = '123456';        assert(isPalindrome(str) === false);    });    it('Test 2', () => {        const str = 'abaaabbb';        assert(isPalindrome(str) === false);    });    it('Test 3', () => {        const str = 'adsadadadaaaadaddad';        assert(isPalindrome(str) === false);    });});"
        label="Тесты"
        name="testCode"
        ruleMessage="Пропущен код для тестов"
        placeholder="Код для тестов"
        callback={form.setFieldValue}
      />
      <Form.Item>
        <Button className={styles.btn} type="primary" htmlType="submit">
          Создать задание
        </Button>
      </Form.Item>
    </Form>
  );
}

export default observer(Editor);
