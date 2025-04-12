import React, { ButtonHTMLAttributes } from "react";

import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

const Btn = styled.button`
  background-color: ${Colors.Coffee};
  color: ${Colors.Eggshell};
  padding: 1rem;
  border: none;
  border-radius: 5px;

  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export const DefaultButton = (props: DefaultButtonProps) => {
  const { onClick, children, type = "button", ...otherProps } = props;

  return (
    <Btn onClick={onClick} type={type} {...otherProps}>
      {children}
    </Btn>
  );
};
