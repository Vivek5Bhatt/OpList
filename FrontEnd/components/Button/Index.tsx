import React from "react";
import Button from "react-bootstrap/Button";

interface Ibutton {
  variant?: string;
  btnclass: string;
  disabled?: boolean;
  clickFn?: (e: any) => any;
  children: React.ReactNode;
  type: any;
}

const ButtonComponent = ({
  variant,
  btnclass,
  disabled,
  clickFn,
  children,
  type,
}: Ibutton) => {
  return (
    <>
      <Button
        variant={variant}
        type={type}
        className={btnclass}
        disabled={disabled}
        onClick={clickFn}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonComponent;
