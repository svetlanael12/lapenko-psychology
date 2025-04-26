"use client";

import "swiper/css";
import "swiper/css/navigation";

import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Colors } from "@/types/colors";

const NextIcon = () => (
  <div
    className="swiper-button-next"
    style={{
      right: 0,
      backgroundColor: Colors.DefaultText,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
    }}
  >
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

const PrevIcon = () => (
  <div
    className="swiper-button-prev"
    style={{
      left: 0,
      backgroundColor: Colors.DefaultText,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
    }}
  >
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

export type SliderCustomProps = {
  children: React.ReactNode;
  slidesToShow?: number;
};

export const SliderCustom = (props: SliderCustomProps) => {
  const { children } = props;
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoHeight
      loop
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      style={{ width: "90%", padding: "0 40px" }}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <PrevIcon /> <NextIcon />
    </Swiper>
  );
};
