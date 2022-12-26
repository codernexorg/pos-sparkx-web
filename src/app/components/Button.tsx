import { Spin } from 'antd';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button
      disabled={loading}
      className='px-4 py-1 w-[140px] border border-slate-800'
      {...props}
    >
      {loading ? <Spin /> : null}
      {children}
    </button>
  );
};

export default Button;
