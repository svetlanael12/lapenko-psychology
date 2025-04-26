"use client";
import { observer } from "mobx-react-lite";
import React from "react";

import { PhoneIcon } from "@/assets/svg/PhoneIcon";
import { TelegrammIcon } from "@/assets/svg/TelegrammIcon";
import { WhatsappIcon } from "@/assets/svg/WhatsappIcon";
import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

import { TitleH2 } from "../ui/titles/Title";
import { ContainerContent } from "../containers/content/ContainerContent";

const Container = styled.footer`
  width: 100%;
  background-color: ${Colors.Coffee};
  color: ${Colors.Eggshell};

  padding: 20px;

  a {
    color: inherit;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

export const Footer = observer(() => {
  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  const telegramLink = `https://t.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  const phoneLink = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;

  return (
    <Container id="contacts">
      <ContainerContent>
        <TitleH2>Связаться со мной</TitleH2>

        <a href={whatsappLink} target="_blank">
          <WhatsappIcon /> WhatsApp
        </a>
        <a href={telegramLink} target="_blank">
          <TelegrammIcon /> Telegram
        </a>
        <a href={phoneLink} target="_blank">
          <PhoneIcon />
          {process.env.NEXT_PUBLIC_PHONE_NUMBER}
        </a>
      </ContainerContent>
    </Container>
  );
});
