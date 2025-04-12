"use client";

import Link from "next/link";

import { AuthCheck } from "@/app/admin/auth-check/AuthCheck";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { TitleH2 } from "@/components/ui/titles/Title";

export const AdminHomeContent = () => {
  return (
    <AuthCheck>
      <ContainerContent sx={{ display: "flex", flexDirection: "column" }}>
        <TitleH2>Администрирование</TitleH2>
        <Link href="/admin/home/articles">Статьи</Link>
        <Link href="/admin/home/slots">Время сеансов</Link>
        <Link href="/admin/home/requests">Заявки</Link>
      </ContainerContent>
    </AuthCheck>
  );
};
