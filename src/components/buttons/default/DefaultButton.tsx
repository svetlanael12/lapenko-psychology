import React from "react";

import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

const Btn = styled.button`
  background-color: ${Colors.Coffee};
  color: ${Colors.Eggshell};
  padding: 1rem;
  border: none;
  border-radius: 5px;

  cursor: pointer;
`;

export type DefaultButtonProps = {
  onClick: VoidFunction;
  children: React.ReactNode;
};

export const DefaultButton = (props: DefaultButtonProps) => {
  const { onClick, children } = props;

  return <Btn onClick={onClick}>{children}</Btn>;
};
