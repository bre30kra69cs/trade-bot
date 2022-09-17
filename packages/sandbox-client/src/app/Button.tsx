import React, {FC, ReactNode, MouseEventHandler} from 'react';

import {cn} from './cn.util';

import './Button.css';

type ButtonProps = {
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: FC<ButtonProps> = ({className, children, onClick}) => {
  return (
    <button className={cn('Button', className)} onClick={onClick}>
      <span className="Text">{children}</span>
    </button>
  );
};
