import { action, makeObservable, observable } from "mobx";

import { RequestDTO } from "@/types/request";

import { LoadingModel } from "./LoadingModel";

export const requestModelObservables = {
  isRequestSuccess: observable,

  createRequest: action.bound,
  setIsRequestSuccess: action.bound,
};

export class RequestModel extends LoadingModel {
  isRequestSuccess = false;

  constructor() {
    super();
    makeObservable(this, requestModelObservables);
  }

  async createRequest(values: RequestDTO): Promise<void> {
    this.startLoading();
    const load = fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: `+${values.phone}`,
        firstName: values.firstName,
        slotIdSelected: values.slotIdSelected,
      }),
    });

    load
      .then(() => {
        this.setIsRequestSuccess(true);
      })
      .finally(this.stopLoading);
  }

  setIsRequestSuccess(isRequestSuccess: boolean) {
    this.isRequestSuccess = isRequestSuccess;
  }
}
