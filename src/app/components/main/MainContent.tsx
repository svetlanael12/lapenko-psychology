"use client";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import React, { useState } from "react";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { ContainerImage } from "@/components/containers/image/ContainerImage";
import { TextField } from "@/components/inputs/textfield/TextField";
import { Modal } from "@/components/modal/Modal";
import { useFlag } from "@/hooks/useFlag";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Colors } from "@/types/colors";
import { IsMobileWidthProps } from "@/types/common";
import styled from "@emotion/styled";

import bg from "../../../assets/images/background-copy.jpg";
import photo from "../../../assets/images/photo.jpg";
import { AppointmentTime } from "./components/appointment-time/AppointmentTime";
import { RequestContentModal } from "./components/request-content-modal/RequestContentModal";
import { RequestDTO } from "@/types/request";
import { RequestContext } from "@/context/RequestContext";
import { RequestModel } from "@/models/RequestModel";
import { object, string } from "yup";

const Container = styled.div`
  position: relative;
  z-index: 1;

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
  font-size: 20px;
  margin-bottom: 24px;
`;

const TitleModal = styled.h3`
  font-size: 28px;
`;

const containerContentSx: React.CSSProperties = {
  display: "flex",
  gap: "48px",
  alignItems: "center",
  paddingTop: "48px",
  paddingBottom: "48px",
};

const initialValues: RequestDTO = {
  phone: "",
  firstName: "",
};

const validationSchema = object().shape({
  phone: string().required("Телефон обязателен").min(11),
});

export const MainContent = observer(() => {
  const { isMobileWidth } = useWindowSize();
  const [isRequestModal, openRequestModal, closeRequestModal] = useFlag();

  const sx: React.CSSProperties = {
    ...containerContentSx,
    ...(isMobileWidth && {
      flexDirection: "column",
    }),
  };

  const [requestModel] = useState(new RequestModel());

  return (
    <React.Fragment>
      <Container>
        <ContainerContent sx={sx}>
          <ContainerImage isMobileWidth={isMobileWidth}>
            <Image alt="Татьяна Лапенко " src={photo} />
          </ContainerImage>

          <div>
            <Title>Татьяна Лапенко</Title>
            <Description>
              Помогаю людям справляться с переживаниями, смотреть на жизнь шире
              и относиться к себе с состраданием.
            </Description>
            <DefaultButton onClick={openRequestModal}>
              Записаться на сеанс
            </DefaultButton>
          </div>
        </ContainerContent>
      </Container>

      {isRequestModal && (
        <Modal
          isOpen={isRequestModal}
          onClose={closeRequestModal}
          title={<TitleModal>Запись на сеанс</TitleModal>}
        >
          <RequestContext.Provider value={requestModel}>
            {requestModel.isRequestSuccess ? (
              <div>Ваша заявка принята</div>
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
              >
                <RequestContentModal />
              </Formik>
            )}
          </RequestContext.Provider>
        </Modal>
      )}
    </React.Fragment>
  );
});
