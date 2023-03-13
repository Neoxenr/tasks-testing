// React
import React, { ReactElement } from 'react';

// Router
import { useNavigate, NavigateFunction } from 'react-router-dom';

// Antd components
import { Button, Tag } from 'antd';

// Antd icons
import { CloseOutlined } from '@ant-design/icons';

// Config
import { TAG_COLORS } from 'config/tag-colors';

// Stores
import tasksStore from 'stores/TasksStore';

// Props
import { TaskProps } from 'types/props/task';

// SCSS
import styles from './Task.module.scss';

function Task({ id, title, language, description }: TaskProps): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const handleOnClick = (): void => {
    tasksStore.removeTask(id);
  };

  return (
    <div className={styles.task}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title ?? 'Без названия'}</h3>
        <div className={styles.btnGroup}>
          <Tag className={styles.tag} color={TAG_COLORS[language]}>
            {language}
          </Tag>
          <Button
            type="primary"
            icon={<CloseOutlined />}
            onClick={handleOnClick}
          />
        </div>
      </div>
      <p className={styles.description}>
        {description ?? 'Описание отсутствует'}
      </p>
      <Button
        className={styles.btn}
        type="primary"
        htmlType="submit"
        onClick={() => navigate(`/tasks/${id}`)}
        block
      >
        Решить задание
      </Button>
    </div>
  );
}

export default Task;
