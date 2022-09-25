import React, { ReactElement } from 'react';
import {
  Button, Form, Input, Select, Space
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';

export function Editor(): ReactElement {
  return (
    <Form
      name="editor"
      className="editor"
      layout="vertical"
      initialValues={{ language: 'JavaScript' }}
    >
      <Form.Item label="Наименование" name="name" initialValue="test">
        <Input placeholder="Название задания" />
      </Form.Item>
      <Form.Item label="Описание" name="description" initialValue="test">
        <Input.TextArea
          allowClear
          placeholder="Описание задания"
          autoSize={{ minRows: 4, maxRows: 4 }}
        />
      </Form.Item>
      <Form.Item label="Выберите язык программирования" name="language">
        <Select>
          <Select.Option value="JavaScript">JavaScript</Select.Option>
          <Select.Option value="Python">Python</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Docker-образ"
        name="docker-image"
        initialValue="neoxenr/typescript"
      >
        <Input placeholder="Название образа" />
      </Form.Item>
      <Form.Item
        className="editor__code"
        label="Ответ"
        name="answer"
        initialValue="console.log(123);"
      >
        <Input.TextArea
          showCount
          autoSize={{ minRows: 6, maxRows: 6 }}
          allowClear
          placeholder="Код"
        />
      </Form.Item>
      <Form.List name="tests">
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
                      message: 'Пропущено наименование теста',
                    },
                  ]}
                >
                  <Input placeholder="Наименование теста" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  className="editor__code"
                  rules={[
                    { required: true, message: 'Пропущен код для теста' },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    allowClear
                    autoSize={{ minRows: 6, maxRows: 6 }}
                    placeholder="Код для теста"
                    defaultValue="console.log(123);"
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
      </Form.List>
      <Form.Item>
        <Button
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
