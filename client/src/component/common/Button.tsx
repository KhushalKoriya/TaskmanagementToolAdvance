import React, { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  color: string;
  children?: ReactNode; 
}

const Button: React.FC<ButtonProps> = ({ onClick, text, color, children }) => {
  return (
    <button className={`btn btn-${color} mx-2`} onClick={onClick}>
      {children || text} 
    </button>
  );
};

export default Button;
