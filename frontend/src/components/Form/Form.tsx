// React
import React, { ReactElement, useState } from 'react';

// Antd
import { Form as FormAntd, Input, Select, Button } from 'antd';

// Types
import { Languages } from 'types/languages';
import { TaskCreateDto } from 'types/dto/task';
import { Task } from 'types/entity/task';

// Components
import Code from 'components/Code/Code';

// SCSS
import styles from './Form.module.scss';

interface FormProps {
  taskInitialValues: Partial<Task>;
  submitBtnText: string;
  onFinish: (task: TaskCreateDto) => void;
}

function Form({
  taskInitialValues,
  submitBtnText,
  onFinish
}: FormProps): ReactElement {
  const [form] = FormAntd.useForm();

  const {
    title,
    description,
    language,
    dockerImageName,
    dockerMountingDirectoryName,
    mainFileName,
    mainCode,
    testFileName,
    testCode
  } = taskInitialValues;

  const [taskLanguage, setTaskLanguage] = useState<Languages>(language ?? 'JS');

  const selectLanguage = (lang: Languages): void => {
    setTaskLanguage(lang);
  };

  return (
    <FormAntd
      form={form}
      name="editor"
      className={styles.form}
      layout="vertical"
      initialValues={{
        title,
        language,
        description,
        dockerImageName,
        dockerMountingDirectoryName,
        mainFileName,
        testFileName
      }}
      onFinish={onFinish}
    >
      <FormAntd.Item label="Наименование" name="title">
        <Input placeholder="Название задания" />
      </FormAntd.Item>
      <FormAntd.Item label="Описание" name="description">
        <Input.TextArea
          style={{ height: 120 }}
          allowClear
          placeholder="Описание задания"
        />
      </FormAntd.Item>
      <FormAntd.Item label="Выберите язык программирования" name="language">
        <Select onSelect={selectLanguage}>
          <Select.Option value="JS">JS</Select.Option>
          <Select.Option value="Python">Python</Select.Option>
        </Select>
      </FormAntd.Item>
      <FormAntd.Item
        label="Docker-образ"
        name="dockerImageName"
        rules={[{ required: true, message: 'Не указан Docker-образ' }]}
      >
        <Input placeholder="Название образа" />
      </FormAntd.Item>
      <FormAntd.Item
        label="Название папки для монтирования"
        name="dockerMountingDirectoryName"
        rules={[
          {
            required: true,
            message: 'Не указано название папки для монтирования'
          }
        ]}
      >
        <Input placeholder="Название папки для монтирования" />
      </FormAntd.Item>
      <FormAntd.Item
        label="Название файла для ответа"
        name="mainFileName"
        rules={[{ required: true, message: 'Не указано название файла' }]}
      >
        <Input placeholder="Название файла для ответа" />
      </FormAntd.Item>
      <Code
        language={taskLanguage}
        value={mainCode ?? ''}
        label="Ответ"
        name="mainCode"
        ruleMessage="Пропущен ответ"
        placeholder="Код для ответа"
        callback={form.setFieldValue}
      />
      <FormAntd.Item
        label="Название файла для тестов"
        name="testFileName"
        rules={[{ required: true, message: 'Не указано название файла' }]}
      >
        <Input placeholder="Название файла для тестов" />
      </FormAntd.Item>
      <Code
        language={taskLanguage}
        value={testCode ?? ''}
        label="Тесты"
        name="testCode"
        ruleMessage="Пропущен код для тестов"
        placeholder="Код для тестов"
        callback={form.setFieldValue}
      />
      <FormAntd.Item>
        <Button type="primary" htmlType="submit">
          {submitBtnText}
        </Button>
      </FormAntd.Item>
    </FormAntd>
  );
}

export default Form;
