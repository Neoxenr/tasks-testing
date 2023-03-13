// React
import React, { ReactElement, useState } from 'react';

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
import { Languages } from 'types/languages';

// Components
import Code from 'components/Code/Code';

// SCSS
import styles from './Editor.module.scss';

function Editor(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const [form] = Form.useForm();

  const [language, setLanguage] = useState<Languages>('JS');

  const selectLanguage = (lang: Languages): void => {
    setLanguage(lang);
  };

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
      initialValues={{ language }}
      onFinish={handleOnFinish}
    >
      <Form.Item label="Наименование" name="title">
        <Input placeholder="Название задания" />
      </Form.Item>
      <Form.Item label="Описание" name="description">
        <Input.TextArea
          style={{ height: 120 }}
          allowClear
          placeholder="Описание задания"
        />
      </Form.Item>
      <Form.Item label="Выберите язык программирования" name="language">
        <Select onSelect={selectLanguage}>
          <Select.Option value="JS">JS</Select.Option>
          <Select.Option value="Python">Python</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Docker-образ"
        name="dockerImageName"
        rules={[{ required: true, message: 'Не указан Docker-образ' }]}
      >
        <Input placeholder="Название образа" />
      </Form.Item>
      <Form.Item
        label="Название файла для ответа"
        name="mainFileName"
        rules={[{ required: true, message: 'Не указано название файла' }]}
      >
        <Input placeholder="Название файла для ответа" />
      </Form.Item>
      <Code
        language={language}
        value=""
        label="Ответ"
        name="mainCode"
        ruleMessage="Пропущен ответ"
        placeholder="Код для ответа"
        callback={form.setFieldValue}
      />
      <Form.Item
        label="Название файла для тестов"
        name="testFileName"
        rules={[{ required: true, message: 'Не указано название файла' }]}
      >
        <Input placeholder="Название файла для тестов" />
      </Form.Item>
      <Code
        language={language}
        value=""
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
