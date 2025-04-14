"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect } from "react";
import Slider, { Settings } from "react-slick";

import styled from "@emotion/styled";

const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  adaptiveHeight: true,
  afterChange: () => {
    // Принудительное обновление слайдера после загрузки
    window.dispatchEvent(new Event("resize"));
  },
  onInit: () => {
    // Инициализация при загрузке
    window.dispatchEvent(new Event("resize"));
  },
};

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
`;

export type SliderCustomProps = {
  children: React.ReactNode;
  slidesToShow?: number;
};

export const SliderCustom = (props: SliderCustomProps) => {
  const { children, slidesToShow = 1 } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 2000); // Небольшая задержка для загрузки изображений

    return () => clearTimeout(timer);
  }, [children]); // Зависимость от children

  return (
    <Wrapper>
      <Slider {...settings} slidesToShow={slidesToShow}>
        {children}
      </Slider>
    </Wrapper>
  );
};
