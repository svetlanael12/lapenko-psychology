"use client";

import { Form, useFormikContext } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { TextFieldWithFormik } from "@/components/inputs/textfield/TextFieldWithFormik";
import { Colors } from "@/types/colors";
import { RequestDTO } from "@/types/request";
import styled from "@emotion/styled";

import { AppointmentTime } from "../appointment-time/AppointmentTime";
import { useRequestContext } from "@/hooks/context/useRequestContext";

const BoxGoogleForm = styled.div`
  margin-top: 12px;
  padding: 0.5rem;
  border: 1px solid ${Colors.DefaultText};
  border-radius: 3px;
  width: max-content;

  font-size: 16px;

  cursor: pointer;

  word-wrap: break-word;
  width: 100%;
`;

const InputWrapper = styled.div`
  * {
    font-size: 14px;
  }
`;

export const RequestContentModal = observer(() => {
  const { values, errors } = useFormikContext<RequestDTO>();
  const { createRequest, isLoading } = useRequestContext();

  const isDisabledBtn =
    Boolean(Object.keys(errors).length) ||
    !Boolean(values.firstName) ||
    !Boolean(values.phone) ||
    isLoading;

  return (
    <React.Fragment>
      <div>
        Пожалуйста, внимательно ознакомьтесь с информацией по ссылке ниже перед
        тем, как отправить заявку. Там описаны детали нашего сотрудничества, моя
        квалификация и правила конфиденциальности. Без подписанного согласия
        запись на сеанс не является действительной.
      </div>

      <BoxGoogleForm
        onClick={() => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSef3Ol7k4tjIleUJO4EyMnQZ1Ce0e4qj7MRhd5da9J-FAnNZQ/viewform"
          );
        }}
      >
        Перейти для заполнения формы
      </BoxGoogleForm>
      <Form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: "8px",
          }}
        >
          <InputWrapper>
            <TextFieldWithFormik
              name="firstName"
              placeholder="Ваше ФИО (обязательное поле)"
              fullWidth
            />
          </InputWrapper>

          <TextFieldWithFormik
            name="phone"
            placeholder="Номер телефона"
            fullWidth
            telMask
          />
          <div>
            Вы можете выбрать желаемое время для сеанса из доступных или
            оставить свои контактные данные для связи, чтобы мы подобрали
            удобное время вместе.
          </div>
          <InputWrapper>
            <AppointmentTime />
          </InputWrapper>

          <DefaultButton
            onClick={() => {
              createRequest(values);
            }}
            disabled={isDisabledBtn}
          >
            Отправить заявку
          </DefaultButton>
        </div>
      </Form>
    </React.Fragment>
  );
});
