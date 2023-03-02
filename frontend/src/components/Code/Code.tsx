// React
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

// Formatting
import jsBeautify from 'js-beautify';

// CodeMirror
import CodeMirror from '@uiw/react-codemirror';

// Antd
import { Form, Button, Tooltip } from 'antd';

// Antd icons
import { CodeOutlined } from '@ant-design/icons';

// Language extensions
import { extensions } from 'config/extensions';

// SCSS
import styles from './Code.module.scss';

interface CodeProps {
  value: string;
  label: string;
  name: string;
  placeholder: string;
  ruleMessage: string;
  callback: any;
}

function Code({
  value,
  label,
  name,
  placeholder,
  ruleMessage,
  callback
}: CodeProps): ReactElement {
  const [code, setCode] = useState<string>('');

  const valueMemo = useMemo(() => jsBeautify(value), [value]);

  const handleOnClick = (): void => {
    callback(name, jsBeautify(code));
  };

  useEffect(() => {
    setCode(valueMemo);
  }, [value]);

  return (
    <div className={styles.code}>
      <Tooltip title="Отформатировать код">
        <Button
          className={styles.formatBtn}
          type="primary"
          icon={<CodeOutlined />}
          onClick={handleOnClick}
        />
      </Tooltip>
      <Form.Item
        className={styles.codeField}
        label={label}
        name={name}
        initialValue={valueMemo}
        rules={[{ required: true, message: ruleMessage }]}
      >
        <CodeMirror
          onChange={(newCode: string) => setCode(newCode)}
          value={code}
          height="400px"
          extensions={[extensions.JS]}
          placeholder={placeholder}
        />
      </Form.Item>
    </div>
  );
}

export default Code;
