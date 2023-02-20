// React
import React, { ReactElement, useEffect, useState } from 'react';

// Antd
import { Modal } from 'antd';

// Props
import { TaskModalProps } from 'types/props/task';

function TaskModal({ isOpen, children }: TaskModalProps): ReactElement {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleOk = () => setIsModalOpened(false);
  const handleCancel = () => setIsModalOpened(false);

  useEffect(() => {
    setIsModalOpened(isOpen);
  }, [isOpen]);

  return (
    <Modal
      title="Результаты проверки"
      open={isModalOpened}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
}

export default TaskModal;
