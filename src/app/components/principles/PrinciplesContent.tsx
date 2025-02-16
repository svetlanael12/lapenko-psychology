"use client";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import { Colors } from "@/types/colors";
import { ContainerBorder } from "@/components/containers/border/ContainerBorder";
import React from "react";

const Container = styled.div`
  background-color: ${Colors.PaleTaupe};
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 24px;
`;

const Description = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const WrapperText = styled.div`
  margin-top: 24px;
  font-size: 24px;
  /* font-size: 24px;
  margin-bottom: 12px; */
`;

const containerContentsx: React.CSSProperties = {
  paddingTop: "48px",
  paddingBottom: "48px",
};

export const PrinciplesContent = observer(() => {
  return (
    <Container>
      <ContainerContent sx={containerContentsx}>
        <Title>Мои принципы</Title>

        <Box>
          <ContainerBorder>
            <Description>
              <strong>Наука</strong>
              <div>
                Отдаю предпочтение методам с доказанной эффективностью,
                подкреплённой исследованиями в области психологии поведения,
                мышления и восприятия.
              </div>
            </Description>
          </ContainerBorder>
          <ContainerBorder>
            <Description>
              <strong>Развитие</strong>
              <div>
                Организую свою деятельность и обучение в рамках научного
                сообщества. Состою в Ассоциации когнитивно -поведенческой
                терапии. Прохожу супервизии.
              </div>
            </Description>
          </ContainerBorder>
          <ContainerBorder>
            <Description>
              <strong>Анонимность</strong>
              <div>
                Всё, о чём мы будем говорить, останется между нами, за
                исключением случаев угрозы причинения вреда себе или другим, а
                также нарушения закона.
              </div>
            </Description>
          </ContainerBorder>
        </Box>

        {/* <WrapperText>
          <strong>С чем ко мне обращаются:</strong>
          <ul>
            <li>Улучшение качества жизни</li>
          </ul>
        </WrapperText> */}
      </ContainerContent>
    </Container>
  );
});
