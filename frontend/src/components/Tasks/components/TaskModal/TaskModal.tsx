// React
import React, { ReactElement, useEffect, useState } from 'react';

// Antd
import { Modal, Result } from 'antd';

// Props
import { TaskModalProps } from '../../../../common/props';

export function TaskModal({ isOpened, children }: TaskModalProps): ReactElement {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleOk = () => setIsModalOpened(false);
  const handleCancel = () => setIsModalOpened(false);

  useEffect(() => {
    setIsModalOpened(isOpened);
  }, [isOpened]);

  return (
    <Modal title="Результаты проверки" visible={isModalOpened} onOk={handleOk} onCancel={handleCancel}>
      {/* <Result
        status={isModalOpened ? 'success' : 'error'}
        title={
          isModalOpened ? 'Все тесты успешно пройдены' : 'Тесты не пройдены'
        }
        icon={null}
      /> */}
      {children}
    </Modal>
  );
}
