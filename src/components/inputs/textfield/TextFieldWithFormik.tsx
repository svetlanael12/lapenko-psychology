"use client";
import { useField } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import PhoneInput from "react-phone-input-2";

import { TextField, TextFieldProps } from "./TextField";

export type TextFieldWithFormikProps = Omit<
  TextFieldProps,
  "value" | "onChange"
> & {
  telMask?: boolean;
};

export const TextFieldWithFormik = observer(
  (props: TextFieldWithFormikProps) => {
    const { name, telMask, ...otherProps } = props;
    const [field, meta, helper] = useField(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      helper.setValue(e.target.value);
    };

    const handleChangePhone = (value: string) => {
      helper.setValue(value);
    };

    return (
      <React.Fragment>
        {telMask ? (
          <PhoneInput
            inputStyle={{ width: "100%", padding: "22px 22px 22px 48px" }}
            country={"ru"}
            value={field.value}
            onChange={handleChangePhone}
            countryCodeEditable={false}
            disableDropdown
          />
        ) : (
          <TextField
            name={name}
            value={field.value}
            onChange={handleChange}
            {...otherProps}
          />
        )}
      </React.Fragment>
    );
  }
);
