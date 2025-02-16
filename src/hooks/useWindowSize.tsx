"use client";
import { mobileViewportWidth } from "@/constants/common";
import { useState, useEffect } from "react";

export type UseWindowSizeType = (mobileViewport?: number) => {
  windowWidth?: number;
  isMobileWidth: boolean;
};

export const useWindowSize: UseWindowSizeType = (
  mobileViewport = mobileViewportWidth
) => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Функция для обновления ширины окна
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Добавляем слушатель события resize при монтировании компонента
    window.addEventListener("resize", handleResize);

    // Вызываем handleResize, чтобы установить начальное значение ширины
    handleResize();

    // Удаляем слушатель события при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Пустой массив зависимостей означает, что useEffect выполнится только один раз

  const isMobileWidth = windowWidth ? windowWidth < mobileViewport : true;

  return { windowWidth, isMobileWidth };
};
