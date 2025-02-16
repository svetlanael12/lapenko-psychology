"use client";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { ContainerImage } from "@/components/containers/image/ContainerImage";
import Image from "next/image";
import bg from "../../../assets/images/paper-about.jpg";
import { useWindowSize } from "@/hooks/useWindowSize";

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 24px;
  margin-bottom: 12px;
`;

const containerContentsx: React.CSSProperties = {
  display: "flex",
  gap: "48px",
  alignItems: "center",
  paddingTop: "48px",
  paddingBottom: "48px",
};

export const AboutContent = observer(() => {
  const { isMobileWidth } = useWindowSize();

  return (
    <ContainerContent sx={containerContentsx}>
      <div>
        <Title>Обо мне</Title>
        <Description>
          Меня зовут Татьяна Лапенко, я{" "}
          <strong>психолог/клинический психолог</strong> и люблю свою профессию.
        </Description>
        <Description>
          Работаю в когнитивно-поведенческом подходе <strong>(КПТ)</strong> и
          терапии принятием и ответственностью <strong>(ACT)</strong>.
        </Description>

        <Description>
          <b>Опыт работы:</b>&nbsp; работаю на СберЗдоровье.
        </Description>
      </div>

      {!isMobileWidth && (
        <ContainerImage height="350px" maxWidth="350px">
          <Image alt="психолог" src={bg} />
        </ContainerImage>
      )}
    </ContainerContent>
  );
});
