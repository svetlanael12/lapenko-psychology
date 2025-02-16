"use client";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import React from "react";

import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { SliderCustom } from "@/components/slider/SliderCustom";
import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

import education4 from "../../../assets/images/education1.jpg";
import education3 from "../../../assets/images/education2.jpg";
import education2 from "../../../assets/images/education3.jpg";
import education1 from "../../../assets/images/education4.jpg";

const Container = styled.div`
  background-color: ${Colors.PaleTaupe};
`;

const Title = styled.h2`
  font-size: 56px;
  margin-bottom: 24px;
`;

const Description = styled.div`
  font-size: 18px;
  margin-top: 12px;
`;

const Box = styled.div`
  text-align: center;
`;

const containerContentsx: React.CSSProperties = {
  paddingTop: "48px",
  paddingBottom: "48px",
};

export const EducationContent = observer(() => {
  return (
    <Container>
      <ContainerContent sx={containerContentsx}>
        <Title>Образование</Title>

        <SliderCustom>
          <Box>
            <Image
              alt="Московский институт психоанализа"
              src={education2}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Description>
              <strong>Московский институт психоанализа</strong>
              <p>
                Магистратура по направлению клинико-психологическое
                консультирование с основами психотерапии и переподготовка по
                клинической психологии.
              </p>
            </Description>
          </Box>
          <Box>
            <Image
              alt="Московский институт психоанализа"
              src={education1}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Description>
              <strong>Московский институт психоанализа</strong>
            </Description>
          </Box>

          <Box>
            <Image
              alt="Ассоциация когнитивно-поведенческой психотерапии (КПТ)"
              src={education3}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Description>
              <strong>
                Ассоциация когнитивно-поведенческой психотерапии (КПТ)
              </strong>
            </Description>
          </Box>
          <Box>
            <Image
              alt="МГУ имени М. В. Ломоносова"
              src={education4}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Description>
              <strong>МГУ имени М. В. Ломоносова</strong>
              <p>Терапия принятием и ответственностью (АСТ)</p>
            </Description>
          </Box>
        </SliderCustom>
      </ContainerContent>
    </Container>
  );
});
