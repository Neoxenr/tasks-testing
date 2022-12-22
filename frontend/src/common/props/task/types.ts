import { ReactNode } from 'react';

export type TaskPreviewProps = {
  id: string;
  title: string;
  description: string;
};

export type TaskModalProps = {
  isOpened: boolean;
  children?: ReactNode | ReactNode[];
};
