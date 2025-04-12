export type IsMobileWidthProps = {
  isMobileWidth?: boolean;
};

export type SVGDefaultProps = {
  width?: string;
  height?: string;
  fill?: string;
};

export type IsMobileViewportProps = {
  isMobileViewport?: boolean;
};

export type DefaultModalProps = {
  /**
   * Флаг, обозначающий открыта или закрыта модалка
   */
  isOpen: boolean;
  /**
   * Ф-я, которая будет вызвана при закрытии модалки
   */
  onClose: VoidFunction;
};
