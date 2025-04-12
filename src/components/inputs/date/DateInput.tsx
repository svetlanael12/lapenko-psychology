"use client";
import { InputHTMLAttributes } from "react";

import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

import { DefaultInput } from "../DefaultInput";

export type DateInputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

export const DateInput = (props: DateInputProps) => {
  const { type = "date", fullWidth, ...otherProps } = props;

  return (
    <DefaultInput
      type={type}
      {...otherProps}
      className={fullWidth ? "fullWidth" : ""}
    />
  );
};
