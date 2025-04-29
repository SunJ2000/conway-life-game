import React from "react";
import "./style.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
}
const Button = (
  props: ButtonProps
) => {
  const { children, ...rest } = props;
  return (
    <button className="Button" type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
