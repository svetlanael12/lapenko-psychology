import { action, makeObservable, observable } from "mobx";

export const loadingModelObservables = {
  isLoading: observable,
  isLoadingError: observable,

  startLoading: action.bound,
  stopLoading: action.bound,
  setIsLoading: action.bound,
  setIsLoadingError: action.bound,
};

/**
 * Модель для управления состоянием загрузки в приложении.
 */
export class LoadingModel {
  /**
   * Флаг, указывающий, находится ли приложение в процессе загрузки.
   */
  isLoading?: boolean = false;
  /**
   * Флаг, указывающий, произошла ли ошибка во время загрузки.
   */
  isLoadingError?: boolean = false;

  constructor() {
    makeObservable(this, loadingModelObservables);
  }

  /**
   * Запускает процесс загрузки, устанавливая флаг isLoading в true.
   */
  startLoading(): void {
    this.setIsLoading(true);
  }

  /**
   * Останавливает процесс загрузки, устанавливая флаг isLoading в false.
   */
  stopLoading(): void {
    this.setIsLoading(false);
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  setIsLoadingError(isLoadingError: boolean): void {
    this.isLoadingError = isLoadingError;
  }
}
