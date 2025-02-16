"use client";
import { observer } from "mobx-react-lite";

import { ContainerContent } from "@/components/containers/content/ContainerContent";
import styled from "@emotion/styled";
import { useWindowSize } from "@/hooks/useWindowSize";

const WrapperText = styled.ul`
  margin-top: 12px;
  font-size: 24px;

  li {
    list-style-position: inside;
    margin-bottom: 8px;
  }
`;

const Title = styled.h2`
  font-size: 48px;
`;

const containerContentsx: React.CSSProperties = {
  display: "flex",
  gap: "52px",

  marginTop: "48px",
  marginBottom: "48px",
};

export const ComeToMeWithContent = observer(() => {
  const { isMobileWidth } = useWindowSize(800);

  const sx: React.CSSProperties = {
    ...containerContentsx,
    ...(isMobileWidth && {
      flexDirection: "column",
      gap: "24px",
    }),
  };

  return (
    <ContainerContent sx={sx}>
      <div>
        <Title>
          С чем ко мне<strong> обращаются</strong>
        </Title>
        <WrapperText>
          <li>Улучшение качества жизни;</li>
          <li>Трудности в отношениях с коллегами, друзьями, партнёром;</li>
          <li>Отношения с родителями;</li>
          <li>Злость, агрессия, сложности с регуляцией эмоций;</li>
          <li>Разобраться в ситуации, понять в чём неправ(а) я или другие;</li>
          <li>Циклотимия;</li>
          <li>Депрессия;</li>
          <li>Тревога;</li>
          <li>Навязчивые мысли;</li>
        </WrapperText>
      </div>

      <div>
        <Title>
          С чем я <strong>не</strong> работаю
        </Title>
        <WrapperText>
          <li>Зависимости (химические, алкогольные, игромания и пр);</li>
          <li>Расстройства пищевого поведение;</li>
          <li>Возраст младше 14 лет;</li>
          <li>ПТСР;</li>
        </WrapperText>
      </div>
    </ContainerContent>
  );
});
