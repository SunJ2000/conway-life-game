import React from "react";
import "./style.css";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
}
const Button = (
  props: ButtonProps | React.ButtonHTMLAttributes<HTMLElement>
) => {
  const { children, ...rest } = props;
  return (
    <button className="Button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
