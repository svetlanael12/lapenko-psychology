import { useContext } from "react";

import { RequestContext } from "@/context/RequestContext";

export const useRequestContext = () => {
  return useContext(RequestContext);
};
