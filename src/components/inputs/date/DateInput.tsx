"use client";
import { InputHTMLAttributes, useEffect, useRef } from "react";

import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

import { DefaultInput } from "../DefaultInput";

export type DateInputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

export const DateInput = (props: DateInputProps) => {
  const { type = "date", fullWidth, ...otherProps } = props;

  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateRef.current) {
      const today = new Date().toISOString().split("T")[0];
      dateRef.current.min = today;
    }
  }, []);

  return (
    <DefaultInput
      ref={dateRef}
      type={type}
      {...otherProps}
      className={fullWidth ? "fullWidth" : ""}
    />
  );
};
