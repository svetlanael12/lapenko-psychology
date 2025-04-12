import { observer } from "mobx-react-lite";
import React, { JSX, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { closeIconBase64 } from "@/constants/svg";
import { useWindowSize } from "@/hooks/useWindowSize";
import { DefaultModalProps, IsMobileViewportProps } from "@/types/common";
import styled from "@emotion/styled";

type OverlayProps = {
  isExiting: boolean;
};

/**
 * Блок за модалкой, перекрывающий доступ к остальным элементам страницы
 */
const Overlay = styled.div<OverlayProps>`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px); /* Начальная позиция */
    }
    to {
      opacity: 1;
      transform: translateY(0); /* Конечная позиция */
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ isExiting }) => (isExiting ? "fadeOut" : "fadeIn")} 0.3s ease;

  @media screen and (min-width: 700px) {
    padding: 40px;
    align-items: center;
  }
`;
type ModalContainerProps = IsMobileViewportProps & {
  maxWidth?: string;
};
/**
 * Сам контейнер, содержащий в себе контент модалки
 */
const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  background-color: white;
  border-radius: 0.4rem;
  max-width: ${({ maxWidth }) => maxWidth || "700px"};
  width: 100%;
  height: auto;
  max-height: 90vh;
  padding: ${({ isMobileViewport }) => (isMobileViewport ? "3rem" : "3.2rem")};
  border: gray;

  display: flex;
  flex-direction: column;
`;

/**
 * Кнопка закрытия
 */
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 50px;
  height: 50px;
  background: url(${closeIconBase64});
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  z-index: 99;
  &:hover {
    background-color: #cacaca;
    border-radius: 50%;
  }
`;

const Title = styled.div`
  margin-bottom: 1rem;
  margin-right: 2rem;
`;

const Content = styled.div`
  padding-right: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;

  font-size: 18px;

  * {
    font-size: 18px;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
`;

export type ModalProps = DefaultModalProps & {
  /**
   * Дочерние элементы
   */

  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
};

/**
 * Компонент модального окна (управляется извне)
 * @see ModalProps
 */
export const Modal = observer((props: ModalProps): JSX.Element => {
  const { isOpen, onClose, children, title, footer, maxWidth } = props;
  const { isMobileWidth } = useWindowSize();
  const [isExiting, setIsExiting] = useState(false);

  if (typeof window === "undefined") {
    return <React.Fragment />;
  }

  useEffect(() => {
    if (!isOpen && !isExiting) {
      return;
    }
    const htmlContainer = document.querySelector("html");

    if (htmlContainer) {
      if (isOpen) {
        // Отключаем прокрутку за модалкой
        htmlContainer.style.overflow = "hidden";
      } else {
        // Включаем прокрутку обратно
        htmlContainer.style.overflow = "unset";
      }
    }

    // Очистка эффекта при размонтировании компонента
    return () => {
      if (htmlContainer) {
        htmlContainer.style.overflow = "unset";
      }
    };
  }, [isOpen, isExiting]);

  // Ф-я обечпечивает закрытие модального окна при клике вне модалки
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 200); // Длительность анимации закрытия
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!isOpen && !isExiting) {
    return <React.Fragment />;
  }

  return createPortal(
    <Overlay isExiting={isExiting} onClick={handleClose}>
      <ModalContainer
        onClick={handleModalClick}
        isMobileViewport={isMobileWidth}
        maxWidth={maxWidth}
      >
        <CloseButton onClick={handleClose} />
        {title && <Title>{title}</Title>}
        <Content>{children}</Content>
        {footer && <Footer>{footer}</Footer>}
      </ModalContainer>
    </Overlay>,
    document.getElementById("modal-root")!
  );
});
