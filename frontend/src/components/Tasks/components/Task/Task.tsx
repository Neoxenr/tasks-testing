import { Button, Form, Input } from 'antd';
import React, { ReactElement } from 'react';
import { TaskEntity } from '../../../../common/entity';

export function Task({
  title,
  description,
  mainCode,
}: TaskEntity): ReactElement {
  return (
    <div className="task">
      <h3 className="task__title">{title}</h3>
      <p className="task__description">{description}</p>
      <Form className="task__solution-form" name="solution" layout="vertical">
        <Form.Item
          label="Решение"
          name="solutionCode"
          initialValue={mainCode}
        >
          <Input.TextArea
            allowClear
            placeholder="Ваше решение"
            autoSize={{ minRows: 10, maxRows: 10 }}
          />
        </Form.Item>
        <Form.Item>
          <Button className="task__submit-btn" type="primary" htmlType="submit" block>
            Проверить задание
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
