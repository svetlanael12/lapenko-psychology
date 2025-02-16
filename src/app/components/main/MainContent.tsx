"use client";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { ContainerImage } from "@/components/containers/image/ContainerImage";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Colors } from "@/types/colors";
import { IsMobileWidthProps } from "@/types/common";
import styled from "@emotion/styled";

import bg from "../../../assets/images/background-copy.jpg";
import photo from "../../../assets/images/photo.jpg";

const Container = styled.div`
  position: relative;
  z-index: -1;

  &::before {
    content: "";
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-image: url(${bg.src});
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -2;
  }

  &::after {
    content: "";
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: ${Colors.PaleTaupe};
    opacity: 0.7;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 24px;
`;

const containerContentSx: React.CSSProperties = {
  display: "flex",
  gap: "48px",
  alignItems: "center",
  paddingTop: "48px",
  paddingBottom: "48px",
};

export const MainContent = observer(() => {
  const { isMobileWidth } = useWindowSize();

  const sx: React.CSSProperties = {
    ...containerContentSx,
    ...(isMobileWidth && {
      flexDirection: "column",
    }),
  };

  return (
    <Container>
      <ContainerContent sx={sx}>
        <ContainerImage isMobileWidth={isMobileWidth}>
          <Image alt="Татьяна Лапенко " src={photo} />
        </ContainerImage>

        <div>
          <Title>Татьяна Лапенко</Title>
          <Description>
            Помогаю людям справляться с переживаниями, смотреть на жизнь шире и
            относиться к себе с состраданием.
          </Description>
          <DefaultButton
            onClick={() => {
              console.log("click");
            }}
          >
            Записаться на сеанс
          </DefaultButton>
        </div>
      </ContainerContent>
    </Container>
  );
});
