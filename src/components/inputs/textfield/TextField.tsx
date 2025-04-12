"use client";


import { observer } from "mobx-react-lite";
import React, { ChangeEventHandler } from "react";
import PhoneInput from "react-phone-input-2";

import { DefaultInput } from "../DefaultInput";

export type TextFieldProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;

  required?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
};

export const TextField = observer((props: TextFieldProps) => {
  const {
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    fullWidth = false,
  } = props;

  return (
    <React.Fragment>
      <DefaultInput
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={fullWidth ? "fullWidth" : ""}
      />
    </React.Fragment>
  );
});
