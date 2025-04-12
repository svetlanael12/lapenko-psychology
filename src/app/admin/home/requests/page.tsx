import React from "react";

import { RequestType } from "@/lib/models/Request";

import { RequestsContent } from "./content/RequestsContent";
export const dynamic = "force-dynamic"; // Отключает статическую генерацию

const RequestsPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/request`
  ); // Убедитесь, что URL правильный
  const requests: RequestType[] = await response.json(); // Преобразуем ответ в JSON

  return <RequestsContent requests={requests} />;
};

export default RequestsPage;
