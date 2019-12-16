import { ReactNode } from 'react';

export interface ItemsProps {
  items?: Array<ItemsProps>;
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  items: Array<ItemsProps>;
  visible?: boolean;
  prefixCls?: string;
  onVisibleChange?: (visible: boolean) => void;
  children: ReactNode;
}

export interface IMainContext {
  getClass: (...args: Array<string>) => string;
}
