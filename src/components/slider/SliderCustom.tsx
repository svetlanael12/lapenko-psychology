"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

const settings = {
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
`;

export type SliderCustomProps = {
  children: React.ReactNode;
  slidesToShow?: number;
};

export const SliderCustom = (props: SliderCustomProps) => {
  const { children, slidesToShow = 1 } = props;

  return (
    <Wrapper>
      <Slider {...settings} slidesToShow={slidesToShow}>
        {children}
      </Slider>
    </Wrapper>
  );
};
