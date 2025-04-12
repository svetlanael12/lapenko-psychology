"use client";
import React, { InputHTMLAttributes } from "react";
import styled from "@emotion/styled";

import { DefaultInput } from "../DefaultInput";

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export type TimeInputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  label?: string;
};

export const TimeInput = (props: TimeInputProps) => {
  const { type = "time", fullWidth, label, id, ...otherProps } = props;
  return (
    <React.Fragment>
      {label && <Label htmlFor={id}>{label}</Label>}

      <DefaultInput
        type={type}
        id={id}
        {...otherProps}
        className={fullWidth ? "fullWidth" : ""}
      />
    </React.Fragment>
  );
};
