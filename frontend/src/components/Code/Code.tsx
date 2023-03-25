// React
import React, { ReactElement, useEffect, useState } from 'react';

// CodeMirror
import CodeMirror from '@uiw/react-codemirror';

// Antd
import { Form, Button, Tooltip } from 'antd';
import { NamePath } from 'antd/es/form/interface';

// Antd icons
import { CodeOutlined } from '@ant-design/icons';

// Language extensions
import { extensions } from 'config/extensions';

// Types
import { Languages } from 'types/languages';

// SCSS
import styles from './Code.module.scss';

interface CodeProps {
  isChecking?: boolean;
  language: Languages;
  value: string;
  label: string;
  name: string;
  placeholder: string;
  ruleMessage: string;
  callback: (name: NamePath, value: any) => void;
}

function Code({
  isChecking,
  language,
  value,
  label,
  name,
  placeholder,
  ruleMessage,
  callback
}: CodeProps): ReactElement {
  const [code, setCode] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnClick = async (): Promise<void> => {
    setIsLoading(true);

    const { url, field } = extensions[language].formatter;

    let body = null;

    if (field) {
      const formData = new FormData();
      formData.append(field, code);

      body = new URLSearchParams(formData as any);
    } else {
      body = code;
    }

    const response = await fetch(url, {
      body,
      method: 'POST'
    });

    if (response.status < 200 || response.status >= 300) {
      callback(name, code);
    } else {
      const text = await response.text();

      callback(name, text);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setCode(value);
  }, [value]);

  return (
    <div className={styles.code}>
      <Tooltip title="Отформатировать код">
        <Button
          className={styles.formatBtn}
          type="primary"
          icon={<CodeOutlined />}
          onClick={handleOnClick}
          loading={isLoading}
        />
      </Tooltip>
      <Form.Item
        className={styles.codeField}
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: true, message: ruleMessage }]}
      >
        <CodeMirror
          onChange={(newCode: string) => setCode(newCode)}
          value={code}
          height="400px"
          extensions={[extensions[language].lang]}
          placeholder={placeholder}
          readOnly={isLoading || isChecking}
        />
      </Form.Item>
    </div>
  );
}

export default Code;
