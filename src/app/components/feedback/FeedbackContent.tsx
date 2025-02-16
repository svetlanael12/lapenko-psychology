"use client";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import { SliderCustom } from "@/components/slider/SliderCustom";
import { reviews } from "@/constants/reviews";
import { useWindowSize } from "@/hooks/useWindowSize";

const Title = styled.h1`
  font-size: 56px;
  margin-bottom: 12px;
`;

const Description = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
  padding-right: 12px;

  p {
    font-size: inherit;
  }
`;

const containerContentSx: React.CSSProperties = {
  paddingTop: "48px",
  paddingBottom: "48px",
};

export const FeedbackContent = observer(() => {
  const { isMobileWidth } = useWindowSize();

  return (
    <ContainerContent sx={containerContentSx}>
      <Title>Отзывы о моей работе</Title>

      <SliderCustom slidesToShow={1}>
        {reviews.map((review, index) => {
          return (
            <Description key={index}>
              <p style={{ textAlign: "end" }}>
                <strong>
                  {review.authorName},&nbsp;
                  {new Date(review.createdAt).toLocaleDateString()}
                </strong>
              </p>
              <p>{review.text}</p>
            </Description>
          );
        })}
      </SliderCustom>
    </ContainerContent>
  );
});
