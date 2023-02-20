import { ReactNode } from 'react';

export interface TaskProps {
  id: string;
  title: string;
  language: string;
  description: string;
}

export interface TaskModalProps {
  isOpen: boolean;
  children?: ReactNode[];
}
